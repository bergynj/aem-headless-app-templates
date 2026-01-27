import { useEffect, useState } from 'react';

/**
 * Hook to detect if Universal Editor is active
 */
export function useAEMEditing(): boolean {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check for Universal Editor query params
    const params = new URLSearchParams(window.location.search);
    const hasAEMToken = params.has('aem-token');
    
    // Check if AEM is enabled
    const aemEnabled = process.env.NEXT_PUBLIC_AEM_ENABLED !== 'false';
    
    setIsEditing(hasAEMToken && aemEnabled);
  }, []);

  return isEditing;
}

/**
 * Get AEM author host from query params
 */
export function useAEMAuthorHost(): string | null {
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorHost = params.get('aem-author');
    setHost(authorHost);
  }, []);

  return host;
}
