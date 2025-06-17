# Configuration Management

This project uses centralized JSON configuration files for better maintainability and security.

## Quick Start

1. **Copy template for development:**
   ```bash
   cp config/template.json config/development.json
   ```

2. **Update values in `config/development.json`:**
   - Database credentials to match your Docker setup
   - JWT secret for authentication
   - API endpoints and CORS settings

3. **For production deployment:**
   ```bash
   cp config/template.json config/production.json
   # Update with production values
   ```

## Configuration Files

| File | Purpose | Committed to Git |
|------|---------|------------------|
| `template.json` | Template with placeholders | ✅ Yes |
| `development.json` | Development settings | ❌ No (.gitignore) |
| `production.json` | Production settings | ❌ No (.gitignore) |

## Configuration Structure

```json
{
  "app": {
    "name": "Application name",
    "version": "1.0.0",
    "port": 4000,
    "nodeEnv": "development|production"
  },
  "database": {
    "host": "Database host",
    "port": 3306,
    "username": "Database user",
    "password": "Database password",
    "name": "Database name",
    "synchronize": true, // false in production
    "logging": true      // false in production
  },
  "jwt": {
    "secret": "JWT signing secret",
    "expiresIn": "24h"
  },
  "cors": {
    "origin": "Frontend URL",
    "credentials": true
  },
  "frontend": {
    "apiBaseUrl": "Backend API URL",
    "appTitle": "Frontend application title"
  }
}
```

## Usage in Code

### Backend (NestJS)

```typescript
import { loadConfig } from '@mysql-nest-react/shared';

const config = loadConfig();

// Use in your modules
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      synchronize: config.database.synchronize,
      logging: config.database.logging,
    }),
  ],
})
export class AppModule {}
```

### Frontend (React)

```typescript
import { loadConfig, getFrontendConfig } from '@mysql-nest-react/shared';

const config = loadConfig();
const frontendConfig = getFrontendConfig(config);

// Use in your components
const API_BASE_URL = frontendConfig.api.baseUrl;
```

## Environment Variable Override

Sensitive values can still be overridden with environment variables:

```bash
# Override database password
export DB_PASSWORD="production-db-password"

# Override JWT secret
export JWT_SECRET="super-secure-jwt-secret"
```

## Security Best Practices

1. **Never commit real secrets** to version control
2. **Use environment variables** for sensitive production values
3. **Rotate secrets regularly** in production
4. **Use different secrets** for each environment
5. **Consider using a secret manager** (AWS Secrets Manager, Azure Key Vault, etc.)

## Migration from .env Files

If migrating from `.env` files:

1. **Audit existing variables:**
   ```bash
   # Check what's currently used
   grep -r "process.env" services/backend/
   grep -r "import.meta.env" apps/frontend/
   ```

2. **Map to new structure:**
   - Copy values from `.env` to appropriate config file
   - Update import statements in code
   - Remove `.env` files

3. **Test thoroughly:**
   - Start applications in development mode
   - Verify all configuration values are loaded correctly
   - Test environment switching

## Troubleshooting

### Configuration file not found
```
Error: Configuration file not found: /path/to/config/development.json
```
**Solution:** Copy `template.json` to the missing environment file.

### JSON parsing error
```
Error: Failed to parse configuration file
```
**Solution:** Check JSON syntax in your config file using a JSON validator.

### Missing environment variables
```
Error: Could not find project root directory
```
**Solution:** Ensure you're running from within the project directory.
