# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Footprint is a Next.js 14 application for visualizing and comparing carbon emissions from daily activities. It's a French-language carbon footprint comparison tool that helps users understand the scale of greenhouse gas emissions from various activities.

The application consists of:
- An interactive emissions editor (left panel) where users can adjust quantities
- A comparison chart (right panel) that visualizes the data
- Data sourced from Base Carbone® Ademe

## Development Commands

```bash
# Development server
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Charts**: Chart.js with react-chartjs-2 and Recharts
- **TypeScript**: Strict mode enabled
- **Fonts**: Custom Mattone font family (Regular, Bold, Black)

### Project Structure
- `app/`: Next.js App Router pages and layouts
- `components/`: React components including shadcn/ui components in `ui/` subfolder
- `types/`: TypeScript type definitions for Emission and Category
- `data/`: Static JSON data for emissions data
- `lib/`: Utility functions and business logic

### Key Components
- `App.tsx`: Main application component with split layout
- `EmissionsEditor.tsx`: Left panel for editing emission quantities
- `MainChart.tsx`: Right panel chart visualization

### Data Structure
The application uses a hierarchical data structure:
- **Category**: Groups of related emissions (Transport, Digital, etc.) with label, image, and emissions array
- **Emission**: Individual emission items with label, value (kg CO2), quantity, color, min/max ranges, and visibility

### Styling System
- **Theme**: Custom brand colors with `project-main: #FF4B31` and `project-bg: #F1EFED`
- **Typography**: Mattone font family as primary typeface
- **Components**: shadcn/ui "new-york" style with CSS variables for theming
- **Responsive**: Mobile-first design with md: breakpoints

### State Management
The application uses React state with refs for Chart.js instances. The main state flow:
1. Emissions data loaded from JSON
2. User interactions update quantities in EmissionsEditor
3. Chart updates via chartRef to reflect changes
4. Data flows through utility functions in `lib/` folder

## Development Guidelines

### Code Style
- TypeScript strict mode is enabled
- ESLint configured with Next.js rules, unused vars and empty object types disabled
- Prettier configured with Tailwind CSS plugin
- Use `@/` path alias for imports

### UI Development
- Follow shadcn/ui component patterns
- Use Tailwind utilities with the custom design system
- Maintain responsive design patterns (mobile-first)
- Custom colors available: `project-main`, `project-bg`, `orange-light` shadow

### Chart Development
- Charts use Chart.js with react-chartjs-2
- Chart instances managed via refs passed between components
- Utility functions for chart data manipulation in `lib/` folder

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Conventions de la stack

Les conventions communes à mes projets Next vivent dans `docs/next-guidelines.md`,
un lien vers le dépôt partagé [dev-standards](https://github.com/alexandre-mace/dev-standards)
(fichier `next/next-guidelines.md`). Si ce lien est cassé, c'est que le dépôt n'est
pas cloné à côté de celui-ci : lire la version en ligne.
