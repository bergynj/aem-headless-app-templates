# Mock API Architecture & Usage

## Overview

The `content-mocks` library (`src/libs/content-mocks`) provides a local emulation of Adobe Experience Manager (AEM) Headless APIs. It allows developers to build and test the frontend application without requiring a running AEM instance.

It simulates:
1.  **AEM GraphQL API**: Including "Persisted Queries".
2.  **AEM Model JSON API**: REST-like access to page content.
3.  **Asset Delivery**: Basic placeholder serving.

## Architecture

The mock server is a Node.js/Express application.

### Key Components

1.  **Server Entry Point (`server.ts`)**:
    *   Sets up the Express app running on port `4502` (default).
    *   Loads the data source (`content-tree.json`) into memory at startup.
    *   Configures middleware to intercept AEM-specific routes.

2.  **Data Source (`src/data/content-tree.json`)**:
    *   A single, large JSON file that acts as the database.
    *   Represents the hierarchical content tree structure of AEM (e.g., `/content/mysite/en/home`).
    *   Contains both Page nodes and their constituent Components.

3.  **GraphQL Engine**:
    *   **Schema (`src/graphql/schema.ts`)**: Defines the typed structure of pages, components, and custom data types (e.g., `Adventure`).
    *   **Resolvers (`src/graphql/resolvers.ts`)**: Logic to fetch data from the in-memory `content-tree.json` based on the query.

4.  **Persisted Query Emulator**:
    *   AEM uses "Persisted Queries" (GET requests to `/graphql/execute.json/project/query-name`).
    *   The mock server intercepts these requests in `server.ts`, maps the `query-name` to a standard GraphQL query string, and executes it internally.

## Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/content/graphql/global/endpoint.json` | Standard GraphQL endpoint. |
| `GET` | `/content/graphql/global/endpoint.json` | Renders GraphiQL (IDE) interface. |
| `GET` | `/graphql/execute.json/<project>/<name>` | Emulates AEM Persisted Queries. |
| `GET` | `/content/mysite/*` | Returns raw JSON for a page (Model JSON). |
| `GET` | `/api/routes` | Utility: Lists all available routes (for static generation). |

## How to Create Mock Data

Depending on what you need to mock, you will modify different files.

### 1. Adding a New Page or Content

To add a new page (e.g., a new "Adventure" or a standard content page), edit `src/libs/content-mocks/src/data/content-tree.json`.

**Structure:**
```json
{
  "/content/mysite/en/new-page": {
    "_path": "/content/mysite/en/new-page",
    "_type": "page",
    "title": "My New Page",
    "components": [
      {
        "_type": "wknd/components/text",
        "_path": "/content/mysite/en/new-page/jcr:content/text-1",
        "text": "Hello World"
      }
    ]
  }
}
```
*   **Note**: Ensure the `_path` matches the key structure.
*   **Linking**: If the page is a child of another, ensure it is nested correctly in the JSON structure or linked via a `children` property if the parent supports it.

### 2. Adding a New Component Type

If you are building a new UI component (e.g., `Carousel`) and need mock data for it:

1.  **Update Data**: Add the component object to the `components` array of a page in `content-tree.json`.
    ```json
    {
      "_type": "wknd/components/carousel",
      "_path": "...",
      "items": [...]
    }
    ```
2.  **Update Schema**: Edit `src/libs/content-mocks/src/graphql/schema.ts`.
    *   Define the type:
        ```graphql
        type CarouselComponent implements Component {
          _type: String!
          _path: String!
          items: [CarouselItem]
        }
        ```
    *   Add it to the `Component` union or interface if specific fields need to be queried.

### 3. Adding/Modifying a Persisted Query

The frontend usually fetches data by calling a named query (e.g., `fetch('.../graphql/execute.json/wknd/adventure-list')`). To make this work locally:

1.  **Open `src/libs/content-mocks/src/server.ts`**.
2.  Locate the `app.get('/graphql/execute.json/*', ...)` middleware.
3.  Add a new `else if` block for your query name:

```typescript
} else if (queryName === 'wknd/my-new-query') {
  query = `
    query MyNewQuery($path: String!) {
      pageByPath(_path: $path) {
        item {
          _path
          title
          # Add fields you expect
        }
      }
    }
  `;
}
```

This tells the mock server: "When someone asks for `wknd/my-new-query`, run *this* actual GraphQL query against the internal schema."

## Troubleshooting

*   **Changes not reflecting?**: The server loads `content-tree.json` at startup. **Restart the server** (`npm run dev` or stop/start) after modifying `content-tree.json` or `server.ts`.
*   **"Unknown persisted query"**: Check the server console logs. If you see this error, it means the frontend is requesting a query name that hasn't been added to the mapping logic in `server.ts`.

## Mock API Approach
  The content-mocks library is a custom, lightweight Node.js simulation built specifically for this project template.
  _(Designed to let frontend developers work quickly without installing Java or running the heavy AEM SDK.)_

*   **Mock Limitations**:
Since the mock server is just a simple Express app reading a
static JSON file (content-tree.json), it lacks the powerful
engines present in real AEM:

  1. Dynamic Asset Delivery: Real AEM dynamically resizes,
    crops (Smart Crop), and formats images on the fly. This
    mock just serves static files.
  2. Universal Editor "Write" Operations: You can render the
    page, but you cannot "save" changes back to the mock
    server using the Universal Editor. It is effectively
    read-only.
  3. Complex GraphQL Queries: The mock implementation of
    filtering, sorting, and pagination (in resolvers.ts) is
    likely basic. It may not support complex AEM GraphQL
    features like multi-field filtering or complex joins.
  4. Server-Side Rendering (HTL): It only mocks the Headless
    (JSON) APIs. It cannot simulate AEM's traditional
    server-side HTML rendering.
  5. Access Control (ACLs): It does not simulate AEM's
    user/group permission logic.
