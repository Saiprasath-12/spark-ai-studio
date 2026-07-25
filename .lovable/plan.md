## Fixes

### 1. Hero photo not visible on published site

The current image reference uses a root-relative CDN path (`/__l5e/assets-v1/...`) from the `.asset.json`. On the published portfolio this path isn't resolving, so the `<img>` renders empty.

Fix: re-import the portrait as a bundled asset so Vite fingerprints it into the build output.

- Save the portrait as a real file at `src/assets/profile-new.jpg` (regenerate from the previously uploaded portrait so it ships with the build).
- In `src/components/Hero.tsx`, replace the `.asset.json` import with a direct `import profileImg from '@/assets/profile-new.jpg'`.
- Remove the now-unused `src/assets/profile-new.asset.json` pointer.

This guarantees the image is served from the same origin as the deployed site.

### 2. Remove rotating ring on value-proposition cards

In `src/index.css`, on `.value-card`:

- Delete the `::before` conic-gradient pseudo-element (or set it to `display:none`) and the `.value-card:hover::before { animation: ring-rotate ... }` rule.
- Keep the lift, glow, and border-color hover styles intact.
- Leave the icon and number animations unchanged.

No other components, content, or layout changes.  
3.Add my resume it shows **NOT_FOUND**

The `NOT_FOUND` error occurs when a requested resource could not be found. This might happen if the resource has been moved, deleted, or if there is a typo in the URL.