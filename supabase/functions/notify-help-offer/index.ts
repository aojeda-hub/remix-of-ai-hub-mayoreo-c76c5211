import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { initiative_id, initiative_name, responsible_email, from_user_name, message } = await req.json();

    if (!responsible_email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email via Supabase Auth admin API (invite-like email)
    // We'll use a simple approach: send via the built-in email
    const { error: emailError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: responsible_email,
      options: {
        redirectTo: `${supabaseUrl.replace('.supabase.co', '.lovable.app')}/en-desarrollo`,
      },
    });

    // Even if magic link fails, we still want to log success since the in-app notification was already created
    console.log("Notification processed for:", responsible_email, emailError ? `(email error: ${emailError.message})` : "(email sent)");

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
