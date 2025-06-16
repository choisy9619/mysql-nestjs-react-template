# Services Directory

This directory contains backend services and APIs for the monorepo.

## Structure
```
services/
├── backend/           # Main NestJS API server
└── auth/              # Authentication service (future)
```

## Planned Services
- **backend**: Main NestJS API with user authentication, MySQL integration
- **auth**: Dedicated authentication microservice (future enhancement)

## Getting Started
Each service will have its own:
- `package.json` with service-specific dependencies
- `src/` directory with service code
- Database configurations
- API documentation
- Environment configurations

## Development
```bash
# Start all services
pnpm dev

# Start specific service
pnpm dev:backend

# Build specific service
pnpm build:backend
```

## Database
- **MySQL**: Primary database for user data and application state
- **Docker**: Containerized database for development
- **TypeORM**: Database ORM for type-safe queries
