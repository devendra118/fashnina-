import { Link } from 'react-router-dom'
import { store } from '../config/store'
import { products } from '../data/products'
import { categories, occasions } from '../data/categories'
import { collections } from '../data/collections'
import { ph, phWide } from '../lib/img'
import ProductCard from '../components/ProductCard'
import { useSeo } from '../lib/seo'
const Grid = ({ items }: { items: typeof products }) => <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{items.map(p => <ProductCard key={p.id} p={p} />)}</div>
export default function Home() {
  useSeo('', store.tagline)
  const feat = collections.find(c => c.featured)!
  return <div>
    <section className="relative grid min-h-[78vh] items-end overflow-hidden">
      <img src={phWide(0)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-14 text-ivory md:px-8">
        <h1 className="max-w-2xl text-5xl md:text-7xl">Where Heritage Meets Modern Elegance</h1>
        <p className="mt-4 max-w-md">{store.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/shop" className="btn bg-ivory text-ink border-ivory">Shop collection</Link><Link to="/designer" className="btn border-ivory">Discover the designer</Link></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-4 pt-20 md:px-8"><h2 className="mb-8 text-4xl">New arrivals</h2><Grid items={products.filter(p => p.newArrival).slice(0, 4)} /></section>
    <section className="mx-auto max-w-[1440px] px-4 pt-20 md:px-8"><h2 className="mb-8 text-4xl">Shop by category</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{categories.slice(0, 6).map(c => <Link key={c.id} to={`/shop/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden"><img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute bottom-4 left-4 font-serif text-2xl text-ivory">{c.name}</span></Link>)}</div></section>
    <section className="mx-auto mt-20 grid max-w-[1440px] items-center gap-10 px-4 md:grid-cols-2 md:px-8">
      <img src={ph('The designer', 4)} alt="Designer at work" loading="lazy" className="aspect-[4/5] w-full object-cover" />
      <div className="max-w-lg"><h2 className="text-4xl md:text-5xl">Designed with intention</h2><p className="mt-5 leading-7">Every NK. fashnina piece begins as a sketch and is finished by hand. Replace this paragraph with the designer's own words about her philosophy.</p><Link to="/designer" className="btn btn-line mt-6">Meet the designer</Link></div>
    </section>
    <section className="mx-auto mt-20 max-w-[1440px] px-4 md:px-8"><h2 className="mb-8 text-4xl">Behind the craft</h2>
      <ol className="grid gap-4 md:grid-cols-5">{['Sketch to silhouette', 'Fabric selection', 'Embroidery', 'Handcrafted details', 'Final look'].map((s, i) => <li key={s}><img src={ph(s, i)} alt="" loading="lazy" className="aspect-square w-full object-cover" /><p className="mt-2 font-serif text-xl">{s}</p></li>)}</ol></section>
    <section className="relative mt-20 grid min-h-[60vh] items-center"><img src={feat.heroImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-ink/40" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 text-ivory md:px-8"><h2 className="text-5xl">{feat.name}</h2><p className="mt-3">{feat.description}</p><Link to={`/collections/${feat.slug}`} className="btn mt-6 border-ivory bg-ivory text-ink">Explore collection</Link></div></section>
    <section className="mx-auto mt-20 max-w-[1440px] px-4 md:px-8"><h2 className="mb-6 text-4xl">Shop by occasion</h2><div className="flex flex-wrap gap-3">{occasions.map(o => <Link key={o} to={`/shop?occasion=${o}`} className="btn btn-line">{o}</Link>)}</div></section>
    <section className="mx-auto mt-20 max-w-[1440px] px-4 md:px-8"><h2 className="mb-8 text-4xl">Best sellers</h2><Grid items={products.filter(p => p.bestSeller)} /></section>
    <section className="mx-auto mt-20 max-w-3xl px-4 text-center"><h2 className="text-4xl">Designed in Jaipur</h2><p className="mt-4 leading-7">Add the brand's own story of Jaipur here.</p></section>
    <section className="mx-auto mt-20 max-w-[1440px] px-4 md:px-8"><h2 className="mb-6 text-4xl">Follow {store.brandName}</h2>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">{[0, 1, 2, 3, 4, 5].map(i => <img key={i} src={ph('Instagram ' + (i + 1), i)} alt="" loading="lazy" className="aspect-square w-full object-cover" />)}</div>
      <a href={store.instagram} target="_blank" rel="noreferrer" className="btn btn-line mt-6">Follow {store.instagramHandle}</a></section>
    <section className="mx-auto mt-20 max-w-xl px-4 text-center"><h2 className="text-4xl">Join the NK. fashnina world</h2>
      <p className="mt-2 text-sm opacity-70">Email sign-up is not connected yet. Connect an email service before launch.</p>
      <form className="mt-5 flex gap-2" onSubmit={e => e.preventDefault()}><input type="email" required aria-label="Email address" className="field" placeholder="Email address" /><button className="btn btn-solid">Subscribe</button></form></section>
  </div>
}
