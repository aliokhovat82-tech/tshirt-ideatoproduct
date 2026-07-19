# SPECS.md — Concrete MVP Specifications

Version: 1.0 · Status: Approved for MVP
This document supplies the exact numbers and decisions the other documents
reference but do not define. When building, use these values — do not guess.

---

## 1. Garments (MVP)

One garment type: **Classic T-Shirt**, front and back printable.

Colors (5): White `#FFFFFF` · Black `#1A1A1A` · Heather Grey `#B2B4B3` ·
Navy `#1F2A44` · Red `#C0392B`

Garment mockup images live in `public/garments/tshirt/` as
`front-<color>.png` and `back-<color>.png`, 2000×2000 px, transparent
background. (Placeholder mockups may be generated in early tasks and
replaced later — treat mockups as swappable data, not code.)

Adding future garments must require only new data (images + a garment
definition object), never new code paths.

## 2. Print area

Standard DTG front/back print area: **12 × 16 inches** (30.5 × 40.6 cm).

- At 300 DPI the export artwork canvas is **3600 × 4800 px**.
- The on-screen canvas shows the garment mockup with the print area drawn
  as a dashed guide rectangle. Objects may be moved freely but anything
  outside the print area is excluded from print exports and the UI warns
  about it.
- Print-area position per garment is defined in
  `constants/garments.ts` as a rectangle relative to the mockup image
  (x, y, width, height in mockup pixels).

## 3. Image uploads

- Formats: PNG, JPEG, WEBP
- Max file size: **20 MB**
- Max dimensions: 6000 × 6000 px (larger files are rejected with a
  friendly message, not silently resized)
- Low-resolution warning: if an image would print below **150 DPI** at its
  current size on canvas, show a quality warning badge on the object.
- Originals are stored untouched (Supabase Storage). All edits are
  non-destructive operations stored in project state.

## 4. Exports

| Export | Resolution | Contents |
|---|---|---|
| Preview PNG | 1200 px wide | Garment mockup + design, for sharing |
| Print PNG | 3600 × 4800 px (300 DPI) | Artwork only, on white |
| Transparent artwork PNG | 3600 × 4800 px | Artwork only, transparent |
| Print package PDF | A4 pages | Preview page + artwork page + spec sheet |

All exports render from Konva stage state (single source of truth).
MVP: all exports are free. The ad-unlock system is post-MVP.

PDF spec sheet contains: garment type, color, print sides used, print
area size in cm and inches, artwork DPI, project name, date.

## 5. Database schema (Supabase / Postgres)

```
profiles      id (uuid, = auth.users.id), display_name, created_at
projects      id (uuid), user_id → profiles, name, garment_type,
              garment_color, canvas_state (jsonb), thumbnail_url,
              created_at, updated_at
assets        id (uuid), user_id → profiles, project_id → projects,
              storage_path, original_filename, width, height,
              file_size, created_at
```

- `canvas_state` is the serialized designer state (objects, layers,
  transforms, applied edit operations).
- Row Level Security ON for every table: users can only read/write their
  own rows.
- Storage buckets: `assets` (originals), `thumbnails` (project previews).
  Both private; access via signed URLs.

## 6. Authentication (MVP)

- Supabase Auth, **email + password** only. Social logins are post-MVP.
- The designer is usable without an account (guest mode, state in memory).
  Saving a project requires sign-in; prompt appears at first save.

## 7. Designer layout

Desktop (≥1024 px): left toolbar (tools) · center canvas · right panel
with tabs: Layers / Properties / Garment.
Tablet/mobile: canvas full-width, panels open as bottom sheets.
Undo/redo: keyboard (Ctrl+Z / Ctrl+Shift+Z) and toolbar buttons,
history capped at 50 steps.

## 8. MVP boundary (final)

MVP = Development Tasks Phases 1–12 **plus** project saving (Supabase) —
ends with a user designing a shirt and downloading a complete print
package.

Post-MVP (do not build): Phase 13 print-shop directory, Phase 14
advertisements, background-removal external provider (Task 29 stays a
mocked interface), analytics, social login.
