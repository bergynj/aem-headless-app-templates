import React from 'react';
import { AEMPageModel } from '@aem-headless/aem-ui';
import { ComponentMapper } from './ComponentMapper';

export interface DynamicPageRendererProps {
  content: AEMPageModel;
  editable?: boolean;
}

/**
 * Renders a page with components from AEM content
 */
export function DynamicPageRenderer({ content, editable = false }: DynamicPageRendererProps) {
  const { components = [], title } = content;

  return (
    <div className="aem-page" data-aue-resource={content._path} data-aue-type={content._type}>
      {title && <h1>{title}</h1>}
      {components.map((component, index) => (
        <ComponentMapper
          key={component._path || index}
          component={component}
          editable={editable}
        />
      ))}
    </div>
  );
}
