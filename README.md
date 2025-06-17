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
│   ├── shared/        # Common utilities & types
│   ├── ui/            # Shared UI components (future)
│   └── README.md      # Packages documentation
├── docs/              # 📚 Complete Documentation
│   ├── api/           # API documentation
│   ├── development/   # Development guides
│   └── guides/        # Contributing & troubleshooting
├── .husky/            # Git hooks (Husky)
├── .vscode/           # VSCode settings
└── .taskmaster/       # Task management
```

## 🏃‍♂️ Quick Start

### 1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (18.x+)
- [pnpm](https://pnpm.io/installation)

### 2. Setup
```bash
# Clone and install
git clone <repository-url>
cd mysql-nest-react
pnpm install

# Setup configuration
cp config/template.json config/dev.json
# Edit config/dev.json with your settings

# Start database
docker-compose up -d

# Start development servers
pnpm dev
```

### 3. Access Points
- **API**: http://localhost:4000
- **Swagger UI**: http://localhost:4000/api-docs
- **Frontend**: http://localhost:5173 (coming soon)
- **Database**: localhost:3306

## 📚 Documentation
- **[All Documentations](./docs/README.md)** - 전체 문서


## 🧪 Try the API

### Swagger UI (Recommended)
Interactive API documentation: **http://localhost:4000/api-docs**

### Quick Test
```bash
# Register a new user
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser", 
    "password": "MyPassword123!"
  }'
```

## ⚡ Available Scripts

```bash
# Development
pnpm dev              # Start both frontend and backend
pnpm dev:backend      # Start backend only

# Code Quality  
pnpm check            # Check all issues (lint + format)
pnpm check:fix        # Fix all issues automatically

# Database
docker-compose up -d  # Start MySQL container
docker-compose down   # Stop MySQL container
```

## 🏗️ Progress

### ✅ Completed
- ✅ Monorepo structure with pnpm workspaces
- ✅ Docker MySQL database setup
- ✅ NestJS backend with TypeORM
- ✅ User registration API with validation
- ✅ Comprehensive error handling
- ✅ Swagger API documentation
- ✅ Code quality tools (Biome, Husky)

### 🚧 In Progress
- 🚧 JWT Authentication system (Access + Refresh tokens)

### ⏳ Coming Soon
- ⏳ User login/logout APIs
- ⏳ Protected route middleware  
- ⏳ React frontend application
- ⏳ Frontend-backend integration
