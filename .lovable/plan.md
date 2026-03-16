

# Skills Glow, SaiBot → SaiGPT Rename, and 3D Enhancements

## Changes

### 1. Orbiting Ring Always Glows (icon circle)
In `Skills.tsx`, the orbiting ring around the icon currently only shows on hover. Change it to always display with the brand color at reduced opacity, and intensify on hover.

### 2. Card Rectangle Glow Only on Hover (keep as-is)
The card border glow (`skill-card-3d:hover` in CSS) already only activates on hover — no change needed here.

### 3. Icon Background Always Glows
Make the icon container (`bg-primary/10 rounded-xl`) always have a subtle brand-color glow/shadow, not just on hover.

### 4. Rename SaiBot → SaiGPT
- `SaiBot.tsx`: Change the header label from "SaiBot" to "SaiGPT", update the welcome message text
- `saibot-chat/index.ts`: Update the system prompt persona name from "SaiBot" to "SaiGPT"

### 5. Enhanced 3D Effects on Skill Cards
Without changing the existing structure, add:
- **Floating animation**: A subtle `translateY` oscillation keyframe on each card (staggered by index) so cards gently bob up and down at rest
- **Enhanced parallax depth**: Increase `translateZ` from 30px to 40px for more pronounced 3D depth on hover
- **Glow pulse on icon**: Add a subtle pulsing `box-shadow` animation on the icon circle using the brand color

## Files Modified

| File | Changes |
|------|---------|
| `src/components/Skills.tsx` | Always-on orbit ring + icon glow, increased translateZ |
| `src/components/SaiBot.tsx` | Rename "SaiBot" → "SaiGPT" in UI text |
| `supabase/functions/saibot-chat/index.ts` | Rename persona in system prompt |
| `src/index.css` | Add floating keyframe + icon glow pulse animation |

