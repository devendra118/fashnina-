// Original sample artwork (no photos). Replace with real images any time:
// put files in src/assets/... and use `import img from '../assets/products/x.jpg'`.
const sets = [
  ['#E8DDCB', '#CDB892', '#5C1F2E', '#C9A35F'],
  ['#D9C7A8', '#B89A6A', '#1D1B19', '#E8D2A0'],
  ['#CDB892', '#A8864B', '#8E3B4C', '#F6F0E6'],
  ['#2A2724', '#4A3F38', '#B89A6A', '#F6F0E6'],
  ['#E8DDCB', '#D3B8A0', '#3F5A4B', '#C9A35F'],
]
const shapes = [
  { top: 'M345 330 L455 330 L470 470 L330 470 Z', body: 'M330 470 L470 470 Q640 760 700 930 L100 930 Q160 760 330 470 Z', hem: 930 },
  { top: 'M350 330 L450 330 L465 500 L335 500 Z', body: 'M335 500 L465 500 Q520 760 560 930 L240 930 Q280 760 335 500 Z', hem: 930 },
  { top: 'M345 330 L455 330 L490 700 L310 700 Z', body: 'M320 700 L480 700 L470 930 L410 930 L400 760 L390 930 L330 930 Z', hem: 930 },
]
const svg = (s: string) => 'data:image/svg+xml;utf8,' + encodeURIComponent(s)
// Portrait garment illustration. `label` is kept for call-site readability but never drawn.
export const ph = (_label: string, i = 0) => {
  const [a, b, g, t] = sets[i % sets.length]; const sh = shapes[i % shapes.length]
  return svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
<rect width='800' height='1000' fill='url(#b)'/><path d='M180 1000V420Q180 140 400 140Q620 140 620 420V1000Z' fill='#fff' opacity='.16'/>
<circle cx='400' cy='255' r='42' fill='#C9A98A'/><path d='M356 250Q360 200 400 205Q440 200 444 250Q430 225 400 225Q370 225 356 250Z' fill='#2A2724'/><rect x='388' y='292' width='24' height='40' fill='#C9A98A'/>
<path d='${sh.body}' fill='${g}'/><path d='${sh.top}' fill='${g}'/><path d='${sh.top}' fill='none' stroke='${t}' stroke-width='3'/>
<path d='M120 905H680' stroke='${t}' stroke-width='4' opacity='.8'/><path d='M140 885H660' stroke='${t}' stroke-width='1.5' opacity='.6'/></svg>`)
}
// Wide banner (hero / collection): arch pattern, no figure.
export const phWide = (i = 0) => {
  const [a, b, g, t] = sets[i % sets.length]
  const arches = [0, 1, 2, 3, 4].map(k => `<path d='M${80 + k * 300} 800V420Q${80 + k * 300} 200 ${230 + k * 300} 200Q${380 + k * 300} 200 ${380 + k * 300} 420V800Z' fill='${t}' opacity='${0.1 + (k % 2) * 0.08}'/>`).join('')
  return svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 800' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='b' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${g}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='1600' height='800' fill='url(#b)'/>${arches}</svg>`)
}
