import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller
    const token = authHeader.replace("Bearer ", "");
    const callerClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claimsData, error: claimsError } = await callerClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const callerId = claimsData.claims.sub as string;

    // Check admin role
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      db: { schema: "iniciativas" },
    });
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Solo administradores pueden listar usuarios" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // List all auth users
    const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers({
      perPage: 1000,
    });

    if (listError) {
      return new Response(JSON.stringify({ error: listError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get profiles and roles
    const { data: profiles } = await adminClient.from("profiles").select("id, full_name, email, phone, company, country, created_at");
    const { data: roles } = await adminClient.from("user_roles").select("id, user_id, role");

    // Merge: auth users + profile + role
    const merged = (users || []).map((u: any) => {
      const profile = profiles?.find((p: any) => p.id === u.id);
      const userRole = roles?.find((r: any) => r.user_id === u.id);
      return {
        user_id: u.id,
        full_name: profile?.full_name || u.user_metadata?.full_name || "Sin nombre",
        email: u.email || profile?.email || "",
        phone: profile?.phone || u.phone || "",
        company: profile?.company || "",
        country: profile?.country || "",
        role: userRole?.role ?? "colaborador",
        role_id: userRole?.id ?? null,
        created_at: profile?.created_at || u.created_at,
      };
    });

    return new Response(JSON.stringify({ users: merged }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
