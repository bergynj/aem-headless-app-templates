# Project Overview & Architecture

This project is a **TypeScript-based Nx Monorepo** designed to build AEM (Adobe Experience Manager) Headless applications using **Next.js 14**. It employs a Clean Architecture pattern to separate concerns between data definitions, data fetching, UI components, and the application layer.

## Applications (`src/apps`)

### `content-site`
*   **Purpose**: The primary public-facing website application.
*   **Usage**: Built with Next.js 14 (App Router). It handles routing, page rendering, and integrates all other libraries to deliver the final user experience.
*   **Benefit**: Provides a modern, high-performance frontend optimized for SEO and Core Web Vitals, fully decoupled from the AEM backend.

## Libraries (`src/libs`)

### `content-model` (The Contract)
*   **Purpose**: Defines **Type Definitions** and **Schemas**.
*   **Usage**: Exports TypeScript interfaces (e.g., `Adventure`, `Page`) that represent the expected shape of your content.
*   **Benefit**: Ensures strict type safety across the monorepo. Both the Mock Server and the Client agree on data structures. If a content model changes in AEM, updating it here triggers TypeScript warnings for any breaking changes in the code.

### `content-repo` (The Gateway)
*   **Purpose**: Abstraction layer for **Data Fetching**.
*   **Usage**: Acts as a factory/switch. It checks environment variables (e.g., `NEXT_PUBLIC_AEM_ENABLED`) to determine whether to instantiate the `AEMClient` (real AEM) or `MockClient` (local mocks).
*   **Benefit**: Decouples UI components from the data source. Components call `fetchAEMContent()` without knowing where the data comes from, allowing instant switching between "Mock Mode" and "Real AEM" without code changes.

### `content-mocks` (The Simulator)
*   **Purpose**: A local Node.js/Express server that simulates AEM's Headless APIs.
*   **Usage**: Runs locally on port 4502. It intercepts GraphQL queries and serves data from a local JSON file (`content-tree.json`).
*   **Benefit**: Enables offline development and rapid prototyping. Developers can build features without needing a heavy local AEM SDK instance or network dependency on a shared environment.

### `ui` (Pure UI)
*   **Purpose**: A collection of generic, reusable React UI components.
*   **Usage**: Contains "dumb" components like `Button`, `Card`, or `Carousel` that accept props and render UI. They have **no dependencies** on AEM or business logic.
*   **Benefit**: Promotes reusability and testability. These components can be developed in isolation (e.g., Storybook) and used in multiple applications or contexts.

### `aem-ui` (AEM-Connected UI)
*   **Purpose**: UI components specifically designed to wrap AEM logic or Core Components.
*   **Usage**: Includes components that understand AEM-specific concepts, such as the Universal Editor's editing attributes (`data-aue-*`).
*   **Example**: `withAEMEditing` HOC wraps a standard component and adds `data-aue-resource`, `data-aue-type`, `data-aue-label` attributes to the DOM node.
    ```typescript
    // In src/libs/aem-ui/src/wrappers/withAEMEditing.tsx
    export function withAEMEditing(Component, options) {
      return function AEMEditingWrapper(props) {
        // ...
        return (
          <div data-aue-resource={options.resourcePath} data-aue-type={options.componentType}>
            <Component {...props} />
          </div>
        );
      };
    }
    ```
*   **Benefit**: Bridges the gap between pure UI and AEM's editing capabilities, keeping the "pure" components clean while isolating AEM integration logic here.

### `aem-renderer` (The Mapper)
*   **Purpose**: Logic for dynamically mapping AEM JSON data to React components.
*   **Usage**: Iterates over a list of components returned by AEM (e.g., a page's content) and selects the correct React component from a registry based on the `_type` field.
*   **Example**: `ComponentMapper` takes a raw component object (e.g. `{ _type: "wknd/components/hero", ... }`) and looks it up in the registry.
    ```typescript
    // In src/libs/aem-renderer/src/ComponentMapper.tsx
    export function ComponentMapper({ component }) {
      const Component = getComponent(component._type); // e.g., returns HeroComponent
      return <Component {...component} />;
    }
    ```
*   **Benefit**: Enables the "Page Builder" experience. Content authors can reorder components in AEM, and this library ensures the frontend renders them in the correct order without hardcoded templates.

### `config` (Shared Configuration)
*   **Purpose**: Centralized configuration files for tools like ESLint, TypeScript, and Tailwind CSS.
*   **Usage**: Imported by apps and libs to ensure consistent settings.
*   **Benefit**: Enforces a "Single Version Policy" and consistent coding standards across the entire monorepo.
