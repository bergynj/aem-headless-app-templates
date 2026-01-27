/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@aem-headless/ui',
        '@aem-headless/aem-ui',
        '@aem-headless/aem-renderer',
        '@aem-headless/content-repo',
        '@aem-headless/content-model',
    ],
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 600000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'publish-p81252-e700817.adobeaemcloud.com',
                // port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'publish-p64257-e147834-cmstg.adobeaemcloud.com',
                // port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wknd.site',
                // port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
