/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AEMHeadless from '@adobe/aem-headless-client-js';
import { DataClient, FetchOptions } from './DataClient';

export interface AEMClientConfig {
  serviceURL: string;
  endpoint: string;
  auth?: [string, string];
}

export class AEMClient implements DataClient {
  private aemHeadlessClient: AEMHeadless;
  private static __envClient: AEMClient | null = null;

  static fromEnv(env = process.env): AEMClient {
    if (!this.__envClient) {
      const { NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT } = env;
      console.log('Using AEM host: ' + NEXT_PUBLIC_AEM_HOST + ' and GraphQL endpoint: ' + NEXT_GRAPHQL_ENDPOINT);
      this.__envClient = new AEMClient({
        serviceURL: NEXT_PUBLIC_AEM_HOST || '',
        endpoint: NEXT_GRAPHQL_ENDPOINT || '',
      });
    }
    return this.__envClient;
  }

  constructor({ serviceURL, endpoint, auth }: AEMClientConfig) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL,
      endpoint,
      auth: auth || ['admin', 'admin'], // TODO: dynamically set auth based on AEM instance
      fetch: typeof fetch !== 'undefined' ? fetch : undefined,
    });
  }

  async fetchContent(path: string, options?: FetchOptions): Promise<any> {
    // Use provided host or default
    const host = options?.host || this.aemHeadlessClient.serviceURL;
    this.aemHeadlessClient.serviceURL = host;

    // Run persisted query for pageByPath
    const query = 'aem-demo-assets/page-by-path';
    const response = await this.aemHeadlessClient.runPersistedQuery(query, {
      variation: 'default',
      _path: path,
      timestamp: Date.now(),
    }, {
      credentials: 'include',
      headers: options?.token ? {
        'Authorization': `Bearer ${options.token}`,
      } : {},
    });

    return response.data?.pageByPath?.item;
  }

  async getAllAdventures() {
    const queryAdventuresAll = 'aem-demo-assets/adventures-all';
    const res = await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll);
    return res;
  }

  async getAdventurePaths() {
    const res = await this.getAllAdventures();
    const adventures = res?.data?.adventureList?.items || [];
    const paths = adventures.map((item: any) => ({
      params: {
        path: [item.slug],
      }
    }));
    return paths;
  }

  async getAdventureByPath(path: string) {
    const query = `{
      adventureByPath (_path: "${path}") {
        item {
            _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            description {
              html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }
}
