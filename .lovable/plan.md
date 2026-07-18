# Add Resume to Portfolio

## Plan

1. **Upload the resume PDF as a Lovable Asset** (CDN-hosted) via `lovable-assets create` — produces `src/assets/saiprasath-resume.pdf.asset.json`. The PDF stays on CDN, not in the repo.

2. **Hero section (`src/components/Hero.tsx`)** — Add a "Download Resume" button next to the existing "View My Work" and "Get In Touch" CTAs. Uses a `Download` lucide icon, styled as a secondary glass button matching the existing design. Opens the CDN URL with `download` attribute.

3. **Connect section (`src/components/Connect.tsx`)** — Add a prominent "Download Resume" action button above/near the socials block so recruiters can grab it from the contact area too. Includes a small "View Resume" link that opens the PDF in a new tab.

4. **Floating nav (optional, minimal)** — No change; keeps nav clean.

5. **SEO** — No metadata change needed; PDF is served from CDN with proper content-type.

## Technical details

- File: `user-uploads://resume_2_2027.pdf` → uploaded via `lovable-assets create --file /mnt/user-uploads/resume_2_2027.pdf --filename Saiprasath-M-Resume.pdf`
- Import: `import resumeAsset from '@/assets/saiprasath-resume.pdf.asset.json'`
- Usage: `<a href={resumeAsset.url} download="Saiprasath-M-Resume.pdf" target="_blank" rel="noopener">Download Resume</a>`
- Filename shown to recruiter on download: `Saiprasath-M-Resume.pdf`

No new dependencies. Two files modified, one asset pointer created.
