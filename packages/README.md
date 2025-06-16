# Packages Directory

This directory contains shared packages and utilities used across the monorepo.

## Structure
```
packages/
├── shared/            # Shared utilities and types
├── ui/                # Shared UI components (future)
└── config/            # Shared configurations (future)
```

## Planned Packages
- **shared**: Common utilities, types, constants, and helper functions
- **ui**: Reusable UI components shared between frontend applications
- **config**: Shared configuration files and environment setups

## Getting Started
Each package will have its own:
- `package.json` with package-specific dependencies
- `src/` directory with package code
- TypeScript declarations
- Build configurations
- Documentation

## Usage
Packages are imported by other workspace packages:
```typescript
// Import shared types
import { User, AuthResponse } from '@packages/shared/types';

// Import shared utilities
import { formatDate, validateEmail } from '@packages/shared/utils';
```

## Development
```bash
# Build all packages
pnpm build

# Test specific package
pnpm test --filter @packages/shared
```