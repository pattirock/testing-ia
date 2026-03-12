---
name: React Frontend Development
description: "Agent for testing-ia React frontend project. Provides guidance on architecture, development patterns, and best practices. Use specific skills for detailed guidance on TypeScript, Components, Testing, Styling, or API Integration."
tools.disable: []
---

# Testing-IA Frontend Agent

Central guide for developing the **testing-ia** React frontend application with professional standards and best practices.

## Quick Links to Specialized Skills

Use these skills when working on specific aspects of the project:

| Task | Skill | Use When |
|------|-------|----------|
| TypeScript & Types | `/typescript-standards` | Setting up types, avoiding `any`, creating interfaces, strict type safety |
| React Components | `/react-components` | Building components, hooks, props, composition, component architecture |
| Component Testing | `/component-testing` | Writing tests, Jest setup, testing hooks, mocking, coverage |
| CSS/SCSS Styling | `/styling-guide` | Styling components, BEM convention, responsive design, theming |
| API Integration | `/api-integration` | Services, HTTP requests, data fetching, error handling |

---

## Project Overview

**testing-ia** is a professional React 18+ frontend application with TypeScript, Jest testing, and modern component architecture.

### Technology Stack

| Category | Tools |
|----------|-------|
| Framework | React 18+ |
| Language | TypeScript |
| Styling | CSS/SCSS Modules (BEM) |
| Testing | Jest + React Testing Library |
| Linting | ESLint |
| Formatting | Prettier |
| Package Manager | npm/yarn |
| Git Hooks | Husky + lint-staged |

---

## 📁 Project Structure

```
testing-ia/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── common/              # Reusable components
│   │   ├── layouts/             # Page layouts
│   │   └── features/            # Feature-specific components
│   ├── pages/                   # Page components (if routing)
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API services
│   ├── types/                   # TypeScript definitions
│   ├── styles/                  # Global styles, SCSS variables
│   ├── utils/                   # Utility functions
│   ├── constants/               # Constants
│   ├── __mocks__/               # Mock data for testing
│   ├── App.tsx
│   └── index.tsx
├── tests/                       # Test files (mirrors src/)
├── .github/
│   └── skills/                  # Specialized skill documentation
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎯 Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` prefix | `useUserData()` |
| Functions | camelCase | `formatDate()` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| CSS Classes | kebab-case | `user-card` |
| Event Handlers | `handle` prefix | `handleClick()` |
| Props/Callbacks | `on` prefix | `onSelect()` |

---

## 🚀 Development Scripts

```bash
# Development
npm start                 # Start dev server
npm run dev             # Alternative

# Building
npm run build           # Production build
npm run build:staging   # Staging build

# Testing
npm test               # Run tests
npm run test:coverage  # With coverage report
npm run test:watch    # Watch mode

# Code Quality
npm run lint           # ESLint check
npm run lint:fix       # Auto-fix issues
npm run format         # Prettier format
npm run typecheck      # TypeScript check

# CI/CD
npm run ci             # Full pipeline
```

---

## 📋 Git Workflow

```bash
# Branch naming
feature/add-user-profile      # New feature
fix/loading-state-bug         # Bug fix
refactor/simplify-component   # Code improvement
docs/update-readme            # Documentation

# Conventional commits
feat: add user profile component
fix: resolve memory leak in useEffect
refactor: optimize component rendering
test: add UserCard test coverage
style: update Button styling
docs: add API integration guide
chore: update dependencies
```

---

## ✅ Code Review Checklist

- [ ] Types defined for props and returns
- [ ] Components < 300 lines (prefer < 150)
- [ ] No `any` types in code
- [ ] Tests exist (80%+ coverage target)
- [ ] Naming conventions followed
- [ ] Accessibility considered (ARIA, semantic HTML)
- [ ] Error handling implemented
- [ ] No hardcoded values (use constants)
- [ ] Performance optimized (useMemo, useCallback)
- [ ] Comments for complex logic
- [ ] Imports organized and sorted
- [ ] No console.log in production code

---

## 🐛 Common Issues & Solutions

### Component Not Re-rendering
- Verify state setter is called
- Check dependency arrays in useEffect
- Ensure immutable state updates (create new objects/arrays)

### Memory Leaks
- Clean up subscriptions in useEffect cleanup function
- Cancel pending requests on unmount
- Remove event listeners in cleanup

### TypeScript Errors
- Use `as const` for literal types
- Extract complex types to `types/` directory
- Use `satisfies` operator for type validation

### Test Failures
- Mock external dependencies properly
- Use React Testing Library queries correctly
- Await async operations properly
- Set up test environment (jest.setup.js)

---

## 🎓 Development Principles

1. **Show, Don't Tell** - Use demonstrated examples
2. **Type Safety** - Strict TypeScript, avoid `any`
3. **Testability** - Write testable code structure
4. **Accessibility** - Semantic HTML, ARIA labels
5. **Performance** - Optimize re-renders, lazy load
6. **Clarity** - Self-documenting code, clear naming
7. **Reusability** - DRY principle, component composition

---

## 📚 Key Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Testing Library](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [BEM Methodology](http://getbem.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🤔 Need Specialized Help?

Look for the skill command matching your task:
- **Building components?** → `/react-components`
- **Typing data?** → `/typescript-standards`
- **Writing tests?** → `/component-testing`
- **Styling elements?** → `/styling-guide`
- **Fetching data?** → `/api-integration`

Each skill contains detailed examples, best practices, and complete code samples.

---

**Last Updated**: March 2026
**Project**: testing-ia React Frontend
