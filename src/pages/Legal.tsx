import { store, inr } from '../config/store'
import { useSeo } from '../lib/seo'
const contact = `${store.email}${store.phone ? ' or ' + store.phone : ''}`
const pages: Record<string, [string, [string, string][]]> = {
  shipping: ['Shipping policy', [
    ['Where we ship', 'We currently ship within India. For orders outside India, please contact us before ordering.'],
    ['Dispatch and delivery', `Orders are dispatched within ${store.dispatchTime} of confirmation. Delivery usually takes ${store.deliveryTime}. Made-to-order and customised pieces may take longer; we will tell you the timeline before you pay.`],
    ['Shipping charges', `Shipping is free on orders of ${inr(store.freeShippingAbove)} or more. Below that, a flat charge of ${inr(store.shippingFee)} applies.`],
    ['Tracking', 'Once your order is dispatched we will share tracking details by email or WhatsApp.'],
    ['Delays or problems', `If your parcel is delayed or arrives damaged, contact us at ${contact} within 48 hours of delivery with photos.`]]],
  returns: ['Returns, exchanges and refunds', [
    ['Returns', `You can request a return within ${store.returnDays} days of delivery. Items must be unworn, unwashed, with tags and original packaging intact.`],
    ['What cannot be returned', 'Customised, made-to-measure and altered pieces, and items marked final sale, cannot be returned unless they arrive damaged or incorrect.'],
    ['How to request', `Email or call ${contact} with your order reference and photos. We will confirm the next steps.`],
    ['Refunds', 'Approved refunds are sent to the original payment method within 5–7 business days of us receiving and checking the item. For cash on delivery orders, we will ask for bank details to transfer the refund.'],
    ['Exchanges', 'Size exchanges are subject to availability. Contact us and we will help.'],
    ['Cancellations', 'You can cancel before your order is dispatched by contacting us. Once dispatched or in production for you, it cannot be cancelled.']]],
  privacy: ['Privacy policy', [
    ['What we collect', 'When you order or contact us we collect your name, email, phone number, delivery address and order details.'],
    ['How we use it', 'We use this information to process and deliver orders, send order updates and answer your questions. We do not sell your personal information.'],
    ['Payments', 'Online payments are processed by Razorpay. We never see or store your card, UPI or bank details.'],
    ['Services we use', 'Our website is hosted on Netlify, and order emails are sent through Resend. These providers process data only to provide their service to us.'],
    ['Cookies and local storage', 'Your cart and wishlist are saved in your own browser so they are there when you return. We do not use advertising trackers.'],
    ['Your choices', `To see, correct or delete your information, email ${store.email}. We keep order records as long as needed for accounts and legal requirements.`]]],
  terms: ['Terms of service', [
    ['About these terms', `This website is operated by ${store.brandName}, ${store.location}. By ordering you agree to these terms and our Shipping, Returns and Privacy policies.`],
    ['Products', 'We try to show colours and details accurately, but photos and screens vary, and handcrafted pieces can differ slightly. Sizes are described on each product page.'],
    ['Prices and orders', 'All prices are in Indian rupees. An order is accepted when we confirm it. We may cancel and fully refund an order if an item is unavailable or a pricing error occurred.'],
    ['Payment', 'Payments are made securely through Razorpay or by cash on delivery where offered.'],
    ['Intellectual property', 'All designs, images and text on this site belong to NK. fashnina and may not be copied or used without permission.'],
    ['Liability', 'To the extent permitted by law, our liability is limited to the amount you paid for the product concerned.'],
    ['Governing law', 'These terms are governed by the laws of India. Disputes fall under the courts of Jaipur, Rajasthan.']]],
}
export default function Legal({ k }: { k: string }) {
  const [title, secs] = pages[k]; useSeo(title, `${title} for ${store.brandName}.`)
  return <div className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-4xl md:text-5xl">{title}</h1><p className="mt-2 text-sm opacity-60">Last updated {store.policyUpdated}</p>
    {secs.map(([h, t]) => <section key={h} className="mt-8"><h2 className="text-2xl">{h}</h2><p className="mt-2 leading-7">{t}</p></section>)}
    <p className="mt-10 text-sm">Questions? {contact}</p></div>
}
