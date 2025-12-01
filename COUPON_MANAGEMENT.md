# Coupon Management Guide

## Three Ways to Manage Coupons

### Option 1: Admin Dashboard (Recommended)
**URL:** `/admin/coupons`

The easiest way to manage coupons with a user-friendly interface:
- Create new coupons with forms
- Edit existing coupons
- Delete coupons
- Toggle active/inactive status
- Set expiration dates and usage limits
- View all coupon details

### Option 2: Admin API Endpoints
**POST** `/api/admin/coupons` - Create new coupon
```json
{
  "code": "SUMMER25",
  "discountType": "percentage",
  "discountValue": 25,
  "isActive": true,
  "expiresAt": "2025-08-31",
  "maxUses": 50,
  "minOrderAmount": 5000
}
```

**PATCH** `/api/admin/coupons/[id]` - Update coupon
```json
{
  "isActive": false,
  "discountValue": 20
}
```

**DELETE** `/api/admin/coupons/[id]` - Delete coupon

**GET** `/api/admin/coupons` - List all coupons

### Option 3: Direct Database
You can also manage coupons directly through Replit's database pane:

**Create a coupon:**
```sql
INSERT INTO "Coupon" (id, code, "discountType", "discountValue", "isActive", "expiresAt", "maxUses", "minOrderAmount")
VALUES ('coupon_4', 'NEWYEAR50', 'percentage', 50, true, '2025-01-31', 100, 10000);
```

**Deactivate a coupon:**
```sql
UPDATE "Coupon" SET "isActive" = false WHERE code = 'OLDCODE';
```

**Activate a coupon:**
```sql
UPDATE "Coupon" SET "isActive" = true WHERE code = 'OLDCODE';
```

**Delete a coupon:**
```sql
DELETE FROM "Coupon" WHERE code = 'OLDCODE';
```

**View all coupons:**
```sql
SELECT * FROM "Coupon" ORDER BY "createdAt" DESC;
```

## Coupon Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Unique coupon code (uppercase) |
| `discountType` | string | "percentage" or "fixed" |
| `discountValue` | integer | Discount amount (% or cents) |
| `isActive` | boolean | Whether coupon can be used |
| `expiresAt` | datetime | Optional expiration date |
| `maxUses` | integer | Optional usage limit |
| `timesUsed` | integer | Current usage count (read-only) |
| `minOrderAmount` | integer | Minimum order total in cents |

## Example Coupons

```sql
-- 10% off, no minimum, unlimited uses
INSERT INTO "Coupon" (id, code, "discountType", "discountValue", "isActive")
VALUES ('coupon_1', 'WELCOME10', 'percentage', 10, true);

-- $20 off fixed amount, $100 minimum order
INSERT INTO "Coupon" (id, code, "discountType", "discountValue", "isActive", "minOrderAmount", "maxUses")
VALUES ('coupon_2', 'FIRST20', 'fixed', 2000, true, 10000, 500);

-- 30% off, expires Dec 31, max 25 uses
INSERT INTO "Coupon" (id, code, "discountType", "discountValue", "isActive", "expiresAt", "maxUses")
VALUES ('coupon_3', 'HOLIDAY30', 'percentage', 30, true, '2025-12-31', 25);
```

## Testing Coupons

1. Go to checkout page
2. Add items to cart
3. In Order Summary, enter the coupon code
4. Click "Apply"
5. See the discount calculated in real-time

## Notes

- All coupon codes are automatically converted to uppercase
- Discounts cannot exceed the order subtotal
- Coupons must be active and not expired to be used
- Usage limits are enforced at validation time
- Minimum order amounts are in cents ($5.00 = 500)
