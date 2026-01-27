import { fetchAEMContent } from '@aem-headless/content-repo';
import { notFound } from 'next/navigation';
import { DynamicPageRenderer } from '@aem-headless/aem-renderer';

interface PageProps {
  params: {
    lang: string;
    slug?: string[];
  };
  searchParams: {
    'aem-author'?: string;
    'aem-token'?: string;
  };
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  // Detect Universal Editor mode
  const isUniversalEditor = searchParams['aem-token'] !== undefined;
  const aemAuthor = searchParams['aem-author'];
  const aemToken = searchParams['aem-token'];
  
  // Convert Next.js route to AEM content path
  const path = params.slug ? `/${params.slug.join('/')}` : '/home';
  const aemContentPath = `/content/mysite/${params.lang}${path}`;
  
  // Fetch content from AEM (or mock server)
  const content = await fetchAEMContent(aemContentPath, {
    host: isUniversalEditor ? aemAuthor : process.env.NEXT_PUBLIC_AEM_PUBLISH_HOST,
    token: aemToken,
  });
  
  if (!content) {
    notFound(); // Next.js 404
  }
  
  return (
    <>
      {/* Universal Editor meta tags */}
      {isUniversalEditor && aemAuthor && (
        <>
          <meta name="urn:adobe:aue:system:aemconnection" 
                content={`aem:${aemAuthor}`} />
          <script src="https://universal-editor-service.adobe.io/cors.js" async />
        </>
      )}
      
      <DynamicPageRenderer content={content} editable={isUniversalEditor} />
    </>
  );
}

// Generate static params for build-time optimization
export async function generateStaticParams() {
  // For now, return empty array - will be populated from AEM/mock server
  // In production, fetch all available paths
  return [];
}
