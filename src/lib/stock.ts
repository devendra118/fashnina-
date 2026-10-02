import { useEffect, useState } from 'react'
import { Product } from '../data/products'
let cache: Record<string, number> | null = null
// Remaining = stock in products.ts minus units sold (from the server). Falls back to static stock if offline.
export function useStock() {
  const [s, setS] = useState(cache)
  useEffect(() => { if (cache) return; fetch('/.netlify/functions/stock').then(r => (r.ok ? r.json() : {})).then(d => { cache = d; setS(d) }).catch(() => {}) }, [])
  return (p: Product) => Math.max(0, p.stock - ((s ?? {})[p.id] ?? 0))
}
