/**
 * Abstract interface for data clients (AEM or Mock)
 */
export interface DataClient {
  /**
   * Fetch content by path from AEM or mock server
   */
  fetchContent(path: string, options?: FetchOptions): Promise<any>;

  /**
   * Fetch all adventures
   */
  getAllAdventures(): Promise<any>;

  /**
   * Get adventure paths for static generation
   */
  getAdventurePaths(): Promise<Array<{ params: { path: string[] } }>>;

  /**
   * Get adventure by path
   */
  getAdventureByPath(path: string): Promise<any>;
}

export interface FetchOptions {
  host?: string;
  token?: string;
  userId?: string;
}
