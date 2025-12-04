# End-to-End Testing Guide

This directory contains Playwright end-to-end tests for the BestExpressPeptides purchasing workflow.

## Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)
- System Chromium browser (automatically installed in Replit environment)

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests with Visual Report
```bash
npm run test:e2e
npm run test:e2e:report
```

### Run Tests in Interactive UI Mode
```bash
npm run test:e2e:ui
```

## Test Coverage

The test suite covers the complete purchasing workflow:

| Test | Description |
|------|-------------|
| Product Catalog | Verifies products display correctly with prices |
| Product Detail Page | Tests navigation to product pages and content display |
| Add to Cart | Confirms products can be added to cart |
| Cart Page | Tests cart display and empty cart state |
| Checkout Flow | Verifies checkout button appears with items in cart |
| Order Success | Confirms success page displays after checkout |

## Environment Setup

For running tests in the Replit environment, the system Chromium browser is used automatically. If running locally, you may need to set:

```bash
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=$(which chromium)
```

Or install Playwright browsers:
```bash
npx playwright install chromium
```

## Test Configuration

Configuration is in `playwright.config.ts`:
- Tests run against `http://localhost:5000`
- HTML and list reporters enabled
- Screenshots captured on failure
- Traces captured on first retry

## Viewing Test Results

After running tests:

1. **Console Output**: Shows pass/fail status for each test
2. **HTML Report**: Run `npm run test:e2e:report` to open detailed report
3. **Screenshots**: Failed test screenshots saved to `test-results/` directory

## Troubleshooting

### Tests Timing Out
- Ensure the development server is running (`npm run dev`)
- First run may be slow due to Next.js compilation

### Browser Not Found
- Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` environment variable
- Or run `npx playwright install chromium`

### Age Verification Popup
- Tests automatically handle the age verification dialog
- No manual intervention required

## Writing New Tests

Tests are located in `e2e/purchasing-workflow.spec.ts`. To add new tests:

```typescript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/');
  // Handle age verification if needed
  // Add your test assertions
});
```

## Stripe Test Cards

For checkout testing:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC
