**DEVELOPMENT TASKS**

Version: 1.0

Status: Build Plan

**Purpose**

This document breaks the entire project into small, independent, and
testable development tasks.

Each task should produce a working result.

Every task should be completed, tested, and committed before moving to
the next task.

**Phase 1 — Project Setup**

**Task 1**

Create Next.js project

Deliverable

Running Next.js application.

**Task 2**

Configure TypeScript

Deliverable

Strict TypeScript configuration.

**Task 3**

Configure Tailwind CSS

Deliverable

Tailwind working correctly.

**Task 4**

Configure ESLint & Prettier

Deliverable

Consistent code formatting.

**Task 5**

Configure project folder structure

Deliverable

Folder hierarchy matches Project Folder Structure document.

**Task 6**

Configure Git repository

Deliverable

Initial commit.

**Phase 2 — Core Layout**

**Task 7**

Create Root Layout

**Task 8**

Create Landing Page

**Task 9**

Create Navigation Bar

**Task 10**

Create Footer

**Task 11**

Create responsive layout

Deliverable

Website works correctly on desktop, tablet, and mobile.

**Phase 3 — Designer Workspace**

**Task 12**

Create Designer page

**Task 13**

Create Designer Layout

**Task 14**

Create Toolbar

**Task 15**

Create Canvas container

**Task 16**

Integrate React-Konva

**Task 17**

Render garment template

**Task 18**

Add Front / Back garment switching

**Phase 4 — Garment Manager**

**Task 19**

Create garment selector

**Task 20**

Create garment color selector

**Task 21**

Load garment templates

**Task 22**

Update garment preview

**Phase 5 — Image Manager**

**Task 23**

Build image upload component

**Task 24**

Support multiple image upload

**Task 25**

Validate supported file formats

**Task 26**

Store uploaded assets

**Task 27**

Display uploaded asset library

**Phase 6 — Image Processing Pipeline**

**Task 28**

Create processing pipeline architecture

**Task 29**

Implement background removal interface

(Current provider can be mocked.)

**Task 30**

Implement crop tool

**Task 31**

Implement brightness adjustment

**Task 32**

Implement contrast adjustment

**Task 33**

Implement rotation

**Task 34**

Implement scaling

**Phase 7 — Canvas Editing**

**Task 35**

Place images onto canvas

**Task 36**

Drag objects

**Task 37**

Resize objects

**Task 38**

Rotate objects

**Task 39**

Select active object

**Task 40**

Delete selected object

**Phase 8 — Layer System**

**Task 41**

Create layer panel

**Task 42**

Display object list

**Task 43**

Implement drag-to-reorder layers

**Task 44**

Bring Forward

**Task 45**

Send Backward

**Task 46**

Hide layer

**Task 47**

Lock layer

**Task 48**

Rename layer

**Phase 9 — Property Panel**

**Task 49**

Create property inspector

**Task 50**

Display selected object properties

**Task 51**

Edit size

**Task 52**

Edit position

**Task 53**

Edit opacity

**Phase 10 — History**

**Task 54**

Undo

**Task 55**

Redo

**Phase 11 — Export**

**Task 56**

Generate Preview PNG

**Task 57**

Generate Print PNG

**Task 58**

Generate Transparent Artwork PNG

**Task 59**

Generate Print PDF

**Task 60**

Validate exported files

**Phase 12 — Print Package**

**Task 61**

Generate garment preview

**Task 62**

Generate artwork page

**Task 63**

Generate print specifications

**Task 64**

Generate production instructions

**Task 65**

Assemble PDF package

**Phase 13 — Print Shop**

**Task 66**

Create Print Shop page

**Task 67**

Display nearby print shops

**Task 68**

Display shop details

**Task 69**

Send design package

**Phase 14 — Advertisement**

**Task 70**

Integrate advertisement module

**Task 71**

Lock premium exports

**Task 72**

Unlock export after advertisement

**Phase 15 — Final Testing**

**Task 73**

Canvas testing

**Task 74**

Export testing

**Task 75**

Layer testing

**Task 76**

Image processing testing

**Task 77**

Responsive testing

**Task 78**

Cross-browser testing

**Task 79**

Performance optimization

**Task 80**

Prepare MVP Release

---

## ADDENDUM (v1.1 — agreed with project owner)

**A. New Phase 12B — Accounts & Project Saving** (was missing from v1.0):

- Task 65a — Set up Supabase project + environment variables
- Task 65b — Create database schema + Row Level Security (see docs/SPECS.md §5)
- Task 65c — Email/password sign-up and sign-in pages
- Task 65d — Save project (canvas_state → projects table)
- Task 65e — Load project / "My Projects" dashboard page
- Task 65f — Upload originals to Supabase Storage; assets table
- Task 65g — Project thumbnails

**B. Phases 13 (Print Shop) and 14 (Advertisement) are POST-MVP.**
Do not build them. MVP ends after Phase 12B + Phase 15 testing.

**C. Task 29 (background removal):** implement the provider interface with a
mocked provider only. Real provider selection is post-MVP.

**D. All exports are free in MVP** — no ad-locking (overrides Tech Stack §Export Engine).
