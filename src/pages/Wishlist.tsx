import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useShop } from '../context/Shop'
import { useSeo } from '../lib/seo'
export default function Wishlist() {
  useSeo('Wishlist'); const { wish, add, toggleWish } = useShop(); const items = products.filter(p => wish.includes(p.id))
  if (!items.length) return <div className="py-32 text-center"><h1 className="text-4xl">Your wishlist is empty</h1><p className="mt-2">Tap the heart on any piece to save it here.</p><Link to="/shop" className="btn btn-solid mt-6">Browse the shop</Link></div>
  return <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8"><h1 className="mb-8 text-4xl">Wishlist</h1><div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map(p => <div key={p.id}><ProductCard p={p} />
    <button className="btn btn-line mt-3 w-full" disabled={!p.stock} onClick={() => { add(p.id, p.sizes[2]); toggleWish(p.id) }}>Move to cart (size {p.sizes[2]})</button></div>)}</div></div>
}
