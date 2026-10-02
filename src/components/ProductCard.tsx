import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Product } from '../data/products'
import { inr } from '../config/store'
import { useShop } from '../context/Shop'
import { useStock } from '../lib/stock'
export default function ProductCard({ p }: { p: Product }) {
  const { wish, toggleWish } = useShop(); const on = wish.includes(p.id); const remaining = useStock()
  return (
    <article className="group relative">
      <Link to={`/product/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <img src={p.images[0]} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
          <img src={p.images[1] ?? p.images[0]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
          {remaining(p) === 0 && <span className="absolute left-3 top-3 bg-ivory px-2 py-1 text-xs">Sold out</span>}
        </div>
        <h3 className="mt-3 font-sans text-sm font-normal">{p.name}</h3>
        <p className="text-sm">{p.salePrice ? <><span className="mr-2">{inr(p.salePrice)}</span><s className="opacity-50">{inr(p.price)}</s></> : inr(p.price)}</p>
      </Link>
      <button onClick={() => toggleWish(p.id)} aria-pressed={on} aria-label={on ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-ivory/90">
        <Heart size={18} fill={on ? 'currentColor' : 'none'} />
      </button>
    </article>)
}
