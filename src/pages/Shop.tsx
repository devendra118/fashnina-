import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories, occasions } from '../data/categories'
import ProductCard from '../components/ProductCard'
import { useSeo } from '../lib/seo'
export default function Shop({ collection }: { collection?: string }) {
  const { category } = useParams(); const [sp, setSp] = useSearchParams(); const [open, setOpen] = useState(false)
  const cat = categories.find(c => c.slug === category)
  const q = sp.get('q')?.toLowerCase() ?? ''; const occ = sp.get('occasion') ?? ''; const sort = sp.get('sort') ?? 'featured'
  const size = sp.get('size') ?? '', color = sp.get('color') ?? '', fabric = sp.get('fabric') ?? '', col = sp.get('col') ?? ''; const maxPrice = Number(sp.get('max') ?? 0); const inStock = sp.get('stock') === '1'
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n) }
  const list = useMemo(() => {
    let l = products.filter(p => (!cat || p.category === cat.name) && (!collection || p.collection === collection) && (!occ || p.occasion === occ) && (!size || p.sizes.includes(size)) && (!color || p.colors.includes(color)) && (!fabric || p.fabric === fabric) && (!col || p.collection === col) && (!maxPrice || (p.salePrice ?? p.price) <= maxPrice) && (!inStock || p.stock > 0) && (!q || (p.name + p.category + p.fabric + p.collection).toLowerCase().includes(q)))
    const pr = (p: typeof l[0]) => p.salePrice ?? p.price
    if (sort === 'low') l = [...l].sort((a, b) => pr(a) - pr(b)); if (sort === 'high') l = [...l].sort((a, b) => pr(b) - pr(a))
    if (sort === 'newest') l = [...l].sort((a, b) => +b.newArrival - +a.newArrival); if (sort === 'best') l = [...l].sort((a, b) => +b.bestSeller - +a.bestSeller)
    return l
  }, [cat, collection, occ, size, color, fabric, col, maxPrice, inStock, q, sort])
  const title = q ? `Results for "${q}"` : cat?.name ?? collection ?? 'Shop'
  useSeo(title, `Browse ${title} by NK. fashnina.`)
  const uniq = (f: (p: typeof products[0]) => string[]) => [...new Set(products.flatMap(f))]
  const Sel = (l: string, k: string, v: string, o: string[]) => <label className="block">{l}<select className="field mt-1" value={v} onChange={e => set(k, e.target.value)}><option value="">All</option>{o.map(x => <option key={x}>{x}</option>)}</select></label>
  const Filters = <div className="space-y-6 text-sm">
    <label className="block">Occasion<select className="field mt-1" value={occ} onChange={e => set('occasion', e.target.value)}><option value="">All</option>{occasions.map(o => <option key={o}>{o}</option>)}</select></label>
    <label className="block">Max price<select className="field mt-1" value={maxPrice || ''} onChange={e => set('max', e.target.value)}><option value="">Any</option><option value="10000">Up to ₹10,000</option><option value="20000">Up to ₹20,000</option><option value="50000">Up to ₹50,000</option></select></label>
    {Sel('Size', 'size', size, uniq(x => x.sizes))}{Sel('Colour', 'color', color, uniq(x => x.colors))}{Sel('Fabric', 'fabric', fabric, uniq(x => [x.fabric]))}{!collection && Sel('Collection', 'col', col, uniq(x => [x.collection]))}<label className="flex items-center gap-2"><input type="checkbox" checked={inStock} onChange={e => set('stock', e.target.checked ? '1' : '')} />In stock only</label></div>
  return <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
    <h1 className="text-4xl md:text-5xl">{title}</h1>
    <div className="mt-6 flex items-center justify-between"><button className="btn btn-line md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>Filters</button><p className="hidden text-sm md:block">{list.length} pieces</p>
      <label className="text-sm">Sort <select className="field ml-2 w-auto" value={sort} onChange={e => set('sort', e.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="best">Best selling</option></select></label></div>
    {open && <div className="mt-4 border border-line p-4 md:hidden">{Filters}</div>}
    <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]"><aside className="hidden md:block">{Filters}</aside>
      {list.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>
        : <p>No pieces match. Try clearing a filter or searching a different word.</p>}</div></div>
}
