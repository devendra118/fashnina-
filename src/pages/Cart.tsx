import { Link } from 'react-router-dom'
import { inr } from '../config/store'
import { useShop } from '../context/Shop'
import { useSeo } from '../lib/seo'
export default function Cart() {
  useSeo('Cart'); const { lines, setQty, setSize, subtotal, discount, shipping, total, coupon, setCoupon } = useShop()
  if (!lines.length) return <div className="py-32 text-center"><h1 className="text-4xl">Your cart is empty</h1><Link to="/shop" className="btn btn-solid mt-6">Start shopping</Link></div>
  return <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 md:grid-cols-[1fr_340px] md:px-8">
    <div><h1 className="mb-6 text-4xl">Cart</h1>{lines.map((l: any) => <div key={l.id + l.size} className="flex gap-4 border-b border-line py-5"><img src={l.p.images[0]} alt={l.p.name} className="h-32 w-24 object-cover" />
      <div className="flex-1 text-sm"><p>{l.p.name}</p>
        <label className="mt-2 block">Size <select value={l.size} onChange={e => setSize(l.id, l.size, e.target.value)} className="field ml-2 w-24">{l.p.sizes.map((s: string) => <option key={s}>{s}</option>)}</select></label>
        <div className="mt-3 flex items-center gap-3"><button aria-label="Decrease quantity" className="h-11 w-11 border border-line" onClick={() => setQty(l.id, l.size, l.qty - 1)}>−</button>{l.qty}<button aria-label="Increase quantity" className="h-11 w-11 border border-line" onClick={() => setQty(l.id, l.size, l.qty + 1)}>+</button><button className="ml-4 underline" onClick={() => setQty(l.id, l.size, 0)}>Remove</button></div></div>
      <p className="text-sm">{inr((l.p.salePrice ?? l.p.price) * l.qty)}</p></div>)}</div>
    <aside className="h-fit border border-line p-6 text-sm"><h2 className="text-2xl">Summary</h2>
      <label className="mt-4 block">Coupon<input className="field mt-1" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Try WELCOME10" /></label>
      <p className="mt-4 flex justify-between"><span>Subtotal</span>{inr(subtotal)}</p>{discount > 0 && <p className="flex justify-between"><span>Discount</span>−{inr(discount)}</p>}
      <p className="flex justify-between"><span>Shipping</span>{shipping ? inr(shipping) : 'Free'}</p><p className="mt-2 flex justify-between border-t border-line pt-3 text-base"><span>Total</span>{inr(total)}</p>
      <Link to="/checkout" className="btn btn-solid mt-5 w-full">Checkout</Link></aside></div>
}
