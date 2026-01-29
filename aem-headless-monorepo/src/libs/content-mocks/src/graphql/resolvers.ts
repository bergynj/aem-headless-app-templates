import fs from 'fs';
import path from 'path';

// Load content tree dynamically to avoid ESM JSON import issues
// We need to resolve the path relative to the project root when running via Nx
const dataPath = path.join(process.cwd(), 'src/libs/content-mocks/src/data/content-tree.json');
let contentTree: any = {};
try {
  contentTree = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (e) {
  // Fallback for different execution contexts if needed, or just log
  console.error('Failed to load content-tree.json in resolvers', e);
}

// Helper function to navigate content tree
function getPageByPath(path: string): any {
  const parts = path.replace('/content/mysite/', '').split('/').filter(Boolean);
  let current: any = (contentTree as any)['/content/mysite'];
  
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

// Helper to get all pages (for list queries)
function getAllPages(node: any = (contentTree as any)['/content/mysite'], results: any[] = []): any[] {
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

// Filter pages based on GraphQL filter input
function filterPages(pages: any[], filter: any): any[] {
  if (!filter) return pages;
  
  return pages.filter(page => {
    let matches = true;
    
    if (filter._path) {
      const pathFilter = filter._path._expressions[0];
      const operator = pathFilter._operator || 'EQUALS';
      const value = pathFilter.value;
      
      switch (operator) {
        case 'EQUALS':
          matches = matches && page._path === value;
          break;
        case 'CONTAINS':
          matches = matches && page._path.includes(value);
          break;
        case 'STARTS_WITH':
          matches = matches && page._path.startsWith(value);
          break;
      }
    }
    
    if (filter._type) {
      const typeFilter = filter._type._expressions[0];
      matches = matches && page._type === typeFilter.value;
    }
    
    if (filter.title) {
      const titleFilter = filter.title._expressions[0];
      matches = matches && page.title.includes(titleFilter.value);
    }
    
    return matches;
  });
}

export const root = {
  pageByPath: ({ _path }: { _path: string }) => {
    console.log(`[GraphQL] Fetching page: ${_path}`);
    const page = getPageByPath(_path);
    
    if (!page) {
      console.log(`[GraphQL] Page not found: ${_path}`);
      return { item: null };
    }
    
    console.log(`[GraphQL] Found page: ${page.title}`);
    return { item: page };
  },
  
  pageList: ({ filter, limit = 10, offset = 0 }: { filter?: any; limit?: number; offset?: number }) => {
    console.log('[GraphQL] Fetching page list with filter:', filter);
    const allPages = getAllPages();
    const filteredPages = filterPages(allPages, filter);
    const paginatedPages = filteredPages.slice(offset, offset + limit);
    
    console.log(`[GraphQL] Returning ${paginatedPages.length} of ${filteredPages.length} pages`);
    
    return {
      items: paginatedPages,
      total: filteredPages.length
    };
  },
  
  componentByPath: ({ _path }: { _path: string }) => {
    console.log(`[GraphQL] Fetching component: ${_path}`);
    const pathParts = _path.split('/jcr:content/');
    const pagePath = pathParts[0];
    
    const page = getPageByPath(pagePath);
    if (!page || !page.components) {
      return null;
    }
    
    const component = page.components.find((c: any) => c._path === _path);
    return component || null;
  },
  
  adventureList: () => {
    console.log('[GraphQL] Fetching adventure list');
    const allPages = getAllPages();
    const adventures = allPages.filter((page: any) => page._type === 'adventure');
    
    return {
      items: adventures.map((adv: any) => ({
        _path: adv._path,
        title: adv.title,
        slug: adv.slug || adv._path.split('/').pop(),
        price: adv.price,
        tripLength: adv.tripLength,
        primaryImage: adv.primaryImage || { _path: '' },
      }))
    };
  }
};