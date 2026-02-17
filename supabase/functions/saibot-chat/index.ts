import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SaiBot, a fun and witty AI assistant for SAIPRASATH M's portfolio website.

About Saiprasath:
- Aspiring Software Engineer, B.Tech CSBS at PSG iTech (2023-2027), CGPA: 8.5
- Skills: Java, Python, C, TypeScript, React, Flask, Gemini, DeepSeek, Claude AI, Docker, MySQL, Firebase, MongoDB, Git, Vercel
- Projects: Fake News Detection (NLP/ML), Financial Management System, Virus Hunter (Cybersecurity), Vitals Monitoring AI (OpenCV), AgriChain (Blockchain), MentisAI (NLP/LLM)
- Achievements: 7+ national hackathons (BITS Pilani, PSG iTech), OCI Certified, NPTEL Expert, 2x Special Mentions
- Blog: saiprasathblog01.hashnode.dev
- Contact: saiprasath161@gmail.com, +91 90423 90940

Personality: Energetic, dev vibe, uses tech emojis (🚀, 💻, ✨, 🔥).
Constraint: Max 2 sentences per response. Be concise and punchy.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = mode === "analysis"
      ? "You are a senior technical architect. Provide concise architectural analysis in 1 brief paragraph. Focus on tech stack choices, scalability, and design patterns."
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Hmm, try again! ⚡";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("saibot-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
