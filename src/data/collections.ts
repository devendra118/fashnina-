import { phWide } from '../lib/img'
import { products } from './products'
const defs = [['The Noor Edit','Light-catching surfaces and soft silhouettes.'],['The Meher Collection','Quiet, graceful drapes.'],['The Riwaayat Edit','Everyday tradition, reworked.'],['The Gul Collection','Floral detail and gentle colour.'],['The Heritage Edit','Our statement bridal and festive pieces.']]
export const collections = defs.map(([name,description],i)=>{
  const key = name.replace(/^The /,'')
  return { id:'col'+i, slug:key.toLowerCase().replace(/ /g,'-'), name, description, heroImage:phWide(i),
    products: products.filter(p=>p.collection===key).map(p=>p.id), featured:i===4 }})
