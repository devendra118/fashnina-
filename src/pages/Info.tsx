import { Link, useParams } from 'react-router-dom'
import { collections } from '../data/collections'
import { products } from '../data/products'
import { store, waLink } from '../config/store'
import { useSeo } from '../lib/seo'
import Shop from './Shop'
const pages: Record<string, [string, string]> = {
  about: ['About NK. fashnina', 'A contemporary Indian designer label from Jaipur. Replace this with the brand story.'],
  designer: ['The designer', 'Add the designer\'s biography, awards and recognition here.'],
  craft: ['Craftsmanship', 'From sketch to silhouette, fabric selection, embroidery and finishing. Add real process photos in src/assets/craft.'],
  wedding: ['Wedding collection', 'Bridal and wedding-guest pieces. Browse the wedding edit in the shop.'],
  faq: ['FAQ', 'Add questions on sizing, custom orders, delivery times and returns.'],
}
export function Info({ k }: { k: string }) { const [t, b] = pages[k]; useSeo(t, b)
  return <div className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-5xl">{t}</h1><p className="mt-6 leading-7">{b}</p>{k === 'wedding' && <Link to="/shop?occasion=Wedding" className="btn btn-solid mt-6">Shop wedding</Link>}</div> }
export function Contact() { useSeo('Contact'); const wa = waLink('Hello NK. fashnina')
  return <div className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-5xl">Contact</h1><p className="mt-4">{store.location}</p>{store.email && <p><a className="underline" href={`mailto:${store.email}`}>{store.email}</a></p>}{store.phone && <p><a className="underline" href={`tel:${store.phone.replace(/\s/g,'')}`}>{store.phone}</a></p>}
    {wa ? <a className="btn btn-solid mt-6" href={wa}>Chat on WhatsApp</a> : <p className="mt-4 text-sm opacity-70">Add the WhatsApp number in src/config/store.ts.</p>}<a className="btn btn-line mt-3" href={store.instagram} target="_blank" rel="noreferrer">Message on Instagram</a></div> }
export function Collections() { useSeo('Collections'); return <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8"><h1 className="mb-8 text-5xl">Collections</h1><div className="grid gap-6 md:grid-cols-3">{collections.map(c => <Link key={c.id} to={`/collections/${c.slug}`}><img src={c.heroImage} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" /><h2 className="mt-3 text-2xl">{c.name}</h2><p className="text-sm">{c.description} ({products.filter(p => c.products.includes(p.id)).length} pieces)</p></Link>)}</div></div> }
export function Collection() { const { slug } = useParams(); const c = collections.find(x => x.slug === slug)
  if (!c) return <div className="py-32 text-center"><h1 className="text-4xl">Collection not found</h1><Link to="/collections" className="btn btn-line mt-6">All collections</Link></div>
  return <Shop collection={c.name.replace(/^The /, '')} /> }
export function NotFound() { useSeo('Page not found'); return <div className="py-32 text-center"><h1 className="text-5xl">Page not found</h1><Link to="/" className="btn btn-solid mt-6">Back home</Link></div> }
