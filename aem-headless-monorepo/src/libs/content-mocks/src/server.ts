import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import cors from 'cors';
import morgan from 'morgan';
import { schema } from './graphql/schema.js';
import { root } from './graphql/resolvers.js';
import contentTree from './data/content-tree.json' with { type: 'json' };

const app = express();
const PORT = process.env.MOCK_SERVER_PORT ? parseInt(process.env.MOCK_SERVER_PORT) : 4502;
const SIMULATE_DELAY = parseInt(process.env.SIMULATE_DELAY || '0');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Simulate AEM delay (optional)
app.use((req, res, next) => {
  if (SIMULATE_DELAY > 0) {
    setTimeout(() => next(), SIMULATE_DELAY);
  } else {
    next();
  }
});

// ============================================
// GraphQL Endpoint (Primary)
// ============================================

const gqlHandler = createHandler({
  schema: schema,
  rootValue: root,
});

// Helper to serve GraphiQL or handle GraphQL
const handleGraphQL = (req, res) => {
  if (req.method === 'GET' && req.headers.accept?.includes('text/html')) {
    res.type('html').send(ruruHTML({ endpoint: req.baseUrl + req.path }));
  } else {
    gqlHandler(req, res);
  }
};

app.all('/content/graphql/global/endpoint.json', handleGraphQL);
app.all('/content/_cq_graphql/global/endpoint.json', handleGraphQL);

// ============================================
// REST API Endpoints (For model.json access)
// ============================================

// Helper function to navigate content tree
function getPageByPath(path: string): any {
  const parts = path.replace('/content/mysite/', '').split('/').filter(Boolean);
  let current: any = contentTree['/content/mysite'];
  
  for (const part of parts) {
    if (current.children && current.children[part]) {
      current = current.children[part];
    } else if (current[part]) {
      current = current[part];
    } else {
      return null;
    }
  }
  
  return current;
}

function getAllPages(node: any = contentTree['/content/mysite'], results: any[] = []): any[] {
  Object.keys(node).forEach(key => {
    if (key !== 'children' && typeof node[key] === 'object' && node[key]._path) {
      results.push(node[key]);
      if (node[key].children) {
        getAllPages(node[key].children, results);
      }
    }
  });
  return results;
}

// Get page content as JSON (model.json pattern)
app.get('/content/mysite/*', (req, res) => {
  const path = req.path;
  console.log(`[REST] Fetching: ${path}`);
  
  // Remove .model.json or .json extension if present
  let contentPath = path.replace(/\.model\.json$/, '').replace(/\.json$/, '');
  
  const page = getPageByPath(contentPath);
  
  if (!page) {
    console.log(`[REST] Page not found: ${contentPath}`);
    return res.status(404).json({ error: 'Page not found' });
  }
  
  console.log(`[REST] Returning page: ${page.title}`);
  res.json(page);
});

// Get component as JSON
app.get('/content/mysite/*/jcr:content/*', (req, res) => {
  const path = req.path.replace(/\.json$/, '');
  console.log(`[REST] Fetching component: ${path}`);
  
  // Extract page and component paths
  const pathParts = path.split('/jcr:content/');
  const pagePath = pathParts[0];
  const componentPath = pathParts[1];
  
  const page = getPageByPath(pagePath);
  if (!page || !page.components) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  const component = page.components.find((c: any) => 
    c._path === path || c._path.endsWith(componentPath)
  );
  
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  res.json(component);
});

// ============================================
// Mock Assets Endpoint
// ============================================
app.get('/assets/*', (req, res) => {
  // In real implementation, serve actual files
  // For now, return placeholder
  res.json({
    path: req.path,
    type: 'asset',
    message: 'Mock asset - in production, serve actual file'
  });
});

// ============================================
// Utility Endpoints
// ============================================

// List all available routes
app.get('/api/routes', (req, res) => {
  const routes = getAllPages();
  res.json({
    total: routes.length,
    routes: routes.map((r: any) => ({
      path: r._path,
      title: r.title,
      type: r._type
    }))
  });
});

// Get route configuration (for Next.js generateStaticParams)
app.get('/api/routes/config', (req, res) => {
  const routes = getAllPages();
  
  const config = routes.map((route: any) => {
    const slug = route._path
      .replace('/content/mysite/', '')
      .split('/')
      .filter(Boolean);
    
    return {
      slug,
      path: route._path,
      type: route._type,
      revalidate: route._type === 'blog-post' ? 60 : 3600
    };
  });
  
  res.json(config);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    endpoints: {
      graphql: `http://localhost:${PORT}/content/graphql/global/endpoint.json`,
      rest: `http://localhost:${PORT}/content/mysite/`,
      routes: `http://localhost:${PORT}/api/routes`
    }
  });
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/content/graphql/global/endpoint.json');
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log('\n🚀 Mock AEM Server Started');
  console.log('================================');
  console.log(`GraphQL Endpoint: http://localhost:${PORT}/content/graphql/global/endpoint.json`);
  console.log(`GraphiQL UI:      http://localhost:${PORT}/content/graphql/global/endpoint.json`);
  console.log(`REST API:         http://localhost:${PORT}/content/mysite/`);
  console.log(`Health Check:     http://localhost:${PORT}/health`);
  console.log(`Routes List:      http://localhost:${PORT}/api/routes`);
  console.log('================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});
