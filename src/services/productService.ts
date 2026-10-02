// Swap these bodies for Supabase calls later; the UI stays unchanged.
import { products } from '../data/products'
export const productService = {
  list: async () => products,
  bySlug: async (s:string) => products.find(p=>p.slug===s) ?? null,
}
export const orderService = { create: async (o:unknown) => { console.info('order (mock)', o); return { id:'mock-'+Date.now() } } }
export const customerService = { upsert: async (c:unknown) => c }
