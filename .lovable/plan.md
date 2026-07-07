## Update SaiGPT Knowledge Base

The SaiGPT system prompt in `supabase/functions/saibot-chat/index.ts` is outdated (still lists old projects like Financial Management System, Vitals Monitoring AI, no internships, no scholarship, no awards). Rewrite it to match the current portfolio.

### File modified
`supabase/functions/saibot-chat/index.ts` — replace the `SYSTEM_PROMPT` constant only. No UI or other logic changes.

### New content SaiGPT will know

**Identity**
- SAIPRASATH M, based in Coimbatore, Tamil Nadu
- B.Tech CSBS at PSG iTech (2023–2027), CGPA 8.5/10
- Reliance Foundation Undergraduate Scholar

**Internships / Experience**
- Software Engineer Intern — IMSR, PSG Hospitals (Jun 2026–Present): Patient Deterioration Surveillance System on EMR, 5000+ patients, ~92% accuracy
- Generative AI Intern — Oracle AI Program (Jan–Jun 2025): OCI, GenAI, RAG, LLMs, prompt engineering
- CSE Association Event Coordinator — PSG iTech
- Gym Secretary — PSG iTech

**Projects**
- Smart Elderly Care & Patient Deterioration Surveillance (CV + IoT + predictive analytics, ~₹3L institution-funded)
- AgriChain-Nizamabad (blockchain agri traceability, presented at BITS Pilani Hyderabad)
- Society Finance Management (React + Flask + MySQL)
- Mentis AI (adaptive learning PWA)
- Fake News Detection System (Flask + React + NLP)
- Virus Hunter (signature-based antivirus simulation)

**Awards & Recognition**
- SAP × Great Lakes Hackfest 2026 — Top 30 of 500+ teams
- NASA Space Apps Challenge 2025 — Galactic Problem Solver
- Nallas CodeXcelerate 2025 — National Finalist
- PSG iTech Project Expo 2025 — Special Mention
- BITS Pilani Hyderabad — Innovation Showcase presenter

**Certifications**
- OCI 2025 AI Foundations Associate
- OCI 2025 Foundations Associate
- NPTEL Elite — Google Cloud Computing Foundations
- Oracle Generative AI Internship Certificate
- NASA Space Apps 2025 Galactic Problem Solver

**Skills** (kept up to date)
- Languages: Java, Python, C, JS/TS
- Frontend: React, Next.js, Tailwind
- Backend: Flask, Node.js, REST APIs
- AI/ML: CV, NLP, Deep Learning, Time-Series, RAG/LLMs
- DB: MySQL, MongoDB
- Cloud/Tools: OCI, Git, GitHub, Postman

**Contact**
- saiprasath161@gmail.com, +91-9042390940
- LinkedIn: linkedin.com/in/saiprasath-m
- GitHub: github.com/Saiprasath-12
- LeetCode: leetcode.com/u/Saiprasath05

### Preserved
- Persona: energetic dev vibe, tech emojis (🚀 💻 ✨ 🔥)
- Max 2 sentences per response constraint
- `analysis` mode branch (unchanged)
