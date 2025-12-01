# Admin Login API Documentation

## Overview
The Admin Login API provides secure authentication for administrators to access admin functions. Uses JWT tokens for stateless authentication.

## Endpoints

### 1. Admin Login
**POST** `/api/admin/login`

Authenticates an admin user with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "your-secure-password"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "admin@example.com",
    "name": "Admin Name",
    "isAdmin": true
  }
}
```

**Error Responses:**
- **400** - Missing email or password
- **401** - Invalid credentials or not an admin
- **403** - Admin access required
- **500** - Server error

### 2. Verify Token
**POST** `/api/admin/verify`

Verifies a JWT token and checks admin status.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "admin@example.com",
    "name": "Admin Name",
    "isAdmin": true,
    "iat": 1704110400,
    "exp": 1704196800
  }
}
```

**Error Responses:**
- **400** - Token is required
- **401** - Invalid or expired token
- **403** - Not an admin user

## Setup

### 1. Create an Admin User
First, create an admin account in your database:

```bash
# Using Node.js REPL or your backend
const bcrypt = require('bcryptjs')
const hashedPassword = await bcrypt.hash('secure-password', 10)

# Then insert via database or use your signup endpoint
```

Or via SQL:
```sql
INSERT INTO "User" (id, email, password, "isAdmin", "createdAt", "updatedAt")
VALUES ('admin_1', 'admin@example.com', '<hashed-password>', true, NOW(), NOW());
```

### 2. Set JWT Secret
Ensure `JWT_SECRET` environment variable is set:
```bash
# In your .env or Replit secrets
JWT_SECRET=your-very-secure-secret-key-change-this
```

## Usage Examples

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "secure-password"
  }'

# Verify Token
curl -X POST http://localhost:5000/api/admin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### JavaScript/Fetch
```javascript
// Login
const loginResponse = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'secure-password'
  })
})

const { token } = await loginResponse.json()
localStorage.setItem('adminToken', token)

// Use token for subsequent requests
const couponsResponse = await fetch('/api/admin/coupons', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Python
```python
import requests
import json

# Login
response = requests.post('http://localhost:5000/api/admin/login', json={
    'email': 'admin@example.com',
    'password': 'secure-password'
})

data = response.json()
token = data['token']

# Use token
headers = {'Authorization': f'Bearer {token}'}
coupons = requests.get('http://localhost:5000/api/admin/coupons', headers=headers)
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token expiration (24 hours)
- ✅ Admin flag verification
- ✅ No password exposure in responses
- ✅ Generic error messages for failed logins
- ✅ Secure token signing with secret key

## Token Usage

Include the token in the `Authorization` header for protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

## Best Practices

1. **Store tokens securely** - Use httpOnly cookies or secure storage
2. **Rotate secrets regularly** - Change JWT_SECRET periodically
3. **Use HTTPS in production** - Never send credentials over HTTP
4. **Set token expiration** - Currently 24 hours (adjust as needed)
5. **Verify admin status** - Always check `isAdmin` flag in your middleware

## Next Steps

To protect the admin API endpoints, add middleware to verify JWT tokens before allowing access to `/api/admin/*` routes.
