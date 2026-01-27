// Client exports
export { AEMClient } from './clients/AEMClient';
export type { AEMClientConfig } from './clients/AEMClient';

export { MockClient } from './clients/MockClient';
export type { MockClientConfig } from './clients/MockClient';

export type { DataClient, FetchOptions } from './clients/DataClient';

// Factory function to get appropriate client
export function getDataClient(): DataClient {
  const aemHost = process.env.NEXT_PUBLIC_AEM_HOST;
  const aemEnabled = process.env.NEXT_PUBLIC_AEM_ENABLED !== 'false';

  if (aemHost && aemEnabled) {
    return AEMClient.fromEnv();
  } else {
    return MockClient.fromEnv();
  }
}

// Convenience functions
export async function fetchAEMContent(path: string, options?: FetchOptions) {
  const client = getDataClient();
  return client.fetchContent(path, options);
}

export async function fetchAllAEMPaths(): Promise<string[]> {
  const client = getDataClient();
  const adventures = await client.getAllAdventures();
  // Extract paths from adventures - adjust based on actual response structure
  return adventures?.data?.adventureList?.items?.map((item: any) => item._path) || [];
}
