import { useEffect } from 'react'
export function useSeo(title: string, description = '', ld?: object) {
  useEffect(() => {
    document.title = title ? `${title} | NK. fashnina` : 'NK. fashnina | Designer Indian Fashion, Jaipur'
    const set = (sel: string, attr: string, val: string, make: () => HTMLElement) => { let e = document.head.querySelector(sel) as HTMLElement | null; if (!e) { e = make(); document.head.appendChild(e) } e.setAttribute(attr, val) }
    set('meta[name=description]', 'content', description, () => Object.assign(document.createElement('meta'), { name: 'description' }))
    set('link[rel=canonical]', 'href', location.origin + location.pathname, () => Object.assign(document.createElement('link'), { rel: 'canonical' }))
    const og: Record<string, string> = { 'og:title': document.title, 'og:description': description, 'og:url': location.href, 'og:type': 'website', 'og:site_name': 'NK. fashnina' }
    for (const [k, v] of Object.entries(og)) { let e = document.head.querySelector(`meta[property="${k}"]`); if (!e) { e = document.createElement('meta'); e.setAttribute('property', k); document.head.appendChild(e) } e.setAttribute('content', v) }
    let s: HTMLScriptElement | null = null
    if (ld) { s = document.createElement('script'); s.type = 'application/ld+json'; s.text = JSON.stringify(ld); document.head.appendChild(s) }
    return () => { s?.remove() }
  }, [title, description])
}
