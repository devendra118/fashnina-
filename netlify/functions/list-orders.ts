import { getStore } from '@netlify/blobs'
export default async (req: Request) => {
  const t = process.env.ADMIN_TOKEN
  if (!t || req.headers.get('x-admin-token') !== t) return new Response('Unauthorized', { status: 401 })
  const db = getStore('orders'); const { blobs } = await db.list()
  const orders = (await Promise.all(blobs.map(x => db.get(x.key, { type: 'json' })))).filter(Boolean) as any[]
  orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return new Response(JSON.stringify(orders), { headers: { 'content-type': 'application/json' } })
}
