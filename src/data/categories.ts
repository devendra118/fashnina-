import { ph } from '../lib/img'
const names = ['Sarees','Lehengas','Anarkalis','Suit Sets','Sharara Sets','Kurta Sets','Dresses','Dupattas','Festive Wear','Wedding Wear']
export const categories = names.map((name, i) => ({ id: 'c' + i, slug: name.toLowerCase().replace(/ /g, '-'), name, image: ph('', i) }))
export const occasions = ['Wedding','Reception','Engagement','Mehendi','Haldi','Festive','Party']
