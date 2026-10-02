// Single place to edit brand details.
export const store = {
  brandName: 'NK. fashnina',
  tagline: 'Contemporary silhouettes crafted with an Indian soul.',
  announcement: 'Discover the New Collection',
  location: 'Jaipur, Rajasthan, India',
  instagram: 'https://www.instagram.com/neha.kumaw288/',
  instagramHandle: '@neha.kumaw288',
  whatsapp: '918302296663', // digits with country code
  email: 'designerneha088@gmail.com', phone: '+91 83022 96663', youtube: '', facebook: '', pinterest: '',
  currency: 'INR',
  shippingMessage: 'Free shipping above ₹10,000.',
  freeShippingAbove: 10000, shippingFee: 500,
  // Policy values used on the Shipping / Returns pages. CONFIRM with the designer.
  returnDays: 7, dispatchTime: '5–7 business days', deliveryTime: '3–7 business days after dispatch', policyUpdated: 'October 2026',
}
export const waLink = (text: string) =>
  store.whatsapp ? `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}` : ''
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
