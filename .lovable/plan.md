

# Saiprasath M — Developer Portfolio (Updated)

A modern, animated portfolio website with an AI-powered chatbot, showcasing projects, skills, and achievements — featuring the uploaded profile photo, enhanced animations, and rich footer.

## 1. Hero Section
- Full-screen landing with animated gradient background and floating code snippets
- **Profile photo displayed in a glowing circular frame** with animated border ring and subtle pulse/glow effect (using the uploaded image)
- Name, title ("Full-Stack & AI Systems"), and tagline with staggered fade-in animations
- CTA buttons: "View Showcase" and "Let's Connect" with hover glow effects
- Social links (GitHub, LinkedIn, Email) with scale-on-hover

## 2. Navigation (Enhanced Animations)
- **Desktop**: Floating glass-morphism pill navbar with active indicator that slides/morphs between items
- Hover effects with underline animation and subtle scale
- **Mobile**: Hamburger with animated icon transition (Menu ↔ X), slide-in overlay with staggered item entrance
- Scroll-based show/hide with smooth translate animation

## 3. About Section
- Bio paragraph with fade-in on scroll
- Animated stat cards (20+ Projects, 7+ Hackathons, 8.5 CGPA, 2 Special Mentions) with count-up animation on scroll
- Core Philosophy list with staggered slide-in
- Skill badges with hover scale effect

## 4. Skills Section
- Filterable category tabs with animated active indicator
- Skill cards grid with staggered entrance animation
- Each card has hover glow and scale effect
- Smooth layout animation when switching tabs

## 5. Project Showcase (3D Tilt Cards)
- 6 project cards with **CSS 3D perspective tilt effect** — cards rotate based on mouse position using CSS transforms (no framer-motion needed)
- Gradient overlay with parallax shift on hover
- Each card shows tags, description, GitHub link, and "AI Analysis" button
- AI Analysis uses Lovable Cloud edge function to generate architectural review
- Cards have glowing border on hover

## 6. Milestones Section
- Animated milestone cards with staggered fade-in on scroll
- Hackathons, OCI Certified, NPTEL Expert, CGPA, Special Mentions
- Subtle hover lift effects

## 7. Blog Section
- Hashnode blog link card with hover animation and external link icon

## 8. Contact Section
- Contact info cards with icon animations on hover
- Social media links (GitHub, Instagram, LinkedIn) with glow effects

## 9. AI Chatbot (SaiBot)
- Floating button with pulsing glow animation
- Expandable chat window with message animations
- Powered by Lovable Cloud edge function (Gemini model)
- Personality: energetic, tech emojis, max 2 sentences

## 10. Footer (Enhanced)
- Large "S" logo with glow effect
- Tagline: "Engineered for Scalable Innovation"
- **Quick navigation links** to all sections (Home, About, Skills, Showcase, Milestones, Connect)
- **Social media links row** (GitHub, Instagram, LinkedIn, Email)
- **Tech stack badges** — "Built with React • TypeScript • Tailwind"
- **"Back to top" button** with smooth scroll
- Copyright © 2025 SAIPRASATH M
- Subtle animated gradient divider at top of footer

## Design & Animations
- Dark theme with cyan/blue accents
- CSS-based animations (keyframes + Tailwind utilities) — no framer-motion dependency
- 3D card tilt via CSS `perspective` and `transform` with mouse-tracking JS
- Intersection Observer for scroll-triggered animations (fade-in, slide-up, stagger)
- Glassmorphism (backdrop-blur) on nav and chat
- Responsive for mobile and desktop

## Backend
- Lovable Cloud edge function for AI chatbot proxy to Gemini API with system prompt containing portfolio context

