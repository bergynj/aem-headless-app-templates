import React from 'react';
import { AEMComponentModel } from '@aem-headless/aem-ui';
import { getComponent, hasComponent } from './registry';

export interface ComponentMapperProps {
  component: AEMComponentModel;
  editable?: boolean;
}

/**
 * Maps AEM component to React component
 */
export function ComponentMapper({ component, editable = false }: ComponentMapperProps) {
  const { _type, _path } = component;

  // Get component from registry
  const Component = getComponent(_type);

  if (!Component) {
    console.warn(`Component type "${_type}" not found in registry`);
    return (
      <div className="aem-component-missing" data-aue-resource={_path} data-aue-type={_type}>
        <p>Component type "{_type}" not registered</p>
      </div>
    );
  }

  // Render component with props
  return <Component {...component} editable={editable} />;
}
