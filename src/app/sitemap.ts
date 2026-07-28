import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import { absoluteSiteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseConfig = getConfig();
  const runtimeI18n = getRuntimeI18nConfig(baseConfig.i18n);
  const localizedConfig = getConfig(runtimeI18n.defaultLocale);

  const routes = Array.from(
    new Set(
      localizedConfig.navigation
        .filter((item) => item.type === 'page')
        .map((item) => item.href)
    )
  );

  return routes.map((route) => ({
    // next.config.ts enables trailingSlash, so publish the URL that Netlify
    // serves directly instead of its redirecting, slashless counterpart.
    url: absoluteSiteUrl(route),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
