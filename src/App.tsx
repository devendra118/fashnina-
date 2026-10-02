import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Legal from './pages/Legal'
import Admin from './pages/Admin'
import { NotFound, Info, Contact, Collections, Collection } from './pages/Info'
export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/shop/:category" element={<Shop />} />
    <Route path="/search" element={<Shop />} /><Route path="/collections" element={<Collections />} /><Route path="/collections/:slug" element={<Collection />} />
    <Route path="/product/:slug" element={<Product />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} />
    {['about', 'designer', 'craft', 'wedding', 'faq'].map(k => <Route key={k} path={'/' + k} element={<Info k={k} />} />)}
    {['privacy', 'terms', 'shipping', 'returns'].map(k => <Route key={k} path={'/' + k} element={<Legal k={k} />} />)}<Route path="/admin" element={<Admin />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} />
  </Routes></Layout>
}
