# Apps Directory

This directory contains frontend applications for the monorepo.

## Structure
```
apps/
├── frontend/          # Main React application
└── admin/             # Admin dashboard (future)
```

## Planned Applications
- **frontend**: Main user-facing React application with authentication
- **admin**: Administrative dashboard (future enhancement)

## Getting Started
Each app will have its own:
- `package.json` with app-specific dependencies
- `src/` directory with application code
- Build and development scripts
- Environment configurations

## Development
```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev:frontend

# Build specific app  
pnpm build:frontend
```
