import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { page_path } = await req.json().catch(() => ({ page_path: "/" }));
    const path = typeof page_path === "string" ? page_path : "/";

    if (!/^\/[A-Za-z0-9/_\-]{0,255}$/.test(path)) {
      return new Response(JSON.stringify({ error: "invalid path" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: existing } = await supabase
      .from("page_views")
      .select("view_count")
      .eq("page", path)
      .maybeSingle();

    let count: number;
    if (existing) {
      const next = (existing.view_count as number) + 1;
      const { error } = await supabase
        .from("page_views")
        .update({ view_count: next, updated_at: new Date().toISOString() })
        .eq("page", path);
      if (error) throw error;
      count = next;
    } else {
      const { data, error } = await supabase
        .from("page_views")
        .insert({ page: path, view_count: 1 })
        .select("view_count")
        .single();
      if (error) throw error;
      count = data.view_count as number;
    }

    return new Response(JSON.stringify({ view_count: count }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-page-view error:", e);
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
