# Development Setup

## 🛠️ Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (18.x or higher)
- [pnpm](https://pnpm.io/installation)

## ⚙️ Configuration Setup

This project uses centralized JSON configuration files instead of scattered `.env` files.

### First-time Setup

```bash
# Copy template configuration
cp config/template.json config/dev.json

# Edit development configuration
# Update database credentials, JWT secrets, etc.
vim config/dev.json
```

### Configuration Files

- `config/template.json` - Template with placeholder values
- `config/dev.json` - Development environment settings
- `config/prod.json` - Production environment settings (**never commit real secrets**)

### Environment Variables Override

You can still override sensitive values with environment variables:

```bash
# Override database password
export DB_PASSWORD="your-secure-password"

# Override JWT secret
export JWT_SECRET="your-jwt-secret"
```

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Setup Git hooks (automatic after install)
pnpm prepare
```

## 🚀 Available Scripts

```bash
# Development
pnpm dev              # Start both frontend and backend
pnpm dev:frontend     # Start frontend only
pnpm dev:backend      # Start backend only

# Build
pnpm build            # Build all packages
pnpm build:frontend   # Build frontend only
pnpm build:backend    # Build backend only

# Code Quality
pnpm check            # Check all issues (lint + format + imports)
pnpm check:fix        # Fix all issues automatically
pnpm lint             # Lint only
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code
pnpm format:check     # Check formatting

# Testing
pnpm test             # Run tests in all packages
```

## 🪝 Git Hooks (Husky)

### Pre-commit Hook
Automatically runs before each commit:
- **Biome check** on staged files only
- **Auto-fixes** formatting and linting issues
- **Organizes imports**

### Commit-msg Hook (Commitlint)
Validates commit message format using **Conventional Commits**:

**✅ Valid commit messages:**
```bash
feat: add user authentication
fix: resolve login bug
docs: update README
style: format code with biome
refactor: restructure auth module
test: add unit tests for auth
chore: update dependencies
```

## 📝 Development Workflow

1. **Make changes** to your code
2. **Stage files**: `git add .`
3. **Commit**: `git commit -m "your message"`
   - 🪝 Husky automatically runs checks
   - ✨ Biome fixes issues automatically
   - ✅ Commit succeeds if no errors
4. **Push**: `git push`

## 🔧 Configuration Files

- `biome.json` - Code formatting and linting rules
- `pnpm-workspace.yaml` - Workspace configuration  
- `.npmrc` - pnpm settings and hoisting patterns
- `.husky/` - Git hooks configuration
- `package.json` - Root package with scripts

## 🚫 Troubleshooting

### Pre-commit Hook Fails
```bash
# Check what's wrong
pnpm check

# Fix issues manually
pnpm check:fix

# Try committing again
git commit -m "your message"
```

### Disable Hooks Temporarily
```bash
# For single commit
git commit --no-verify -m "message"

# For all commands in session
export HUSKY=0
```
