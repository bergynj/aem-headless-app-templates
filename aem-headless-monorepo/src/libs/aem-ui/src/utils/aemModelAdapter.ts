/**
 * Converts AEM model structure to component props
 */

export interface AEMComponentModel {
  _type: string;
  _path: string;
  [key: string]: any;
}

export interface AEMPageModel {
  _path: string;
  _type: string;
  title?: string;
  components?: AEMComponentModel[];
  [key: string]: any;
}

/**
 * Adapts AEM component model to component props
 */
export function adaptComponentModel(model: AEMComponentModel): Record<string, any> {
  // Remove AEM-specific properties
  const { _type, _path, ...props } = model;
  return props;
}

/**
 * Adapts AEM page model to page props
 */
export function adaptPageModel(model: AEMPageModel): Record<string, any> {
  const { _path, _type, components, ...pageProps } = model;
  return {
    ...pageProps,
    components: components || [],
  };
}
