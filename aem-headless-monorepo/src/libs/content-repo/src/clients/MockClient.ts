import { DataClient, FetchOptions } from './DataClient';

export interface MockClientConfig {
  mockServerUrl?: string;
}

export class MockClient implements DataClient {
  private mockServerUrl: string;
  private static __envClient: MockClient | null = null;

  static fromEnv(env = process.env): MockClient {
    if (!this.__envClient) {
      const mockServerUrl = env.MOCK_SERVER_URL || 'http://localhost:4502';
      this.__envClient = new MockClient({ mockServerUrl });
    }
    return this.__envClient;
  }

  constructor({ mockServerUrl = 'http://localhost:4502' }: MockClientConfig) {
    this.mockServerUrl = mockServerUrl;
  }

  async fetchContent(path: string, options?: FetchOptions): Promise<any> {
    // Fetch from mock server GraphQL endpoint
    const response = await fetch(`${this.mockServerUrl}/content/graphql/global/endpoint.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query PageByPath($path: String!) {
            pageByPath(_path: $path) {
              item {
                _path
                _type
                title
                seoTitle
                seoDescription
                components {
                  _type
                  _path
                }
              }
            }
          }
        `,
        variables: { path },
      }),
    });

    const { data } = await response.json();
    return data?.pageByPath?.item;
  }

  async getAllAdventures() {
    const response = await fetch(`${this.mockServerUrl}/content/graphql/global/endpoint.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            adventureList {
              items {
                _path
                title
                slug
                price
                tripLength
                primaryImage {
                  _path
                }
              }
            }
          }
        `,
      }),
    });

    const { data } = await response.json();
    return data;
  }

  async getAdventurePaths() {
    const res = await this.getAllAdventures();
    const adventures = res?.adventureList?.items || [];
    const paths = adventures.map((item: any) => ({
      params: {
        path: [item.slug],
      }
    }));
    return paths;
  }

  async getAdventureByPath(path: string) {
    return this.fetchContent(path);
  }
}
