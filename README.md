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

### Installation

```bash
# Install dependencies
pnpm install

# Setup Git hooks (automatic after install)
pnpm prepare
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
2. ⏳ Create folder structure
3. ⏳ Initialize frontend app
4. ⏳ Initialize backend app
5. ⏳ Configure TypeScript
6. ⏳ Setup database
