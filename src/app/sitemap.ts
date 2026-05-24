import { MetadataRoute } from 'next';
import { navigation } from '@/lib/data';

const baseUrl = 'https://vforcetax.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/pricing',
    '/privacy',
    '/terms',
    '/booking',
    '/news',
    '/tax-ai-guide',
    '/individual-tax',
    '/business-tax',
    '/business-services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // News routes
  const newsRoutes = [
    '/news/2026-27-tax-reform',
    '/news/federal-budget-2026-property-investors',
    '/news/instant-asset-write-off-20000',
    '/news/maximise-tax-return-2025-26',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Service Routes from data.ts
  const serviceRoutes = navigation.flatMap((category) => 
    category.subRoutes.map((service) => ({
      url: `${baseUrl}${service.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  );

  return [...staticRoutes, ...newsRoutes, ...serviceRoutes];
}
