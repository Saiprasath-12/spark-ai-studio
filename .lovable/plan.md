

# Welcome Screen + Hero Overhaul (Rajesh Portfolio Style)

## What We're Building

Recreating the raxx21/rajesh-portfolio welcome and hero experience using pure CSS + React (no GSAP/ThreeJS). The key elements:

1. **Welcome/Loading Screen** -- Full-screen preloader with animated progress bar, marquee-style scrolling text, and a dramatic reveal transition that slides away to expose the hero
2. **Landing/Hero Redesign** -- Large-format typography hero with the name split dramatically across lines, animated role text that flips/slides between titles, and a cinematic entrance sequence
3. **Custom Cursor** -- Smooth-following cursor dot with a larger trailing ring, scaling on interactive elements

---

## Technical Plan

### 1. New Component: `WelcomeScreen.tsx`

A full-screen overlay that shows on initial load:
- Dark background with initials "SM" in the center
- Animated progress bar (0% to 100% over ~2.5s using requestAnimationFrame)
- Marquee-style scrolling text bands (diagonal) with repeated phrases like "FULL STACK", "AI ENGINEER", "DEVELOPER" in large faded text
- Once loaded, a "curtain reveal" -- the screen splits vertically or slides up with a CSS transition, revealing the hero beneath
- Component unmounts after animation completes (~3.5s total)

### 2. Redesigned `Hero.tsx`

Inspired by the Landing.tsx layout:
- Left side: massive stacked typography
  - Small intro line: "Hello! I'm" (faded in)
  - Giant name: "SAIPRASATH" on one line, "M" on the next (gradient + white)
  - Below: "A Full-Stack" in muted text, then role words ("Developer" / "Engineer") that slide/flip vertically in a clipping container
- Right side: profile photo with the existing rotating rings (kept from current)
- Description text and CTA buttons below the name block
- Social icons row
- Staggered entrance animations timed to start after welcome screen exits
- Floating code terminal kept but repositioned

### 3. New Component: `CustomCursor.tsx`

- Small dot (6px) that follows mouse position exactly
- Larger ring (40px) that follows with lerp/easing delay (using requestAnimationFrame)
- Ring scales up on hover over interactive elements (links, buttons)
- Ring shrinks/hides on text inputs
- Hidden on mobile/touch devices
- Uses CSS `mix-blend-mode: difference` for contrast

### 4. CSS Additions to `index.css`

- Welcome screen keyframes: `curtain-up`, `marquee-scroll`, `progress-fill`
- Hero role-flip animation: `role-slide-up` for the clipping text container
- Custom cursor styles
- Large typography utility classes

### 5. Update `Index.tsx`

- Add `WelcomeScreen` as the first component (manages its own mount/unmount via state)
- Add `CustomCursor` component
- Hero sections delayed entrance tied to welcome screen completion via a shared state/callback

---

## Files Modified/Created

| File | Action |
|------|--------|
| `src/components/WelcomeScreen.tsx` | Create -- loading/welcome overlay |
| `src/components/CustomCursor.tsx` | Create -- smooth following cursor |
| `src/components/Hero.tsx` | Rewrite -- large typography hero layout |
| `src/pages/Index.tsx` | Update -- add WelcomeScreen + CustomCursor |
| `src/index.css` | Add -- welcome, cursor, and hero typography animations |

### No New Dependencies
All effects use `requestAnimationFrame`, CSS transforms/transitions, and React state. No GSAP or ThreeJS needed.

