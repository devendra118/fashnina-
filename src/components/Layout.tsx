import { useState, ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, Menu, MessageCircle, Search, ShoppingBag, X, Minus, Plus } from 'lucide-react'
import { store, waLink, inr } from '../config/store'
import { categories, occasions } from '../data/categories'
import { collections } from '../data/collections'
import { useShop } from '../context/Shop'
const nav = [['Shop', '/shop'], ['Collections', '/collections'], ['Wedding', '/wedding'], ['Designer', '/designer'], ['Craft', '/craft'], ['About', '/about']]
const IconLink = ({ to, label, children, badge }: any) => <Link to={to} aria-label={label} className="relative grid h-11 w-11 place-items-center">{children}{badge > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-wine px-1 text-[10px] text-ivory">{badge}</span>}</Link>
function CartDrawer() {
  const { drawer, setDrawer, lines, setQty, subtotal } = useShop()
  if (!drawer) return null
  return <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
    <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
    <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory p-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl">Your cart</h2><button aria-label="Close cart" onClick={() => setDrawer(false)}><X /></button></div>
      <div className="mt-6 flex-1 space-y-5 overflow-y-auto">
        {lines.length === 0 && <p>Your cart is empty. <Link className="underline" to="/shop" onClick={() => setDrawer(false)}>Browse the shop</Link></p>}
        {lines.map((l: any) => <div key={l.id + l.size} className="flex gap-4"><img src={l.p.images[0]} alt={l.p.name} className="h-24 w-20 object-cover" />
          <div className="flex-1 text-sm"><p>{l.p.name}</p><p className="opacity-60">Size {l.size}</p>
            <div className="mt-2 flex items-center gap-3"><button aria-label="Decrease quantity" onClick={() => setQty(l.id, l.size, l.qty - 1)}><Minus size={16} /></button>{l.qty}<button aria-label="Increase quantity" onClick={() => setQty(l.id, l.size, l.qty + 1)}><Plus size={16} /></button></div></div>
          <p className="text-sm">{inr((l.p.salePrice ?? l.p.price) * l.qty)}</p></div>)}
      </div>
      <p className="flex justify-between py-4"><span>Subtotal</span><span>{inr(subtotal)}</span></p>
      <Link to="/cart" onClick={() => setDrawer(false)} className="btn btn-line">View cart</Link>
      <Link to="/checkout" onClick={() => setDrawer(false)} className="btn btn-solid mt-2">Checkout</Link>
    </aside></div>
}
export default function Layout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false); const [mega, setMega] = useState<string | null>(null); const [q, setQ] = useState(''); const [searching, setSearching] = useState(false)
  const { wish, count } = useShop(); const go = useNavigate(); const wa = waLink('Hello NK. fashnina, I would like help choosing an outfit.')
  const submit = (e: React.FormEvent) => { e.preventDefault(); go('/shop?q=' + encodeURIComponent(q)); setSearching(false); setMenu(false) }
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-ivory focus:p-3">Skip to content</a>
    <div className="bg-ink py-2 text-center text-xs tracking-wide text-ivory">{store.announcement}</div>
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur" onMouseLeave={() => setMega(null)}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
        <button className="md:hidden grid h-11 w-11 place-items-center" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></button>
        <Link to="/" className="font-serif text-2xl tracking-wide">{store.brandName}</Link>
        <nav aria-label="Main" className="hidden gap-8 text-sm md:flex">
          {nav.map(([n, to]) => <NavLink key={to} to={to} onMouseEnter={() => setMega(n)} onFocus={() => setMega(n)} className="py-5 hover:text-gold">{n}</NavLink>)}
        </nav>
        <div className="flex items-center">
          <button className="grid h-11 w-11 place-items-center" aria-label="Search" onClick={() => setSearching(s => !s)}><Search size={20} /></button>
          <IconLink to="/wishlist" label="Wishlist" badge={wish.length}><Heart size={20} /></IconLink>
          <IconLink to="/cart" label="Cart" badge={count}><ShoppingBag size={20} /></IconLink>
        </div>
      </div>
      {searching && <form onSubmit={submit} role="search" className="border-t border-line px-4 py-3 md:px-8"><input autoFocus className="field" value={q} onChange={e => setQ(e.target.value)} placeholder="Search lehengas, sarees, collections" aria-label="Search products" /></form>}
      {(mega === 'Shop' || mega === 'Collections') && <div className="absolute inset-x-0 top-full hidden border-b border-line bg-ivory md:block"><div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-8 px-8 py-8 text-sm">
        {mega === 'Shop' ? <>
          <div><h3 className="mb-3 text-lg">By category</h3>{categories.slice(0, 8).map(c => <Link key={c.id} className="block py-1 hover:text-gold" to={`/shop/${c.slug}`}>{c.name}</Link>)}</div>
          <div><h3 className="mb-3 text-lg">By occasion</h3>{occasions.map(o => <Link key={o} className="block py-1 hover:text-gold" to={`/shop?occasion=${o}`}>{o}</Link>)}</div>
          <div><h3 className="mb-3 text-lg">New in</h3><Link className="underline" to="/shop?sort=newest">See new arrivals</Link></div></> :
          <div className="col-span-3 grid grid-cols-5 gap-4">{collections.map(c => <Link key={c.id} to={`/collections/${c.slug}`} className="hover:text-gold">{c.name}</Link>)}</div>}
      </div></div>}
    </header>
    {menu && <div className="fixed inset-0 z-50 bg-ivory p-6 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button aria-label="Close menu" onClick={() => setMenu(false)} className="mb-6"><X /></button>
      <form onSubmit={submit} role="search" className="mb-6"><input className="field" value={q} onChange={e => setQ(e.target.value)} placeholder="Search" aria-label="Search products" /></form>
      <nav className="space-y-4 font-serif text-3xl">{nav.map(([n, to]) => <Link key={to} to={to} onClick={() => setMenu(false)} className="block">{n}</Link>)}</nav></div>}
    <CartDrawer />
    <main id="main">{children}</main>
    <footer className="mt-24 bg-ink px-4 py-14 text-ivory md:px-8"><div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-4">
      <div><p className="font-serif text-2xl">{store.brandName}</p><p className="mt-2 text-sm opacity-70">{store.location}</p>{store.email && <p className="mt-1 text-sm opacity-70">{store.email}</p>}</div>
      <div className="space-y-2 text-sm"><p className="font-serif text-lg">Explore</p>{nav.map(([n, to]) => <Link key={to} className="block" to={to}>{n}</Link>)}</div>
      <div className="space-y-2 text-sm"><p className="font-serif text-lg">Customer care</p><Link className="block" to="/contact">Contact</Link><Link className="block" to="/faq">FAQ</Link><Link className="block" to="/shipping">Shipping</Link><Link className="block" to="/returns">Returns</Link><Link className="block" to="/privacy">Privacy</Link><Link className="block" to="/terms">Terms</Link><p className="opacity-70">{store.shippingMessage}</p></div>
      <div className="space-y-2 text-sm"><p className="font-serif text-lg">Follow</p><a className="block" href={store.instagram} target="_blank" rel="noreferrer">Instagram {store.instagramHandle}</a>
        {store.facebook && <a className="block" href={store.facebook}>Facebook</a>}{store.youtube && <a className="block" href={store.youtube}>YouTube</a>}</div>
    </div></footer>
    {wa && <a href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-ink text-ivory shadow-lg"><MessageCircle /></a>}
  </>
}
