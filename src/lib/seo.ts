const DEFAULT_SITE_URL = 'https://wudidingdong.netlify.app';

function normalizeSiteUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
);

export function canonicalPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const lastSegment = normalized.split('/').filter(Boolean).at(-1);

  if (normalized === '/' || lastSegment?.includes('.')) {
    return normalized;
  }

  return `${normalized.replace(/\/+$/, '')}/`;
}

export function absoluteSiteUrl(pathname: string): string {
  return `${SITE_URL}${canonicalPath(pathname)}`;
}
