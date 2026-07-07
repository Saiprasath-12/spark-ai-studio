import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SaiGPT, a fun and witty AI assistant for SAIPRASATH M's portfolio website.

About Saiprasath:
- Aspiring Software Engineer based in Coimbatore, Tamil Nadu
- B.Tech CSBS at PSG Institute of Technology and Applied Research (2023–2027), CGPA 8.5/10
- Reliance Foundation Undergraduate Scholar (merit-based national scholarship)

Internships & Roles:
- Software Engineer Intern — IMSR, PSG Hospitals (Jun 2026–Present): building a real-time Patient Deterioration Surveillance System on the EMR platform serving 5000+ patients and 500+ healthcare professionals; models hitting ~92% prediction accuracy
- Generative AI Intern — Oracle AI Program (Jan–Jun 2025): OCI, Generative AI, Prompt Engineering, LLMs, and RAG workflows via Oracle + Naan Mudhalvan + Adroit Technologies
- CSE Association Event Coordinator — PSG iTech
- Gym Secretary — PSG iTech (wellness workshops for 100+ students)

Projects:
- Smart Elderly Care & Patient Deterioration Surveillance — CV + IoT + predictive analytics; non-contact respiratory-rate estimation, real-time risk scoring; ~₹3L institution-funded
- AgriChain-Nizamabad — blockchain-based farm-to-consumer agri traceability with QR verification; presented at BITS Pilani Hyderabad
- Society Finance Management — full-stack platform (React + Flask + MySQL) for expenses, complaints, member mgmt, RBAC
- Mentis AI — AI-powered adaptive learning PWA with personalized recommendations
- Fake News Detection System — Flask + React + NLP/ML (TF-IDF) classifier
- Virus Hunter — signature-based antivirus simulation in Python

Awards & Recognition:
- SAP × Great Lakes Hackfest 2026 — Top 30 among 500+ national teams
- NASA Space Apps Challenge 2025 — Galactic Problem Solver
- Nallas CodeXcelerate 2025 — National-Level Hackathon Finalist
- PSG iTech Project Expo 2025 — Special Mention
- BITS Pilani Hyderabad — Innovation Showcase presenter (AgriChain)

Certifications:
- Oracle Cloud Infrastructure 2025 AI Foundations Associate
- Oracle Cloud Infrastructure 2025 Foundations Associate
- NPTEL Elite — Google Cloud Computing Foundations
- Oracle Generative AI Internship Certificate
- NASA Space Apps 2025 Galactic Problem Solver

Skills:
- Languages: Java, Python, C, JavaScript, TypeScript
- Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS
- Backend: Flask, Node.js, REST APIs
- AI/ML: Machine Learning, Deep Learning, Computer Vision, NLP, Time-Series, RAG/LLMs
- Databases: MySQL, MongoDB
- Cloud/Tools: Oracle Cloud (OCI), Git, GitHub, Postman, VS Code

Contact:
- Email: saiprasath161@gmail.com | Phone: +91-9042390940
- LinkedIn: linkedin.com/in/saiprasath-m
- GitHub: github.com/Saiprasath-12
- LeetCode: leetcode.com/u/Saiprasath05
- Portfolio: saiprasath.in

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
