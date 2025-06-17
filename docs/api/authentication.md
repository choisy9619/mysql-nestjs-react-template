# Authentication API

## 📝 User Registration

Create a new user account.

### Endpoint
```http
POST /auth/register
```

### Request Body
```json
{
  "email": "user@example.com",
  "username": "testuser", 
  "password": "MyPassword123!",
  "displayName": "Test User",     // Optional
  "bio": "This is my bio"         // Optional
}
```

### Validation Rules
- **Email**: Valid email format, required, unique
- **Username**: 3-20 characters, alphanumeric + underscores only, required, unique
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, number, and special character
- **Display Name**: Optional, max 50 characters
- **Bio**: Optional, max 500 characters

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "username": "testuser",
    "displayName": "Test User",
    "bio": "This is my bio",
    "isVerified": false,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Error Responses

#### Validation Error (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": [
    "Please provide a valid email address",
    "Password must contain uppercase, lowercase, number and special character"
  ],
  "error": "Bad Request"
}
```

#### Conflict Error (409 Conflict)
```json
{
  "statusCode": 409,
  "message": "This email is already registered",
  "error": "Conflict"
}
```

#### Server Error (500 Internal Server Error)
```json
{
  "statusCode": 500,
  "message": "Something went wrong. Please try again later",
  "error": "Internal Server Error"
}
```

## 🔐 User Login (Coming Soon)

Authenticate user and receive JWT tokens.

### Endpoint
```http
POST /auth/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "MyPassword123!"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "testuser",
      "displayName": "Test User"
    }
  }
}
```

## 🔄 Token Refresh (Coming Soon)

Refresh access token using refresh token.

### Endpoint
```http
POST /auth/refresh
```

### Request Body
```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 🚪 User Logout (Coming Soon)

Invalidate user tokens.

### Endpoint
```http
POST /auth/logout
```

### Headers
```http
Authorization: Bearer <access-token>
```

## 👤 Get Profile (Coming Soon)

Get current user profile information.

### Endpoint
```http
GET /auth/profile
```

### Headers
```http
Authorization: Bearer <access-token>
```

## 🧪 Testing Examples

### cURL Examples

#### Register
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "MyPassword123!",
    "displayName": "Test User"
  }'
```

#### Login (Coming Soon)
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "password": "MyPassword123!"
  }'
```

### JavaScript/TypeScript Examples

#### Register
```typescript
const registerUser = async () => {
  const response = await fetch('http://localhost:4000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      username: 'testuser',
      password: 'MyPassword123!',
      displayName: 'Test User'
    }),
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('User registered:', result.data);
  } else {
    console.error('Registration failed:', result.message);
  }
};
```
