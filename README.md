# Marketplace MercadoLibre Clone

A marketplace application built with Next.js, featuring product search, detailed product views, and a responsive design.

**Live Demo:** [https://marketplace-meli-6ixn.vercel.app/](https://marketplace-meli-6ixn.vercel.app/)

## Table of Contents

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Storybook](#storybook)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

## Technologies

This project is built with a modern frontend stack focused on performance, type safety, and developer experience:

### Core Framework

- **Next.js 15.5** - React framework with App Router, Server Components, and Turbopack
- **React 19.1** - Latest React with improved server-side rendering capabilities
- **TypeScript** - Type-safe development experience

### State & Data Fetching

- **TanStack Query** - Server state management with caching and optimistic updates
- **Axios** - HTTP client with interceptors and custom adapters

### Styling

- **Sass** - CSS preprocessor with modules and scoped styles
- **clsx** - Utility for constructing className strings conditionally

### Validation & Utilities

- **Zod 4** - TypeScript-first schema validation
- **Day.js** - Lightweight date manipulation library

### Testing & Quality

- **Vitest with coverage-v8** - Fast unit test framework with native ESM support
- **Testing Library** - React component testing utilities

### Development Tools

- **Storybook 9** - Component development and documentation
- **ESLint** - Code linting with Next.js configuration

## Architecture

The project follows a **Feature-Based Architecture** combined with **Domain-Driven Design** principles:

### Patterns

**Module-Based Organization**

- Each feature (Search, Product) is isolated in its own module
- Modules contain their own components, hooks, services, and tests
- Clear separation between business logic and presentation

**API Layer Design**

- Next.js API routes serve as backend endpoints
- Mock data system for development and testing
- Type-safe DTOs for API contracts
- Utility functions for data transformation and validation

**Shared Resources**

- Common UI components in `shared/ui`
- Reusable hooks in `shared/hooks`
- Centralized API client configuration
- Global styles and constants

### Key Architectural Decisions

1. **Server-Side First**: Leverages Next.js App Router for server components and SEO optimization
2. **Type Safety**: TypeScript
3. **Scalability**: Modular structure allows easy feature addition without affecting existing code
4. **Testing Strategy**: Co-located tests with components for better maintainability
5. **API Abstraction**: Clean separation between API routes, services, and utilities

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages, API routes, layouts)
├── modules/                # Feature modules (Product, Search)
└── shared/                 # Shared resources (UI components, hooks, styles)
```

## Testing

The project uses **Vitest** for fast, modern unit testing with comprehensive coverage.

### Test Structure

- Tests are co-located with their source files in `__tests__` directories
- All utilities, hooks, services, and components have dedicated test suites
- Mock data is used for API testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Storybook

Component documentation and isolated development environment powered by **Storybook**.

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Storybook runs on `http://localhost:6006` and provides a sandbox for developing and testing UI components in isolation.

## Getting Started

### Prerequisites

Ensure you have **Node.js** (version 20 or higher) installed on your machine.

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:

```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Running the Application

```bash
# Development mode with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

The application will be available at `http://localhost:3000`.

For the Live version, visit the live deployment at [https://marketplace-meli-6ixn.vercel.app/](https://marketplace-meli-6ixn.vercel.app/)
