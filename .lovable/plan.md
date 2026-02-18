

# Upgrade: Professional Skills Icons + Enhanced Project Showcase Animations

## 1. Technical Core -- Professional Lucide Icons (Replace Emojis)

Replace all emoji icons in the Skills section with proper Lucide React icons for a professional look. Each skill gets a relevant icon rendered as a React component with cyan accent color.

### Updated Skill Icons Mapping

| Skill | Current | New (Lucide) |
|-------|---------|-------------|
| Java | coffee emoji | `Code` |
| Python | snake emoji | `Terminal` |
| C | letters emoji | `Cpu` |
| TypeScript | "TS" text | `FileCode` (from lucide) |
| Gemini | sparkles emoji | `Sparkles` |
| DeepSeek | whale emoji | `Search` |
| Claude AI | mask emoji | `Brain` |
| Nanobana | banana emoji | `Bot` |
| Flow | wave emoji | `Workflow` |
| Antigravity | satellite emoji | `Rocket` |
| React | atom emoji | `Atom` (lucide) |
| Flask | test tube emoji | `FlaskConical` |
| Tailwind CSS | paint emoji | `Paintbrush` |
| HTML5 | globe emoji | `Globe` |
| CSS3 | paint emoji | `Palette` |
| MySQL | dolphin emoji | `Database` |
| Firebase | fire emoji | `Flame` |
| MongoDB | leaf emoji | `Leaf` |
| Vercel | triangle | `Triangle` |
| Git | branch emoji | `GitBranch` |
| GitHub | octopus emoji | `Github` |
| Docker | whale emoji | `Container` |

### Additional Skills to Add
- **Supabase** (Database) -- `Cloud` icon
- **Node.js** (Full Stack) -- `Server` icon
- **Postman** (DevOps & Tools) -- `Send` icon
- **VS Code** (DevOps & Tools) -- `Code2` icon

### Card Styling Enhancement
- Each skill card icon rendered at 28px in `text-primary` (cyan) color
- Add a subtle icon container with `bg-primary/10 rounded-xl p-2` behind each icon
- Keep the hover glow and scale effect

---

## 2. Project Showcase -- Enhanced Animations (Reference Site Style)

The reference site's project cards feature:
- Large image preview area at the top of each card
- Smooth hover: image scales up, overlay darkens, content slides up
- Glowing border effect on hover
- Tags with subtle pill styling
- Staggered entrance animations

### Changes to `ProjectCard.tsx`

**Enhanced 3D tilt + hover animations:**
- Increase card height slightly to `h-[500px]`
- Background image starts at `opacity-40`, on hover scales to `1.1` and shifts to `opacity-50`
- Add a **glowing animated border** on hover using `box-shadow` with cyan gradient
- Content area (tags, title, description, buttons) slides up slightly on hover with a `translateY` transition
- Add a **shine/shimmer overlay** effect that sweeps across the card on hover (CSS `::before` pseudo-element via a wrapper class)
- Smooth `transition-all duration-500` on all animated properties

**Enhanced 3D tilt:**
- Increase tilt sensitivity slightly (current `x * 20` is good, keep it)
- Add `translateZ(50px)` on the content layer for more depth parallax
- Add subtle shadow that shifts with the tilt direction

### Changes to `ProjectShowcase.tsx`

- Add floating decorative elements in the background (code brackets `{ }`, `</>`, `=>`) that float with CSS animations, matching the reference site's style
- Extend stagger delays up to `stagger-6` for all 6 cards

### New CSS Animations in `index.css`

```text
@keyframes shimmer-sweep
  - A diagonal shine that moves across the card on hover
  - From left-to-right, 0.6s duration

@keyframes card-float
  - Subtle up/down floating on idle cards (optional, very gentle)

.project-card-shine::before
  - Pseudo-element that creates the shimmer overlay
  - Triggered on hover via .group-hover
```

---

## 3. Files Modified

1. **`src/components/Skills.tsx`** -- Replace emoji icons with Lucide components, add 4 new skills, update card styling with icon containers
2. **`src/components/ProjectCard.tsx`** -- Enhanced hover animations (image scale, content slide-up, glowing border, shimmer effect), improved 3D tilt depth
3. **`src/components/ProjectShowcase.tsx`** -- Add floating decorative code elements in background, extend stagger classes
4. **`src/index.css`** -- Add `shimmer-sweep` keyframe, `.project-card-shine` class, extend stagger classes to `stagger-6` through `stagger-8`

## No New Dependencies
All enhancements use Lucide React (already installed) and CSS animations.

