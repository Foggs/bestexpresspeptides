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

*Add new features below this line.*
