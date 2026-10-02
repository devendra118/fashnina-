import { getStore } from '@netlify/blobs'
import { store as cfg, inr } from '../../src/config/store'
// Units sold so far per product id. Remaining stock = products.ts stock - sold.
export const soldMap = async () => { const s = getStore('sold'); const { blobs } = await s.list(); const m: Record<string, number> = {}; await Promise.all(blobs.map(async b => { m[b.key] = Number(await s.get(b.key)) || 0 })); return m }
const esc = (v: unknown) => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
async function mail(to: string | undefined, subject: string, html: string) {
  const k = process.env.RESEND_API_KEY; if (!k || !to) return
  try { await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: 'Bearer ' + k, 'content-type': 'application/json' }, body: JSON.stringify({ from: process.env.FROM_EMAIL || 'NK. fashnina <onboarding@resend.dev>', to: [to], subject, html }) }) } catch { /* never block an order on email */ }
}
// Idempotent: counts stock and sends emails once per order (payment confirmed, or COD placed).
export async function finalize(order: any) {
  const db = getStore('orders'); const fresh: any = (await db.get(order.orderId, { type: 'json' })) ?? order
  if (fresh.finalized) return fresh
  fresh.finalized = true; await db.setJSON(fresh.orderId, fresh)
  const s = getStore('sold')
  for (const i of fresh.items) await s.set(i.id, String((Number(await s.get(i.id)) || 0) + i.qty))
  const c = fresh.customer
  const lines = fresh.items.map((i: any) => `<li>${esc(i.name)} (${esc(i.size)}) × ${i.qty}</li>`).join('')
  const html = `<h2>Order ${esc(fresh.orderId)}</h2><ul>${lines}</ul><p>Total: ${inr(fresh.total)} (${esc(fresh.method === 'cod' ? 'Cash on delivery' : 'Paid online')})</p>`
  await mail(process.env.OWNER_EMAIL || cfg.email, `New order ${fresh.orderId}`, `${html}<p>${esc(c.name)}, ${esc(c.phone)}, ${esc(c.email)}<br>${esc(c.address)}, ${esc(c.city)}, ${esc(c.state)} ${esc(c.pin)}</p>`)
  await mail(c.email, `Your NK. fashnina order ${fresh.orderId}`, `<p>Thank you, ${esc(c.name)}. We have received your order.</p>${html}<p>Questions? WhatsApp ${esc(cfg.phone)}.</p>`)
  return fresh
}
