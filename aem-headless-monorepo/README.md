# AEM Headless Monorepo

This is a monorepo structure for AEM headless applications using Nx, Next.js, and React Server Components.

## Structure

```
apps/
  └── content-site/        # Main Next.js application

libs/
  ├── ui/                  # Pure React component library
  ├── aem-ui/              # AEM Universal Editor instrumentation
  ├── aem-renderer/        # Block → React component mapping
  ├── content-repo/        # Data access layer (AEM + Mock clients)
  ├── content-mocks/       # Express mock server for local development
  └── content-model/       # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker and Docker Compose (for local Redis/PostgreSQL)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start local services (Redis and PostgreSQL):
```bash
docker-compose up -d
```

3. Start the mock AEM server:
```bash
nx serve content-mocks
```

4. In another terminal, start the Next.js app:
```bash
nx dev content-site
```

The app will be available at `http://localhost:3000`

## Development

### Local Development Without AEM

The monorepo is designed to work without AEM dependency:

1. Set `NEXT_PUBLIC_AEM_ENABLED=false` in `.env.local`
2. The mock server (`libs/content-mocks`) provides a GraphQL API compatible with AEM
3. Mock server runs on port 4502 by default

### Running Commands

- `nx dev content-site` - Start Next.js app
- `nx serve content-mocks` - Start mock AEM server
- `nx build content-site` - Build Next.js app
- `nx lint` - Lint all projects
- `nx test` - Run tests

### Adding New Components

1. Add components to `libs/ui/src/components/`
2. Export from `libs/ui/src/index.ts`
3. Register in `libs/aem-renderer/src/registry.ts` if needed for AEM mapping

## Architecture

- **Next.js owns routing** - Controls URL patterns and page rendering
- **AEM provides content** - Based on path requests via GraphQL
- **Universal Editor maps** - AEM content paths to Next.js URLs for editing
- **Mock server enables** - Local development without AEM dependency

## Related Projects

1. [Next.js + Headless GraphQL API + Remote SPA Editor](/nextjs-remotespa/)
2. [React + Universal Editor](https://github.com/adobe/universal-editor-sample-editable-app)
3. [Vue + Universal Editor](https://github.com/adobe/universal-editor-sample-editable-app-vue)
