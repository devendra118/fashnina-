// Talks to Netlify Functions (netlify/functions). Secrets never reach the browser.
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod'
declare global { interface Window { Razorpay?: any } }
const api = async (fn: string, body: unknown) => { const r = await fetch('/.netlify/functions/' + fn, { method: 'POST', body: JSON.stringify(body) }); const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'Something went wrong'); return d }
const loadScript = () => new Promise<void>((res, rej) => { if (window.Razorpay) return res(); const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = () => res(); s.onerror = () => rej(new Error('Could not load payment window')); document.body.appendChild(s) })
export async function placeOrder(p: { customer: any; items: any[]; coupon: string; method: PaymentMethod }): Promise<{ ok: boolean; orderId?: string; error?: string }> {
  try {
    const o = await api('create-order', p)
    if (o.cod) return { ok: true, orderId: o.orderId }
    await loadScript()
    return await new Promise(resolve => {
      const rz = new window.Razorpay({ key: o.keyId, amount: o.amount, currency: 'INR', order_id: o.razorpayOrderId, name: 'NK. fashnina', prefill: { name: p.customer.name, email: p.customer.email, contact: p.customer.phone },
        handler: async (r: any) => { try { const v = await api('verify-payment', { ...r, orderId: o.orderId }); resolve({ ok: true, orderId: v.orderId }) } catch (e: any) { resolve({ ok: false, error: e.message + '. If money was deducted, WhatsApp us with ref ' + o.orderId }) } },
        modal: { ondismiss: () => resolve({ ok: false, error: 'Payment was cancelled.' }) } })
      rz.open()
    })
  } catch (e: any) { return { ok: false, error: e.message } }
}
