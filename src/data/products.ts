import { ph } from '../lib/img'
export type Product = { id:string;slug:string;name:string;description:string;price:number;salePrice:number|null;category:string;collection:string;occasion:string;fabric:string;colors:string[];sizes:string[];images:string[];stock:number;featured:boolean;newArrival:boolean;bestSeller:boolean }
// name, category, collection, occasion, fabric, price, sale, stock, flags (f=featured n=new b=bestseller)
const raw: [string,string,string,string,string,number,number|null,number,string][] = [
 ['Heritage Embroidered Lehenga','Lehengas','Heritage Edit','Wedding','Silk',45000,null,3,'fnb'],
 ['Noor Gota Anarkali','Anarkalis','Noor Edit','Festive','Georgette',18500,15900,5,'fn'],
 ['Meher Organza Saree','Sarees','Meher Collection','Reception','Organza',22000,null,4,'nb'],
 ['Gul Sharara Set','Sharara Sets','Gul Collection','Mehendi','Chanderi',16500,null,6,'fb'],
 ['Riwaayat Kurta Set','Kurta Sets','Riwaayat Edit','Haldi','Cotton Silk',9800,null,8,'n'],
 ['Noor Draped Dress','Dresses','Noor Edit','Party','Crepe',12400,10900,0,'b'],
 ['Heritage Suit Set','Suit Sets','Heritage Edit','Engagement','Raw Silk',14200,null,5,'fn'],
 ['Gul Embroidered Dupatta','Dupattas','Gul Collection','Festive','Tulle',5600,null,12,'b'],
]
export const products: Product[] = raw.map(([name,category,collection,occasion,fabric,price,salePrice,stock,f],i)=>({
  id:'nk-'+String(i+1).padStart(3,'0'), slug:name.toLowerCase().replace(/ /g,'-'), name,
  description:`${name} from the ${collection}. Placeholder copy: replace with your own description.`,
  price,salePrice,category,collection,occasion,fabric,colors:['Ivory','Gold'],sizes:['XS','S','M','L','XL'],
  images:[ph(name,i),ph(name+' detail',i+1)],stock,featured:f.includes('f'),newArrival:f.includes('n'),bestSeller:f.includes('b')}))
