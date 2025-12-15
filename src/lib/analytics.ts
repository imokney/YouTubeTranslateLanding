import { track as vercelTrack } from '@vercel/analytics'

export function track(name: string, props: Record<string, any> = {}) {
  try {
    // Vercel Web Analytics
    vercelTrack(name, props)
    
    // Plausible
    // @ts-ignore
    if ((window as any).plausible) (window as any).plausible(name, { props });
    // GA4 (если включён)
    // @ts-ignore
    if ((window as any).gtag) (window as any).gtag("event", name, props);
  } catch {
    /* no-op */
  }
}
