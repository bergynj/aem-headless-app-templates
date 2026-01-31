# AEM Headless Monorepo

## Project Overview
This project is a **TypeScript-based Nx Monorepo** designed to build AEM (Adobe Experience Manager) Headless applications using **Next.js 14**. It includes a complete development environment with a mock AEM server to simulate GraphQL endpoints and content delivery.

## Architecture

The workspace is organized into **apps** and **libs** managed by Nx:

### Applications (`src/apps/`)
*   **`content-site`**: The primary public-facing website.
    *   **Framework**: Next.js 14 (App Router).
    *   **Styling**: Tailwind CSS.
    *   **Features**: Dynamic routing based on AEM content paths (`[...slug]`), GraphQL data fetching, and localized content support.

### Libraries (`src/libs/`)
*   **`content-mocks`**: A local Node.js/Express server that simulates AEM's GraphQL and REST APIs.
    *   **Tech**: Express, `graphql-http` (GraphQL 16 compatible), `ruru` (GraphiQL).
    *   **Port**: 4502 (default).
    *   **Purpose**: Allows offline development without a running AEM instance.
*   **`content-repo`**: Abstraction layer for data fetching.
    *   Contains the `AEMClient` which wraps `@adobe/aem-headless-client-js`.
*   **`content-model`**: Zod schemas and TypeScript interfaces defining the shape of AEM content fragments.
*   **`ui`**: Generic, reusable React UI components (Carousels, Cards) dependent only on React.
*   **`aem-ui`**: UI components specifically aware of AEM editing contexts (Core Components wrappers).
*   **`aem-renderer`**: Logic for dynamically mapping AEM JSON data to React components.

## Setup & Installation

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *Note: Dependencies are centralized in the root `package.json` to enforce a Single Version Policy.*

2.  **Environment Configuration:**
    The `content-site` application is pre-configured to point to the local mock server.
    *   Config file: `src/apps/content-site/.env.local`
    *   AEM Host: `http://localhost:4502`

## Development

### Start the Development Environment
To run both the Next.js application and the Mock AEM server concurrently:

```bash
npm run dev
```

*   **Content Site**: [http://localhost:3000](http://localhost:3000)
*   **Mock AEM Server**: [http://localhost:4502](http://localhost:4502)
    *   **GraphiQL Explorer**: [http://localhost:4502/content/graphql/global/endpoint.json](http://localhost:4502/content/graphql/global/endpoint.json)

### Storybook
*   **Run Storybook**: `nx run @aem-headless/ui:storybook`
*   **Build Storybook**: `nx run @aem-headless/ui:build-storybook`

### Build & Test
*   **Build All**: `nx run-many --target=build --all`
*   **Lint All**: `nx run-many --target=lint --all`

## Key Conventions

*   **Dependency Management**: All packages (React, Next.js, etc.) are defined in the **root** `package.json`. Do not add dependencies to individual app/lib `package.json` files; they act only as Nx project markers.
*   **Data Loading**:
    *   The Mock Server uses `fs.readFileSync` to load `content-tree.json` to avoid ESM import attribute compatibility issues across Node versions.
    *   The App uses `AEMClient` which automatically toggles between the real AEM environment and the local mock server based on `NEXT_PUBLIC_AEM_HOST`.
*   **GraphQL**:
    *   Persisted queries (e.g., `aem-demo-assets/adventures-all`) are intercepted by the Mock Server middleware and mapped to standard internal GraphQL queries.

## Recent Changes
*   **Upgraded to Next.js 14**: To resolve compatibility issues with Nx 22.
*   **GraphQL 16 Support**: The mock server now uses `graphql-http` instead of the deprecated `express-graphql`.
*   **Robustness**: Added null checks in UI components (`HeroAdventureCard`) to handle sparse mock data gracefully.
