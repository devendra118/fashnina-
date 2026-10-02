import { soldMap } from '../lib/orders'
export default async () => new Response(JSON.stringify(await soldMap()), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=30' } })
