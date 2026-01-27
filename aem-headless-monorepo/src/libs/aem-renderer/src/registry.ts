import React from 'react';
import { AEMComponentModel } from '@aem-headless/aem-ui';

/**
 * Component registry mapping AEM component types to React components
 */
export type ComponentRegistry = Map<string, React.ComponentType<any>>;

/**
 * Default component registry
 */
export const defaultRegistry: ComponentRegistry = new Map();

/**
 * Register a component type
 */
export function registerComponent(
  aemType: string,
  component: React.ComponentType<any>
): void {
  defaultRegistry.set(aemType, component);
}

/**
 * Get component from registry
 */
export function getComponent(aemType: string): React.ComponentType<any> | undefined {
  return defaultRegistry.get(aemType);
}

/**
 * Check if component type is registered
 */
export function hasComponent(aemType: string): boolean {
  return defaultRegistry.has(aemType);
}
