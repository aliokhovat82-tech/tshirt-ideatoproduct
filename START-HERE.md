# START HERE — Your Setup Checklist

You are the owner. You don't write code. You make decisions, verify results,
and keep the project on track. This file tells you exactly what to do.

## One-time setup

- [ ] 1. Install Node.js LTS from nodejs.org (defaults all the way).
      Verify: open cmd, type `node -v`, see a version number.
- [ ] 2. Unzip this package INTO your `apparel-platform` folder so it contains:
      `CLAUDE.md`, `START-HERE.md`, and a `docs/` folder with 6 files.
- [ ] 3. Open Claude → Code tab → select the `apparel-platform` folder.

## Your first message to Claude Code (copy-paste this)

> Read CLAUDE.md and every file in docs/, then give me a short summary of
> what we're building and confirm you understand the rules. Then start
> Phase 1, Task 1 from docs/development-tasks.md. Explain each step in
> plain language — I have never programmed before.

## How every work session goes

1. Tell Claude Code which task is next (it tracks progress, but you stay in charge).
2. It explains what it will build, then builds it.
3. It tells you how to check the result in your browser (usually
   http://localhost:3000).
4. You look. If something's wrong, describe it in plain words.
5. When it works, say "commit it and continue to the next task."

## Rules of thumb

- One task at a time. Never let it "do the next five tasks at once."
- If it asks permission to install something or change architecture:
  it should tell you WHY. If unsure, come back to the planning chat and ask.
- If you get lost or an error loop happens: stop, copy the last messages,
  and bring them to the planning chat (the regular Claude chat). That chat
  is your architect; Claude Code is your builder.

## Supabase (needed at Phase 12B, not before)

When you reach Phase 12B, create a free account at supabase.com, make a new
project, and Claude Code will tell you exactly which two values to copy
into the project (a URL and a key). Never paste these keys into public
places — they belong only in your project's `.env.local` file.
