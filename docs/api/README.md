# API Documentation

## 🔗 Quick Links

- **Swagger UI**: http://localhost:4000/api-docs (Interactive Documentation)
- **Base URL**: `http://localhost:4000`

## 📋 Available APIs

### 🔐 Authentication
- [Authentication API](./authentication.md) - 회원가입, 로그인, 토큰 관리

### 👤 Users (Coming Soon)
- User Profile Management
- User Settings

## 📊 Common Response Format

All APIs follow a consistent response format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* actual data */ }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Error Type"
}
```

## 🔑 Authentication

Most endpoints require authentication using JWT Bearer tokens:

```http
Authorization: Bearer <your-jwt-token>
```

## 📝 Testing

### Recommended Tools
1. **Swagger UI** (http://localhost:4000/api-docs) - Interactive testing
2. **Postman** - Import collection
3. **cURL** - Command line testing
4. **Thunder Client** - VS Code extension

### Example cURL
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "MyPassword123!"
  }'
```
