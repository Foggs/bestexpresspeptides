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


### 4. AI Thumbnail Generation for Products (Revised)

**Priority:** Medium

**Status:** Planned

Generate high-fidelity product thumbnails using a "Master Blank" Image-to-Image (Img2Img) workflow. This ensures 100% consistency in vial shape, lighting, and background across the entire catalog, changing only the text on the label.

**How it would work:**

* **The Anchor:** A high-resolution "Master Blank" image of a peptide vial with a clean white label is stored in Google Cloud Storage.
* **The API:** A Next.js API endpoint (`/api/admin/generate-product-image`) triggers the Cloud Run worker.
* **The Logic:** The worker calls **Vertex AI Imagen 3** using the "Edit" (Img2Img) capability. It provides the Master Blank as a reference and prompts the AI to overlay the specific peptide name onto the label area.
* **Storage:** The resulting image is saved to `public/product-images/{slug}.png` in the Replit environment.
* **Sync:** The relative URL is written back to the Google Sheet for the admin to review.

**Prompt Strategy (Img2Img):**

* **Reference Image:** `master-blank-vial.png`
* **Positive Prompt:** "Using the provided reference image of a research vial, add the text '[PEPTIDE NAME]' in a clean, black, sans-serif font onto the center of the white label. Maintain the exact studio lighting, white background, and matte silver cap from the original image. Ensure the text follows the natural curve of the vial label."
* **Negative Prompt:** "syringes, needles, hands, blue lighting, shadows on background, blurry text, medical symbols, people, distorted vial shape."

**Technical Implementation Details:**

* **Tech Stack:** Vertex AI Imagen 3 (Image-to-Image capability).
* **Consistency:** Set `imagePromptWeight` (or equivalent influence parameter) to **0.8 or higher** to prevent the AI from changing the vial’s geometry.
* **Memory Management:** Stream the base image from GCS to the AI and the result back to Replit without storing large buffers in memory.
* **Fallback:** In the event of an AI text rendering failure or safety filter flag, generate a standard SVG placeholder using the product name.

---

### 5. Affiliate Management System

**Priority:** Medium/High

**Status:** Planned

Implement a lightweight, performance-focused affiliate tracking system using Next.js Middleware and Google Sheets for administrative management.

**How it would work:**

* **Tracking:** A Next.js Middleware detects a `?ref=ID` query parameter in the URL and sets a 30-day, secure, HTTP-only cookie (`aff_ref`).
* **Attribution:** During checkout, the system reads the cookie and attaches the Affiliate ID to the order record in PostgreSQL and the Google Sheet.
* **Management:** A new `Affiliates` tab in the Google Sheet serves as the "Source of Truth" for partner names, status (Active/Inactive), and commission rates.
* **Admin UI:** An "Affiliates" view in the Admin Dashboard displays referral sales and allows for the generation of new affiliate IDs.

**Technical Implementation Details:**

* **Security:** Use `SameSite=Lax` for cookies to ensure tracking functionality across navigation while maintaining security standards.
* **Efficiency:** Do not query the database for affiliate information on every page load; verify the `aff_ref` ID exclusively during the final checkout process.
* **Logic:** Utilize "Last Click" attribution—the most recent affiliate link clicked by the user receives the credit for the sale.
*Add new features below this line.*
