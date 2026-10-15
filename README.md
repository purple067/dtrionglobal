# DtrionGlobal website

A fast, multi-page static website (51 pages). Every topic has its own page and URL. No build step is needed to host it.

## Pages
Home, Services (+16 service pages), Industries (+10 industry pages, each with a sample dashboard), Samples (+4 sample deliverables), Pricing guide, Insights (+6 articles), Free data checklist, Analytics demo, How we work, About, FAQ, Contact, Privacy policy, Terms, 404.

## 1. Set your details: `assets/config.js`
| Setting | What it does |
|---|---|
| `email` | Shown on the contact page and used for the email fallback. |
| `phone` | Shown in the header (wide screens), footer, call button and contact page. |
| `whatsapp` | Digits only with country code (for Nepal: 977 then the number). Powers the WhatsApp buttons. |
| `bookingUrl` | Your Calendly or Google Calendar booking link (https://). Shows a "Book a time" card on the contact page. |
| `formEndpoint` | https:// URL from a form service. Makes the contact form and the checklist signup deliver to you. |

### Make inquiries reach you (Formspree example)
1. Create a free account at formspree.io and make a new form. Copy its URL (it starts with https://formspree.io/f/).
2. Paste it into `formEndpoint` in `assets/config.js`.
3. Push the change. Submit a test inquiry on the live site and check your inbox.
Without `formEndpoint`, the contact form only lets visitors copy their inquiry or open an email draft, and the checklist page gives the PDF directly with no email step.
If you use a different form service, add its domain to `connect-src` in `_headers` and `vercel.json`.

## 2. Light/dark and English/Nepali
- The sun/moon button switches theme; the choice is remembered on the visitor's device.
- The language button switches the navigation, home page, contact form and shared sections to Nepali. Detailed service, industry, sample, pricing and article text is English only. To translate more text, add the exact English sentence and its Nepali version to `assets/i18n.js`.

## 3. Deploy
- Netlify or Cloudflare Pages: drag the folder in. `_headers` applies the security headers.
- Vercel: import the folder. `vercel.json` applies the headers and clean URLs.
Then point DtrionGlobal.com at the host.

## 4. Before launch
- Have the privacy policy and terms reviewed by a qualified professional and add your legal name and governing law.
- Check every promise on the site (free discovery call, pilot on a sample, the three ways to start on the Pricing page) is one you will honor.
- All samples and dashboards use synthetic data and are labelled as such. Keep them labelled.

## Security built in
Strict Content-Security-Policy, clickjacking and MIME-sniffing protection, HSTS and locked-down permissions via host headers. The forms use a honeypot, minimum fill time, one submission per minute, length limits, double-submit lock and request timeouts. No cookies or third-party trackers; only Google Fonts loads externally.
