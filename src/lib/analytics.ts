// src/lib/analytics.ts
export function track(name: string, props: Record<string, any> = {}) {
  try {
    // Plausible
    // @ts-ignore
    if ((window as any).plausible) (window as any).plausible(name, { props });
    // GA4 (если подключён)
    // @ts-ignore
    if ((window as any).gtag) (window as any).gtag("event", name, props);
  } catch {
    /* no-op */
  }
}
