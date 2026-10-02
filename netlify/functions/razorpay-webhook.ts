import { getStore } from '@netlify/blobs'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { finalize } from '../lib/orders'
// Razorpay Dashboard > Webhooks: URL https://YOUR-SITE/.netlify/functions/razorpay-webhook, event "order.paid", set a secret.
export default async (req: Request) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET; const raw = await req.text()
  const sig = req.headers.get('x-razorpay-signature') ?? ''
  if (!secret) return new Response('Not configured', { status: 503 })
  const exp = createHmac('sha256', secret).update(raw).digest('hex')
  if (sig.length !== exp.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(exp))) return new Response('Bad signature', { status: 400 })
  const ev = JSON.parse(raw)
  if (ev.event === 'order.paid') {
    const rz = ev.payload?.order?.entity; const db = getStore('orders'); const order: any = rz?.receipt ? await db.get(rz.receipt, { type: 'json' }) : null
    if (order && order.razorpayOrderId === rz.id && rz.amount_paid === order.total * 100) { order.status = 'paid'; await db.setJSON(order.orderId, order); await finalize(order) }
  }
  return new Response('ok')
}
