import { getStore } from '@netlify/blobs'
import { finalize } from '../lib/orders'
import { createHmac, timingSafeEqual } from 'node:crypto'
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json' } })
export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const b: any = await req.json().catch(() => ({})); const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret || !b.orderId) return json({ error: 'Invalid request' }, 400)
  const db = getStore('orders'); const order: any = await db.get(b.orderId, { type: 'json' })
  if (!order || order.razorpayOrderId !== b.razorpay_order_id) return json({ error: 'Order mismatch' }, 400)
  const expected = createHmac('sha256', secret).update(`${b.razorpay_order_id}|${b.razorpay_payment_id}`).digest('hex')
  const given = String(b.razorpay_signature ?? '')
  if (given.length !== expected.length || !timingSafeEqual(Buffer.from(given), Buffer.from(expected))) return json({ error: 'Payment verification failed' }, 400)
  order.status = 'paid'; order.paymentId = b.razorpay_payment_id; await db.setJSON(b.orderId, order); await finalize(order)
  return json({ ok: true, orderId: b.orderId })
}
