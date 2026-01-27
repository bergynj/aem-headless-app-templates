declare module '@adobe/aem-headless-client-js' {
  export interface AEMHeadlessConfig {
    serviceURL: string;
    endpoint?: string;
    auth?: string | string[];
    headers?: Record<string, string>;
    fetch?: typeof fetch;
  }

  export default class AEMHeadless {
    serviceURL: string;
    constructor(config: AEMHeadlessConfig);
    runQuery(query: string, variables?: Record<string, unknown>): Promise<any>;
    runPersistedQuery(
      path: string,
      variables?: Record<string, unknown>,
      options?: RequestInit,
    ): Promise<any>;
  }
}
