**PROJECT FOLDER STRUCTURE**

Version: 1.0

Status: Approved for MVP

**Purpose**

This document defines the official folder structure for the project.

The structure is designed to support:

- Modular development

- Feature isolation

- Reusability

- Easy maintenance

- AI-assisted development

- Future scalability

The project follows a Feature-Based Architecture rather than organizing
files only by type.

**Root Structure**

project-root/

├── app/

│

├── components/

│

├── features/

│

├── services/

│

├── stores/

│

├── hooks/

│

├── lib/

│

├── types/

│

├── utils/

│

├── constants/

│

├── public/

│

├── styles/

│

├── docs/

│

├── tests/

│

└── package.json

**app/**

Purpose

Contains all Next.js routes and layouts.

Example

app/

layout.tsx

page.tsx

designer/

page.tsx

dashboard/

page.tsx

admin/

page.tsx

**components/**

Purpose

Reusable UI components shared across the entire application.

Examples

components/

Button/

Modal/

Dialog/

Input/

Dropdown/

Loading/

Sidebar/

Toolbar/

ColorPicker/

ImageUploader/

These components should remain generic and independent from business
logic.

**\# features/**

**Purpose**

**Contains all business modules.**

**Each feature owns its components, hooks, services, types, and
utilities.**

**features/**

**designer/**

**│**

**├── components/**

**│ ├── Canvas/**

**│ ├── Toolbar/**

**│ ├── LayerPanel/**

**│ ├── PropertyPanel/**

**│ ├── GarmentPanel/**

**│ └── ExportDialog/**

**│**

**├── hooks/**

**├── services/**

**├── types/**

**├── utils/**

**└── index.ts**

**authentication/**

**export/**

**image-processing/**

**print-package/**

**print-shops/**

**\## Example Feature Structure**

**Every feature follows the same internal organization.**

**Example:**

**features/**

**\<feature-name\>/**

**components/**

**hooks/**

**services/**

**types/**

**utils/**

**constants/**

**index.ts**

Each feature should be self-contained whenever possible.

**services/**

Purpose

Communication with external systems.

Examples

services/

supabase/

background-removal/

export/

pdf/

ads/

analytics/

Services should never contain UI code.

**stores/**

Purpose

Global application state.

Example

stores/

projectStore.ts

canvasStore.ts

layerStore.ts

historyStore.ts

uiStore.ts

Implemented using Zustand.

**hooks/**

Purpose

Reusable custom React hooks.

Examples

hooks/

useCanvas.ts

useLayers.ts

useExport.ts

useHistory.ts

useSelection.ts

**lib/**

Purpose

Shared libraries and configuration.

Examples

lib/

supabase.ts

konva.ts

fonts.ts

pdf.ts

**types/**

Purpose

Global TypeScript types.

Examples

types/

project.ts

canvas.ts

layer.ts

garment.ts

image.ts

export.ts

**utils/**

Purpose

Pure helper functions.

Examples

utils/

math.ts

colors.ts

images.ts

files.ts

export.ts

Utility functions should remain stateless.

**constants/**

Purpose

Application-wide constants.

Examples

constants/

garments.ts

colors.ts

canvas.ts

print.ts

limits.ts

**public/**

Purpose

Static assets.

Examples

public/

garments/

icons/

logos/

examples/

fonts/

**styles/**

Purpose

Global styles.

Examples

styles/

globals.css

Most styling should be handled with Tailwind CSS.

**docs/**

Purpose

Project documentation.

Contents

- Project Foundation

- Product Vision

- Product Principles

- Project Architecture

- Tech Stack

- PRD

- API Documentation

- Development Notes

**tests/**

Purpose

Project testing.

Future

tests/

unit/

integration/

e2e/

**Feature Ownership**

Each feature should contain its own:

- Components

- Hooks

- Services

- Types

- Utilities

- Constants

This minimizes coupling between modules.

**Import Rules**

Allowed

Feature → Shared Components

Feature → Utils

Feature → Services

Feature → Types

Not Allowed

Feature A → Internal files of Feature B

Every feature should expose only its public API through index.ts.

**Naming Convention**

Folders

kebab-case

Example

image-processing

print-package

Files

camelCase

Example

canvasStore.ts

removeBackground.ts

generatePdf.ts

React Components

PascalCase

Example

Canvas.tsx

LayerPanel.tsx

Toolbar.tsx

**Growth Strategy**

As new capabilities are added, they should become new features rather
than expanding unrelated modules.

Examples

Future

features/

ai/

marketplace/

viewer-360/

mobile-sync/

team-workspace/

No restructuring of the existing project should be required.

**Folder Structure Philosophy**

The project should grow by adding new modules, not by increasing the
complexity of existing ones.

Each feature should remain understandable, replaceable, and
independently testable.

The architecture should remain clean whether the project contains 20
files or 20,000 files.
