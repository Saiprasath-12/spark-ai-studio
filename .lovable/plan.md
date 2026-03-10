
# Super Animations for Technical Core Section

## Overview
A complete overhaul of the Skills/Technical Core section adding per-brand color theming, 3D mouse-tracking tilt on each card, cursor spotlight effect, animated bottom bar sweep, magnetic filter pills, wave/ripple entrance, and smooth fade transitions on category switch.

---

## 1. Per-Brand Color Theming

Each skill gets a unique brand color string (e.g., Python = `#3776ab`, React = `#61dafb`, Docker = `#2496ed`). On hover:
- Card border glows in the brand color
- Icon gets a drop-shadow in the brand color
- Skill name text transitions to the brand color
- A bottom bar (pseudo-element) sweeps from 0% to 70% width in the brand color

## 2. 3D Mouse-Tracking Tilt Per Card

Same approach as `ProjectCard.tsx` -- each skill card gets:
- `perspective: 800px` on the wrapper
- `onMouseMove` calculates X/Y offset from card center
- Applies `rotateY(x * 15deg) rotateX(-y * 15deg)` live
- `onMouseLeave` resets to flat with a smooth transition
- Content layer gets `translateZ(30px)` for parallax depth

## 3. Cursor Spotlight Effect

- Track mouse position relative to each card
- Apply a radial gradient overlay using CSS custom properties (`--mouse-x`, `--mouse-y`)
- Creates a soft light circle (brand color at 15% opacity) that follows the cursor inside the card
- Implemented via inline style updates on `onMouseMove`

## 4. Animated Bottom Bar Sweep

- Each card gets a `::after` pseudo-element (via a wrapper div with a CSS class)
- Default: `width: 0`, positioned at the bottom center
- On hover: `width: 70%`, `background: brand-color`, transition 0.4s ease-out
- Creates a glowing underline sweep effect

## 5. Magnetic Filter Pills

- Filter buttons get `onMouseMove` tracking
- When cursor is near (within ~40px), the button subtly shifts toward the cursor using `translate`
- On `onMouseLeave`, it springs back with a cubic-bezier transition
- Active pill: white background, dark text, glow shadow

## 6. Wave/Ripple Entrance on Scroll

- Cards enter with `translateY(28px) scale(0.92) opacity(0)` and stagger at 30ms intervals
- On category switch, cards fade out (opacity 0, scale 0.95) for 200ms, then the new set fades in with stagger
- Implemented via a `filterKey` state that triggers a re-render with animation reset

## 7. Orbiting Ring on Hovered Card

- On hover, a thin ring (2px border, brand color) appears around the icon container
- The ring rotates using `animation: ring-rotate 3s linear infinite`
- Created via a pseudo-element or an extra `div` with `absolute` positioning and `rounded-full`

---

## Technical Implementation

### Files Modified

**`src/components/Skills.tsx`** -- Major rewrite:
- Add `brandColor` field to each skill data object
- Add `useRef` + mouse tracking for 3D tilt per card (using a `SkillCard` sub-component)
- Add spotlight gradient via `--mouse-x` / `--mouse-y` CSS variables
- Add magnetic effect on filter buttons via mouse tracking
- Add `animating` state for fade-out/fade-in on category switch
- Wrap icon in orbiting ring container

**`src/index.css`** -- New CSS classes:
- `.skill-card-bar::after` -- bottom bar sweep pseudo-element using `var(--brand-color)`
- `.skill-card-spotlight` -- radial gradient overlay using `var(--mouse-x, 50%)` and `var(--mouse-y, 50%)`
- `.skill-orbit-ring` -- rotating ring animation around icon
- `.skill-card-enter` / `.skill-card-exit` -- fade transition classes for category switching
- `.magnetic-pill` -- base class for magnetic filter buttons

### Brand Colors Map

| Skill | Color |
|-------|-------|
| Java | #f89820 |
| Python | #3776ab |
| C | #a8b9cc |
| TypeScript | #3178c6 |
| Gemini | #8b5cf6 |
| DeepSeek | #0ea5e9 |
| Claude AI | #d97706 |
| Nanobana | #f59e0b |
| Flow | #06b6d4 |
| Antigravity | #ef4444 |
| React | #61dafb |
| Flask | #22c55e |
| Tailwind CSS | #38bdf8 |
| HTML5 | #e34f26 |
| CSS3 | #264de4 |
| Node.js | #68a063 |
| MySQL | #00758f |
| Firebase | #ffca28 |
| MongoDB | #47a248 |
| Supabase | #3ecf8e |
| Vercel | #ffffff |
| Git | #f05032 |
| GitHub | #c9d1d9 |
| Docker | #2496ed |
| Postman | #ff6c37 |
| VS Code | #007acc |

### No New Dependencies
All effects use React refs, inline styles, CSS custom properties, and existing CSS animation keyframes. No external libraries needed.
