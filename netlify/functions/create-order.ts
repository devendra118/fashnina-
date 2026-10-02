import { getStore } from '@netlify/blobs'
import { products } from '../../src/data/products'
import { soldMap, finalize } from '../lib/orders'
import { store as cfg } from '../../src/config/store'
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json' } })
export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  let b: any; try { b = await req.json() } catch { return json({ error: 'Invalid request' }, 400) }
  const c = b.customer ?? {}
  for (const k of ['name', 'email', 'phone', 'address', 'city', 'state', 'pin', 'country']) if (!String(c[k] ?? '').trim()) return json({ error: `Missing ${k}` }, 400)
  if (!/^\d{6}$/.test(c.pin) || !/^\+?\d[\d\s-]{8,14}$/.test(c.phone) || !/^\S+@\S+\.\S+$/.test(c.email)) return json({ error: 'Check email, phone and PIN' }, 400)
  const method = ['upi', 'card', 'netbanking', 'cod'].includes(b.method) ? b.method : null
  if (!method || !Array.isArray(b.items) || !b.items.length || b.items.length > 30) return json({ error: 'Invalid order' }, 400)
  const sold = await soldMap(); let subtotal = 0; const items: any[] = []
  for (const it of b.items) {
    const p = products.find(x => x.id === it.id); const qty = Number(it.qty)
    if (!p || !p.sizes.includes(it.size) || !Number.isInteger(qty) || qty < 1 || qty > 10) return json({ error: 'Invalid item' }, 400)
    if (p.stock - (sold[p.id] ?? 0) < qty) return json({ error: `${p.name} is out of stock` }, 409)
    const price = p.salePrice ?? p.price; subtotal += price * qty; items.push({ id: p.id, name: p.name, size: it.size, qty, price })
  }
  const discount = String(b.coupon ?? '').toUpperCase() === 'WELCOME10' ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal >= cfg.freeShippingAbove ? 0 : cfg.shippingFee
  const total = subtotal - discount + shipping
  const orderId = 'NK-' + Date.now().toString(36).toUpperCase()
  const order: any = { orderId, createdAt: new Date().toISOString(), customer: c, items, subtotal, discount, shipping, total, method, status: method === 'cod' ? 'cod-placed' : 'payment-pending' }
  const db = getStore('orders')
  if (method === 'cod') { await db.setJSON(orderId, order); await finalize(order); return json({ orderId, cod: true }) }
  const id = process.env.RAZORPAY_KEY_ID, secret = process.env.RAZORPAY_KEY_SECRET
  if (!id || !secret) return json({ error: 'Online payment is not set up yet. Please choose Cash on Delivery or WhatsApp us.' }, 503)
  const r = await fetch('https://api.razorpay.com/v1/orders', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Basic ' + btoa(`${id}:${secret}`) }, body: JSON.stringify({ amount: total * 100, currency: 'INR', receipt: orderId }) })
  if (!r.ok) return json({ error: 'Payment provider error. Please try again.' }, 502)
  order.razorpayOrderId = (await r.json()).id; await db.setJSON(orderId, order)
  return json({ orderId, razorpayOrderId: order.razorpayOrderId, amount: total * 100, keyId: id })
}
