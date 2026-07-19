**TECH STACK SELECTION**

Version: 1.1

Status: Approved for MVP

**Purpose**

This document defines the official technology stack for Version 1 of the
platform.

The selected technologies prioritize:

- Rapid MVP development

- Maintainability

- Scalability

- AI-assisted development

- Modular architecture

- Future extensibility

The goal is to choose proven technologies with strong community support
and excellent compatibility with Claude Code.

**Architecture Style**

Application Architecture

- Component-Based

- Feature-Based

- Modular

- Future-Ready

Design Principles

- Single Responsibility

- Separation of Concerns

- Reusable Components

- Non-Destructive Editing

- Single Source of Truth

**Frontend**

**Framework**

Next.js (App Router)

Purpose

- Main web application

- Routing

- Server rendering

- SEO for landing pages

- Optimized deployment

Reason

- Modern React framework

- Excellent Claude support

- Large ecosystem

- Production ready

**Language**

TypeScript

Purpose

Primary programming language.

Reason

- Type safety

- Easier maintenance

- Better AI-generated code quality

- Fewer runtime errors

**UI Library**

React

Purpose

Component-based user interface.

Reason

- Industry standard

- Massive ecosystem

- Highly maintainable

**Styling**

Tailwind CSS

Purpose

Application styling.

Reason

- Fast development

- Consistent design

- Responsive layouts

- Easy maintenance

**Canvas Engine**

**Library**

React-Konva

Purpose

Interactive 2D apparel designer.

Responsibilities

- Object rendering

- Image rendering

- Layer rendering

- Object selection

- Drag & Drop

- Resize

- Rotation

- Transform controls

- Canvas interaction

- Export source

Important

The Canvas is the Single Source of Truth.

Everything visible on the canvas represents the official project state.

All exports are generated from the Canvas.

**State Management**

**Library**

Zustand

Purpose

Global application state.

Responsibilities

- Current project

- Canvas state

- Selected object

- Layer state

- UI state

- History state

Reason

- Lightweight

- Minimal boilerplate

- Excellent performance

- Easy AI-generated code

Redux is intentionally avoided for MVP.

**Image Management**

Purpose

Manage uploaded assets.

Responsibilities

- Upload images

- Store originals

- Asset library

- Project assets

Image files remain unchanged throughout the project.

**Image Processing Pipeline**

Processing Location

Client-side

Responsibilities

- Background Removal

- Crop

- Brightness

- Contrast

- Rotation

- Scaling

Characteristics

- Non-destructive

- Reversible

- Original image preserved

Future

The processing pipeline should support additional processors without
changing the overall architecture.

Examples

- AI Upscaling

- Noise Reduction

- Auto Color Correction

- Smart Object Detection

**Background Removal**

Architecture

Provider-based

Current Provider

To Be Selected

Future Providers

- Remove.bg

- Clipdrop

- Cloudflare AI

- Self-hosted AI Model

The implementation should allow changing providers without affecting the
rest of the application.

**Backend**

Platform

Supabase

Responsibilities

- Authentication

- Database

- Storage

- Security

- Realtime features

Reason

- Rapid development

- Managed infrastructure

- Excellent documentation

- Easy deployment

**Database**

PostgreSQL

Managed by Supabase.

Stores

- Users

- Projects

- Project Metadata

- Orders

- Print Shops

- Advertisements

**File Storage**

Supabase Storage

Stores

- Uploaded images

- Project files

- Generated exports

- Print packages

- Future templates

**Authentication**

Supabase Auth

Version 1

Optional

Future

- Google Login

- Apple Login

- GitHub Login

- Magic Link

**Export Engine**

Responsibilities

Generate production-ready files.

Outputs

Free

- Preview PNG

Unlocked by Ads

- Print PNG (300 DPI)

- Transparent Artwork PNG

- Professional Print PDF

Future

- SVG

- PSD

- Adobe Illustrator Compatible Export

**PDF Generation**

Architecture

Dedicated Export Module

Purpose

Generate print-ready production documents.

Possible Libraries

- React PDF

- PDFKit

Final implementation will be selected during Export Module development.

**Deployment**

Platform

Cloudflare

Responsibilities

- Hosting

- CDN

- DNS

- SSL

- Security

- Caching

Future

- Cloudflare Workers

- Cloudflare Images

- Cloudflare AI

**Version Control**

Git

Repository

GitHub

Branch Strategy

main

develop

feature/\*

bugfix/\*

release/\*

**Code Quality**

Tools

- ESLint

- Prettier

Standards

- Strict TypeScript

- Consistent naming

- Small reusable components

- Feature isolation

**Testing**

Version 1

Manual Testing

Future

- Vitest

- Playwright

- End-to-End Testing

**Analytics**

Future Module

Possible Providers

- Google Analytics

- Microsoft Clarity

Implementation should respect user privacy.

**Advertisement**

Purpose

Keep the platform free for casual users.

Possible Providers

- Google AdSense

Future

Additional providers can be integrated without affecting the core
application.

**Print Shop Integration**

Version 1

Basic directory of print shops.

Future

- Online ordering

- Instant quotations

- Order tracking

- Partner dashboard

- Production status

**Technologies Reserved For Future Versions**

The following technologies are intentionally excluded from Version 1 but
should be supported by the architecture.

- 360° Preview

- Real-Time 3D Viewer

- AI Design Assistant

- AI Image Generation

- Mobile Applications

- Marketplace

- Team Collaboration

**Final Technology Stack**

Frontend

- Next.js

- React

- TypeScript

- Tailwind CSS

Canvas

- React-Konva

State Management

- Zustand

Backend

- Supabase

Database

- PostgreSQL

Storage

- Supabase Storage

Deployment

- Cloudflare

Version Control

- Git

- GitHub

Architecture Goal

Build a clean, modular, and scalable application that enables rapid MVP
development while remaining ready for future expansion without major
architectural changes.
