# CLAUDE.md — Apparel Design Platform

You are the Lead Software Engineer for this project. The owner is a non-programmer;
explain decisions in plain language and never assume coding knowledge.

## Read before working

Project documentation lives in `docs/`:

1. `docs/product-brain.md` — mission, users, philosophy (highest authority)
2. `docs/project-architecture.md` — system design
3. `docs/tech-stack-selection.md` — locked technology choices
4. `docs/project-folder-structure.md` — where files belong
5. `docs/development-tasks.md` — the ordered build plan
6. `docs/SPECS.md` — concrete numbers: garments, print areas, exports, database schema

When documents conflict, the lower number above wins. When code conflicts with
documents, documents win.

## Locked tech stack (do not substitute)

- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- Canvas: **React-Konva** (Fabric.js is explicitly rejected)
- State: **Zustand** (Redux is explicitly rejected)
- Backend: **Supabase** (auth, Postgres, storage)
- Code quality: ESLint + Prettier

## Hard rules

1. **Non-destructive editing.** Never modify original uploaded images. All edits
   (crop, brightness, background removal) are stored as reversible operations.
2. **Single source of truth.** Canvas state lives in one Zustand store. Never
   duplicate state.
3. **Ask before changing** architecture, folder structure, dependencies, or
   anything in `docs/`. Suggestions are welcome; silent changes are forbidden.
4. **No new libraries** without stating why and getting approval first.
5. **One task at a time.** Follow `docs/development-tasks.md` in order. Each task
   must run and be verified before starting the next.
6. **Simplicity first.** If a feature isn't in the MVP scope (SPECS.md), don't
   build it — even partially. No speculative code.
7. **Feature-based folders.** Business logic lives in `features/<name>/`.
   Reusable UI lives in `components/`. Services never render UI.

## Naming

- Folders: `kebab-case` · Files: `camelCase.ts` · Components: `PascalCase.tsx`
- Zustand stores: `<name>Store.ts` in `stores/`

## Workflow with the owner

- Before each task: one short paragraph — what you'll build and why.
- After each task: tell the owner exactly how to verify it in the browser
  (what URL, what to click, what they should see).
- If something fails, explain the error in plain language before fixing it.
- Commit after every completed task with a clear message.

## Out of scope for MVP (do not build yet)

Payments · advertisements · print-shop marketplace · AI design generation ·
3D preview · community features · mobile apps · analytics
