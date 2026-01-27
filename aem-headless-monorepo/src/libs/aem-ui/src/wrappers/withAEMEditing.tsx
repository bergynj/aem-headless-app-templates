import React from 'react';

export interface AEMEditingProps {
  'data-aue-resource'?: string;
  'data-aue-type'?: string;
  'data-aue-label'?: string;
  'data-aue-model'?: string;
  'data-aue-behavior'?: string;
}

/**
 * Higher-order component that adds AEM Universal Editor attributes
 */
export function withAEMEditing<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    resourcePath?: string;
    componentType?: string;
    label?: string;
    model?: string;
    behavior?: string;
  } = {}
) {
  return function AEMEditingWrapper(props: P & { editable?: boolean }) {
    const { editable = false, ...componentProps } = props;
    
    // Only add AEM attributes if editing is enabled
    if (!editable) {
      return <Component {...(componentProps as P)} />;
    }

    const aemProps: AEMEditingProps = {};
    
    if (options.resourcePath) {
      aemProps['data-aue-resource'] = options.resourcePath;
    }
    
    if (options.componentType) {
      aemProps['data-aue-type'] = options.componentType;
    }
    
    if (options.label) {
      aemProps['data-aue-label'] = options.label;
    }
    
    if (options.model) {
      aemProps['data-aue-model'] = options.model;
    }
    
    if (options.behavior) {
      aemProps['data-aue-behavior'] = options.behavior;
    }

    return (
      <div {...aemProps}>
        <Component {...(componentProps as P)} />
      </div>
    );
  };
}

/**
 * Base wrapper component for AEM editing
 */
export interface AEMComponentProps {
  children: React.ReactNode;
  resourcePath?: string;
  componentType?: string;
  editable?: boolean;
}

export function AEMComponent({ 
  children, 
  resourcePath, 
  componentType, 
  editable = false 
}: AEMComponentProps) {
  if (!editable) {
    return <>{children}</>;
  }

  const props: AEMEditingProps = {};
  
  if (resourcePath) {
    props['data-aue-resource'] = resourcePath;
  }
  
  if (componentType) {
    props['data-aue-type'] = componentType;
  }

  return <div {...props}>{children}</div>;
}
