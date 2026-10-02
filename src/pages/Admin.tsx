import { useState } from 'react'
import { inr } from '../config/store'
export default function Admin() {
  const [t, setT] = useState(''); const [orders, setO] = useState<any[] | null>(null); const [err, setErr] = useState('')
  const load = async () => { setErr(''); const r = await fetch('/.netlify/functions/list-orders', { headers: { 'x-admin-token': t } }); if (!r.ok) return setErr('Wrong password'); setO(await r.json()) }
  if (!orders) return <div className="mx-auto max-w-sm px-4 py-20"><meta name="robots" content="noindex" /><h1 className="text-3xl">Orders</h1><input type="password" className="field mt-4" value={t} onChange={e => setT(e.target.value)} placeholder="Admin password" aria-label="Admin password" />{err && <p className="mt-2 text-wine">{err}</p>}<button className="btn btn-solid mt-4 w-full" onClick={load}>View orders</button></div>
  return <div className="mx-auto max-w-[1200px] overflow-x-auto px-4 py-10"><h1 className="mb-4 text-3xl">Orders ({orders.length})</h1>
    <table className="w-full text-left text-sm"><thead><tr>{['Ref', 'Date', 'Customer', 'Items', 'Total', 'Pay', 'Status'].map(h => <th key={h} className="border-b border-line py-2 pr-4 font-normal">{h}</th>)}</tr></thead><tbody>
      {orders.map(o => <tr key={o.orderId} className="align-top"><td className="py-3 pr-4">{o.orderId}</td><td className="pr-4">{new Date(o.createdAt).toLocaleString('en-IN')}</td>
        <td className="pr-4">{o.customer.name}<br />{o.customer.phone}<br />{o.customer.address}, {o.customer.city} {o.customer.pin}</td><td className="pr-4">{o.items.map((i: any) => `${i.name} (${i.size}) ×${i.qty}`).join('; ')}</td><td className="pr-4">{inr(o.total)}</td><td className="pr-4">{o.method}</td><td>{o.status}</td></tr>)}</tbody></table></div>
}
