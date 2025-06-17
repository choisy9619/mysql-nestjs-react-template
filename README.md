# MySQL-NestJS-React Monorepo

A full-stack authentication system built with modern web technologies.

## 🚀 Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: NestJS + TypeScript  
- **Database**: MySQL
- **Package Manager**: pnpm
- **Code Quality**: Biome (formatting + linting)
- **Git Hooks**: Husky + lint-staged

## 📦 Project Structure

```
mysql-nest-react/
├── apps/              # Frontend applications
│   ├── frontend/      # Main React app (Step 4)
│   └── README.md      # Apps documentation
├── services/          # Backend services  
│   ├── backend/       # Main NestJS API (Step 5)
│   └── README.md      # Services documentation
├── packages/          # Shared packages
│   ├── shared/        # Common utilities & types (future)
│   ├── ui/            # Shared UI components (future)
│   └── README.md      # Packages documentation
├── .husky/            # Git hooks (Husky)
├── .vscode/           # VSCode settings
├── .taskmaster/       # Task management
└── docs/              # Project documentation
```

## 🛠️ Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (18.x or higher)
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
# Install dependencies
pnpm install

# Setup Git hooks (automatic after install)
pnpm prepare
```

### 🐳 Database Setup (MySQL with Docker)

#### Start MySQL Container

```bash
# Start MySQL container in background
docker-compose up -d

# Check container status
docker-compose ps

# View container logs
docker-compose logs mysql
```

#### Connect to Database

```bash
# Connect via Docker (recommended for development)
docker-compose exec mysql mysql -u nestuser -p mysql_nest_react
# Password: nestpassword

# Connect from host (requires MySQL client)
mysql -h localhost -P 3306 -u nestuser -p mysql_nest_react
# Password: nestpassword

# Connect as root user
docker-compose exec mysql mysql -u root -p
# Password: rootpassword
```

#### Database Management

```bash
# Stop MySQL container
docker-compose down

# Stop and remove all data (⚠️ DANGER: All data will be lost!)
docker-compose down -v

# View database files location
docker volume inspect mysql-nest-react_mysql_data

# Backup database
docker-compose exec mysql mysqldump -u root -p mysql_nest_react > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p mysql_nest_react < backup.sql
```

#### Troubleshooting Database

```bash
# Container won't start
docker-compose logs mysql

# Port already in use (3306)
lsof -i :3306
# Kill process or change port in docker-compose.yml

# Reset everything
docker-compose down -v
docker system prune -f
docker-compose up -d

# Check disk space
docker system df
```

### Available Scripts

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
perf: optimize database queries
ci: update GitHub Actions
build: configure webpack
revert: revert previous commit
```

**❌ Invalid commit messages:**
```bash
"Add feature"           # Missing type
"feat Add feature"      # Missing colon
"FEAT: add feature"     # Wrong case
"feat:"                 # Missing description
"feat: Add feature."    # Ends with period
```

### Skip Hooks (Emergency)
```bash
# Skip pre-commit hook only
git commit --no-verify -m "feat: emergency fix"

# Skip all hooks
HUSKY=0 git commit -m "feat: emergency fix"
```

### Manual Quality Check
```bash
# Run the same checks as pre-commit hook
pnpm pre-commit

# Or check everything
pnpm check
```

## 🔧 Configuration Files

- `biome.json` - Code formatting and linting rules
- `pnpm-workspace.yaml` - Workspace configuration  
- `.npmrc` - pnpm settings and hoisting patterns
- `.husky/` - Git hooks configuration
- `package.json` - Root package with scripts

## 📝 Development Workflow

1. **Make changes** to your code
2. **Stage files**: `git add .`
3. **Commit**: `git commit -m "your message"`
   - 🪝 Husky automatically runs checks
   - ✨ Biome fixes issues automatically
   - ✅ Commit succeeds if no errors
4. **Push**: `git push`

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

## 🏗️ Next Steps

1. ✅ Setup monorepo structure
2. ✅ Create folder structure  
3. ✅ Setup Docker MySQL database
4. ⏳ Initialize NestJS backend app
5. ⏳ Initialize React frontend app
6. ⏳ Configure TypeScript integration
7. ⏳ Implement user authentication
