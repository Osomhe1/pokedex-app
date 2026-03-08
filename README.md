# PokéDex App

A modern, responsive, and beautiful PokéDex application built with Next.js 14 (App Router), React Query, Tailwind CSS, and Framer Motion. This app consumes data from the public [PokeAPI](https://pokeapi.co/).

## Features Required by Challenge:
- ✅ Lists all Pokémon categories/types on the Home page.
- ✅ Clicking on a category displays a paginated list of all Pokémon in that category (25 per page).
- ✅ Pokémon list is searchable by a specific name.
- ✅ Clicking on a Pokémon displays its rich details, base stats, abilities, and characteristics.
- ✅ Implementation uses React, Next.js, and Axios.
- ✅ State management, caching, and data fetching powered by TanStack React Query.
- ✅ Smooth, dynamic, and beautiful UI using Tailwind CSS and Framer Motion.

## Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Fetching / Caching**: [Axios](https://axios-http.com/) & [TanStack Query v5](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## Development Setup

Follow these steps to run the application locally.

### Prerequisites
- Node.js 18.17.0 or later installed on your machine.
- npm, yarn, pnpm, or bun packet manager.

### 1. Installation
Clone the repository and install the dependencies:

```bash
# Navigate to project directory
cd pokedex-app

# Install dependencies
npm install
```

### 2. Run the Development Server
Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Application Structure & Design Patterns

### Structure
```
src/
├── app/                  # Next.js App Router (pages and global layout)
│   ├── page.tsx          # Home page (Types list)
│   ├── layout.tsx        # Global layout containing Providers and Header
│   ├── providers.tsx     # TanStack Query Provider wrapper
│   ├── type/[id]/        # Dynamic route for Pokemon List by Type
│   └── pokemon/[id]/     # Dynamic route for Pokemon Detail
├── components/           # Reusable presentational React components
│   ├── LoadingSpinner.tsx
│   ├── PokemonCard.tsx
│   └── TypeCard.tsx
├── hooks/                # Custom React hooks (TanStack Query hooks)
│   └── usePokemon.ts
├── services/             # API communication layer
│   └── pokeApi.ts        # Axios setup and API fetch functions
└── types/                # TypeScript interfaces and type definitions
    └── pokemon.ts        
```

### Design Patterns
- **Separation of Concerns**: UI components are separate from business logic. Data fetching is isolated into `src/services/` and exposed via custom hooks in `src/hooks/`.
- **Reusable Components**: `PokemonCard`, `TypeCard`, and `LoadingSpinner` are modular and reusable.
- **Provider Pattern**: Next.js App Router requires client-side Context to be instantiated carefully. `providers.tsx` uses the Provider Pattern to wrap the app with `QueryClientProvider`.
- **Server vs Client Components**: The Next.js 14 architecture naturally separates server and client boundaries. Pages utilizing React Query and Hooks are declared with `"use client"`.
- **Caching & Optimistic UI**: By using TanStack query with long `staleTime`, we significantly reduce redundant API calls to PokéAPI, speeding up the user experience natively.

---

## Deployment Documentation

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deploying to Vercel (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to [Vercel](https://vercel.com/) and sign up/log in.
3. Click on "Add New Project" and import your Git repository.
4. Vercel will automatically detect that it's a Next.js project and configure the build settings (`npm run build`).
5. Click **Deploy**.

### Manual Deployment (Docker / VPS / Coolify)
To self-host the application:
1. Run `npm run build` to create an optimized production build.
2. Run `npm start` to start the Node.js production server.
3. Expose port `3000` via NGINX or your preferred reverse proxy.

---

*This project was created as part of a code challenge.*
