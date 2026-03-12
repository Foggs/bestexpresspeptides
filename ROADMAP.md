# BestExpressPeptides — Features Roadmap

## Planned Features

### 1. Google Sheet "Push Updates to Site" Button
**Priority:** High
**Status:** Planned

Add a button directly in the Google Sheet that pushes product changes to the live site instantly.

**How it would work:**
- A new API endpoint on the site accepts a secret token and refreshes the product cache
- A Google Apps Script is added to the sheet with a custom menu item ("Push Updates to Site")
- When clicked, the script calls the refresh endpoint and shows a confirmation toast in the sheet
- No need to log into the admin dashboard — edits and publishing happen entirely in Google Sheets

**Implementation notes:**
- Requires a `SHEET_REFRESH_SECRET` env var for authentication between the sheet and the site
- The Apps Script would live in the sheet itself (Extensions > Apps Script)
- Separate from the existing admin refresh endpoint to avoid JWT complexity

---

### 2. Re-enable Stripe Payments
**Priority:** Medium
**Status:** Planned

Bring back Stripe Checkout for online payment processing. The original Stripe code has been removed from the checkout flow but can be rebuilt when ready.

**What's needed:**
- Set up Stripe API keys
- Rebuild the checkout API to create Stripe sessions
- Re-enable the webhook endpoint for order fulfillment
- Update checkout UI to support payment

---

### 3. Verify Custom Domain on Resend
**Priority:** Medium
**Status:** Planned

Currently order notification emails are sent via Resend's testing mode, which limits the recipient to the account owner's email. Verifying a custom domain will allow sending to any email address and using a branded "from" address.

**What's needed:**
- Verify a domain at resend.com/domains
- Update the `from` address in `src/lib/orderEmail.ts` to use the verified domain
- Update `ADMIN_EMAIL` to the preferred recipient address

---

### 4. AI Thumbnail Generation for Products
**Priority:** Medium
**Status:** Planned

Generate product thumbnail images using AI with a locked visual style (photorealistic vial, white background, studio lighting). The prompt template is fixed to maintain consistency across all products — only the peptide name changes per product.

**How it would work:**
- A new API endpoint (`/api/admin/generate-product-image`) accepts a product slug
- It looks up the product name from the Google Sheet, constructs the locked vial prompt, and calls an AI image generation service
- The generated PNG is saved to `public/product-images/{slug}.png`
- The relative URL `/product-images/{slug}.png` is written back to the product's `images` column in the Google Sheet
- The admin UI can trigger generation per product and preview the result immediately

**Prompt template:**
Photorealistic research peptide vial, clean studio lighting, centered composition, white background, glass vial with subtle reflections, minimal white label with peptide name, matte silver cap, professional laboratory product photography, square 1:1 format, no syringes, no medical symbols, no people.

**Implementation notes:**
- No external image hosting or Cloud Storage required — images are served from the Next.js public folder
- Could use Replit's built-in image generation or an external service (Gemini, DALL-E, etc.)
- A placeholder SVG fallback should be generated if AI generation fails

---

*Add new features below this line.*
