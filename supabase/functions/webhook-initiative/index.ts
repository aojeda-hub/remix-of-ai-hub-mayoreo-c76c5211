import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { project, technology, responsible, silo, impact } = body;
    const validSilos = ["compras", "control", "logistica", "ventas", "mercadeo", "personal", "sistemas"];
    const validImpacts = ["high", "medium", "low"];

    if (!silo || !validSilos.includes(silo)) {
      return new Response(JSON.stringify({ error: "Invalid silo" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!impact || !validImpacts.includes(impact)) {
      return new Response(JSON.stringify({ error: "Invalid impact" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("initiatives").insert({
      project: project || "",
      technology: technology || "",
      responsible: responsible || "",
      silo,
      impact,
      problem: body.problem || "",
      description: body.description || "",
      link: body.link || "",
      source: "webhook",
    }).select().single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
