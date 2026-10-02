import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { products } from '../data/products'
import { store } from '../config/store'
type Line = { id:string; size:string; qty:number }
const load = <T,>(k:string,d:T):T => { try { return JSON.parse(localStorage.getItem(k)||'') as T } catch { return d } }
const Ctx = createContext<any>(null)
export const useShop = () => useContext(Ctx)
export function ShopProvider({children}:{children:ReactNode}) {
  const [cart,setCart] = useState<Line[]>(()=>load('nk-cart',[]))
  const [wish,setWish] = useState<string[]>(()=>load('nk-wish',[]))
  const [drawer,setDrawer] = useState(false)
  const [coupon,setCoupon] = useState('')
  useEffect(()=>{localStorage.setItem('nk-cart',JSON.stringify(cart))},[cart])
  useEffect(()=>{localStorage.setItem('nk-wish',JSON.stringify(wish))},[wish])
  const add = (id:string,size:string,qty=1)=>{ setCart(c=>{const l=c.find(x=>x.id===id&&x.size===size); return l?c.map(x=>x===l?{...x,qty:x.qty+qty}:x):[...c,{id,size,qty}]}); setDrawer(true) }
  const setQty = (id:string,size:string,qty:number)=>setCart(c=>qty<1?c.filter(x=>!(x.id===id&&x.size===size)):c.map(x=>x.id===id&&x.size===size?{...x,qty}:x))
  const setSize = (id:string,from:string,to:string)=>setCart(c=>c.map(x=>x.id===id&&x.size===from?{...x,size:to}:x))
  const toggleWish = (id:string)=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id])
  const lines = cart.map(l=>({...l,p:products.find(p=>p.id===l.id)!})).filter(l=>l.p)
  const subtotal = lines.reduce((s,l)=>s+(l.p.salePrice??l.p.price)*l.qty,0)
  const discount = coupon.toUpperCase()==='WELCOME10' ? Math.round(subtotal*0.1) : 0
  const shipping = subtotal===0||subtotal>=store.freeShippingAbove?0:store.shippingFee
  const total = subtotal-discount+shipping
  const count = cart.reduce((s,l)=>s+l.qty,0)
  return <Ctx.Provider value={{lines,wish,add,setQty,setSize,toggleWish,drawer,setDrawer,coupon,setCoupon,subtotal,discount,shipping,total,count,clear:()=>setCart([])}}>{children}</Ctx.Provider>
}
