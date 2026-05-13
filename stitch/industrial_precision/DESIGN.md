# Design System Document

## 1. Overview & Creative North Star: "The Industrial Architect"

This design system is engineered for the heavy machinery sector, where precision is a requirement and reliability is the only currency. The Creative North Star for this system is **"The Industrial Architect."** 

Unlike generic construction websites that rely on cluttered grids and basic templates, "The Industrial Architect" approach treats the digital interface as a blueprint of high-end engineering. It balances the "Raw Power" of industrial equipment with "Executive Sophiciency." We achieve this through:
*   **Intentional Asymmetry:** Breaking the expected 12-column grid with editorial-style image placement and overlapping typography.
*   **Tonal Authority:** Moving away from flat whites to a palette of "Surface Tiers" that mimic the layered components of a high-end machine.
*   **High-Contrast Clarity:** Prioritizing readability for users who are often in high-glare, outdoor environments (executives on-site).

---

## 2. Colors: Tonal Depth & Industrial Precision

The color palette is rooted in a high-contrast industrial logic. We utilize a "Construction Gold" (`primary`) and "Deep Steel" (`tertiary`) to establish immediate professional trust.

### Color Tokens (Material Design Convention)
*   **Primary (Gold):** `#735c00` (Text/Iconography) | `#ffcd00` (Container/Accent)
*   **Tertiary (Steel):** `#166395` (Corporate/Navigational focus)
*   **Surface:** `#f5fafe` (Base background)
*   **Surface Containers:** Range from `#ffffff` (Lowest - Highlight) to `#dee3e7` (Highest - Emphasis)

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a card component (`surface_container_lowest`) sits on a section background (`surface_container_low`). This creates a cleaner, more modern look that feels integrated rather than "boxed in."

### Signature Textures & Gradients
Standard flat buttons are insufficient for "The Industrial Architect." 
*   **CTA Gradients:** Use a subtle linear gradient transitioning from `primary` (#735c00) to a slightly lighter variant to give buttons a "forged" metallic feel.
*   **Glassmorphism:** Use semi-transparent surface colors (e.g., `surface_container_low` at 80% opacity) with a `20px` backdrop-blur for floating navigation bars or mobile overlays.

---

## 3. Typography: The Voice of Precision

Our typography pairs the technical precision of **Inter** with the bold, editorial presence of **Work Sans**.

*   **Display (Work Sans):** Used for "Hero" statements and machine specifications. The wide apertures of Work Sans convey a sense of massive scale.
*   **Headline & Title (Work Sans/Inter):** Provides a clear, authoritative hierarchy. Headlines should be tight-tracked (-2%) to feel dense and robust.
*   **Body & Labels (Inter):** High-readability sans-serif designed for quick scanning of technical data and operational details.

**The Identity Logic:** The contrast between a `display-lg` headline (3.5rem) and a `body-md` description (0.875rem) creates an editorial tension that feels like a premium trade magazine rather than a basic catalog.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "software-standard." This system uses **Tonal Layering** to create physical presence.

*   **The Layering Principle:** 
    *   **Level 0:** `surface` (The foundation).
    *   **Level 1:** `surface_container_low` (General sectioning).
    *   **Level 2:** `surface_container_lowest` (Interactive cards or "highlighted" content).
*   **Ambient Shadows:** If a shadow is required for a floating action, use an extra-diffused shadow: `blur: 40px`, `y: 12px`, `opacity: 6%`, tinted with `on_surface` (#161c1f). This mimics natural site lighting rather than a digital effect.
*   **The "Ghost Border":** For high-glare visibility, if a border is required, use `outline_variant` at **20% opacity**. It provides a "hint" of a boundary without cluttering the visual field.

---

## 5. Components: Rugged & Refined

### Buttons
*   **Primary:** Solid `#ffcd00` background, `on_primary_container` text. Radius: `md` (0.375rem) for a precise, "machined" corner.
*   **Secondary:** Ghost style using `surface_container_high` background. No border.
*   **Interaction:** On hover, the background should shift one tier higher in the surface scale.

### Cards & Lists
*   **Constraint:** Zero dividers. Use a `1.5rem` to `2rem` vertical spacing scale to separate list items. 
*   **Imagery:** Use high-aspect-ratio (16:9 or 21:9) imagery of machinery. Apply a slight "vignette" gradient overlay to the bottom of images to allow `label-md` technical specs to sit directly on the image with high legibility.

### Input Fields
*   **Style:** Minimalist. Use a solid `surface_container_high` background with a `2px` bottom-only highlight in `primary` when focused. This reflects the "precision instrument" aesthetic.

### Additional Component: The "Spec-Sheet" Chip
*   Used for machine stats (e.g., "Weight: 15,000kg"). These should use `tertiary_container` with a `full` (9999px) roundedness to contrast against the sharp, rectangular nature of the machinery imagery.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical white space. If an image of an excavator is on the right, allow the text on the left to "breathe" with wide margins.
*   **Do** use high-contrast combinations. `on_primary_fixed` (#241a00) text on a `primary_container` (#ffcd00) background is essential for outdoor readability.
*   **Do** use "Editorial Overlaps." Let a corner of a machine image overlap a title block to create depth.

### Don’t:
*   **Don't** use 100% black. Use `on_surface` (#161c1f) for a deeper, more professional tonal range.
*   **Don't** use rounded corners above `0.75rem (xl)` for primary containers; overly round corners feel "toy-like" and undermine the industrial "robust" personality.
*   **Don't** clutter the mobile view. If a technical spec isn't vital for a field executive, move it to a "Technical Details" progressive disclosure accordion.