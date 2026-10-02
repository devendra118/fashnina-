import { useState } from 'react'
import { Link } from 'react-router-dom'
import { inr } from '../config/store'
import { useShop } from '../context/Shop'
import { placeOrder, PaymentMethod } from '../services/payment'
import { useSeo } from '../lib/seo'
const fields = [['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel'], ['address', 'Address', 'text'], ['city', 'City', 'text'], ['state', 'State', 'text'], ['pin', 'PIN code', 'text'], ['country', 'Country', 'text']]
export default function Checkout() {
  useSeo('Checkout'); const { lines, total, clear, coupon } = useShop(); const [busy, setBusy] = useState(false); const [srvErr, setSrvErr] = useState(''); const [f, setF] = useState<any>({ country: 'India' }); const [pay, setPay] = useState<PaymentMethod>('cod'); const [errs, setErrs] = useState<any>({}); const [done, setDone] = useState('')
  if (done) return <div className="py-32 text-center"><h1 className="text-4xl">Order request received</h1><p className="mt-2">Reference {done}. We will confirm your order shortly by email or WhatsApp.</p></div>
  if (!lines.length) return <div className="py-32 text-center"><h1 className="text-4xl">Nothing to check out</h1><Link to="/shop" className="btn btn-solid mt-6">Browse the shop</Link></div>
  const submit = async (e: React.FormEvent) => { e.preventDefault(); const er: any = {}
    fields.forEach(([k, l]) => { if (!f[k]?.trim()) er[k] = `Enter ${l.toLowerCase()}.` }); if (f.pin && !/^\d{6}$/.test(f.pin)) er.pin = 'PIN must be 6 digits.'
    setErrs(er); if (Object.keys(er).length) return
    setSrvErr(''); setBusy(true); const r = await placeOrder({ customer: f, items: lines.map((l: any) => ({ id: l.id, size: l.size, qty: l.qty })), coupon, method: pay }); setBusy(false); if (r.ok) { clear(); setDone(r.orderId!) } else setSrvErr(r.error || 'Could not place order') }
  return <form onSubmit={submit} noValidate className="mx-auto grid max-w-[1100px] gap-10 px-4 py-10 md:grid-cols-[1fr_340px] md:px-8">
    <div><h1 className="mb-6 text-4xl">Checkout</h1><div className="grid gap-4 sm:grid-cols-2">{fields.map(([k, l, t]) => <label key={k} className={`text-sm ${k === 'address' ? 'sm:col-span-2' : ''}`}>{l}<input type={t} className="field mt-1" value={f[k] ?? ''} onChange={e => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errs[k]} />{errs[k] && <span role="alert" className="text-wine">{errs[k]}</span>}</label>)}</div>
      <fieldset className="mt-8"><legend className="text-sm">Payment</legend>{([['upi', 'UPI'], ['card', 'Credit / Debit card'], ['netbanking', 'Net banking'], ['cod', 'Cash on delivery']] as [PaymentMethod, string][]).map(([v, l]) => <label key={v} className="flex min-h-11 items-center gap-2"><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v)} />{l}</label>)}
        <p className="mt-2 text-sm opacity-70">UPI, card and net banking are paid securely via Razorpay.</p></fieldset><p className="mt-4 text-xs opacity-70">By placing your order you agree to our <Link to="/terms" className="underline">Terms</Link>, <Link to="/privacy" className="underline">Privacy Policy</Link>, <Link to="/shipping" className="underline">Shipping</Link> and <Link to="/returns" className="underline">Returns</Link> policies.</p></div>
    <aside className="h-fit border border-line p-6 text-sm"><h2 className="text-2xl">Order summary</h2>{lines.map((l: any) => <p key={l.id + l.size} className="mt-2 flex justify-between"><span>{l.p.name} ({l.size}) × {l.qty}</span></p>)}<p className="mt-4 flex justify-between border-t border-line pt-3 text-base"><span>Total</span>{inr(total)}</p>{srvErr && <p role="alert" className="mt-3 text-wine">{srvErr}</p>}<button disabled={busy} className="btn btn-solid mt-5 w-full disabled:opacity-50">{busy ? 'Please wait…' : pay === 'cod' ? 'Place order' : 'Pay now'}</button></aside></form>
}
