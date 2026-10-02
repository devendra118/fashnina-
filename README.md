# NK. fashnina storefront
React + Vite + TypeScript + Tailwind. Mock data, no backend yet.

## Run
`npm install` · `npm run dev` · `npm run build`

## Edit
- Brand, WhatsApp number, social links: `src/config/store.ts`
- Products: `src/data/products.ts` (replace `ph(...)` placeholders with real image imports from `src/assets/products/`)
- Collections / categories: `src/data/collections.ts`, `src/data/categories.ts`
- Colours: CSS variables at the top of `src/index.css`
- Page copy: `src/pages/Home.tsx`, `src/pages/Info.tsx`

## Payments
`src/services/payment.ts` is a stub. Razorpay needs a server-side order and signature check (Netlify Function or Supabase Edge Function). Keys go in `.env` (see `.env.example`); never commit them.

## Deploy
Push to GitHub, then on Netlify choose "Import from Git". `netlify.toml` already sets build `npm run build`, publish `dist` and SPA redirects.

## Supabase later
Replace function bodies in `src/services/productService.ts` (products, orders, customers) and `payment.ts`; UI is unchanged.

## Known gaps
Mega menu is hover/focus only, filters limited to occasion/price/stock, no admin, coupon `WELCOME10` is demo only, newsletter not connected.

## Backend (Netlify Functions)
`netlify/functions/`: `create-order` (re-prices cart server-side, creates Razorpay order, stores order in Netlify Blobs), `verify-payment` (HMAC signature check), `list-orders` (admin, needs `ADMIN_TOKEN`). Orders are viewed at `/admin`.
Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `ADMIN_TOKEN` in Netlify environment variables. Use Razorpay *test* keys first. Local testing: `npx netlify dev`.

### Emails, stock, webhook
- Stock: `remaining = stock in products.ts − units sold` (sold counts kept in Netlify Blobs). Raise `stock` in products.ts when new pieces are made.
- Emails via Resend (resend.com): set `RESEND_API_KEY`. `onboarding@resend.dev` only delivers to the Resend account owner; verify a domain to email customers.
- Webhook: add `razorpay-webhook` in Razorpay Dashboard (event `order.paid`) and set `RAZORPAY_WEBHOOK_SECRET`. It confirms payments even if the customer closes the browser.
