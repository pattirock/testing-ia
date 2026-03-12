# Testing-IA Skills Directory

Specialized skill guides for different aspects of React frontend development in the testing-ia project.

## Available Skills

### 1. TypeScript Standards
📁 **Location**: `.github/skills/typescript-standards/`  
🎯 **Use When**: 
- Defining types and interfaces
- Avoiding `any` type
- Setting up strict TypeScript configuration
- Creating generic components
- Using type utilities (Partial, Pick, Record)

**Key Topics**:
- Strict mode configuration
- Type definitions & interfaces
- Discriminated unions
- Generic components & functions
- Utility types (Pick, Omit, Partial, Record, Readonly)
- Type guards & narrowing
- Const assertions & satisfies operator

---

### 2. React Components
📁 **Location**: `.github/skills/react-components/`  
🎯 **Use When**:
- Building functional components
- Creating custom hooks
- Designing component hierarchy
- Preventing props drilling
- Implementing error boundaries

**Key Topics**:
- Functional component structure
- Component composition (presentational/container)
- Custom hooks best practices
- Context API usage
- Error boundaries
- Lazy loading & code splitting
- Component naming & file organization

---

### 3. Component Testing
📁 **Location**: `.github/skills/component-testing/`  
🎯 **Use When**:
- Writing unit tests for components
- Setting up Jest configuration
- Testing React Hooks
- Mocking API calls
- Achieving test coverage goals
- Testing async operations

**Key Topics**:
- Test file structure & organization
- Basic component tests
- Testing custom hooks
- Mocking external dependencies
- Testing with React Testing Library
- Async/await in tests
- Context testing
- Jest configuration & setup
- Coverage targets & best practices

---

### 4. Styling Guide
📁 **Location**: `.github/skills/styling-guide/`  
🎯 **Use When**:
- Setting up CSS/SCSS architecture
- Creating component styles
- Implementing BEM naming convention
- Building responsive layouts
- Using CSS variables & theming
- Creating reusable mixins

**Key Topics**:
- Project structure for styles
- Variables & configuration (colors, spacing, typography)
- SCSS mixins (media queries, flexbox, transitions, shadows)
- BEM naming convention (Block, Element, Modifier)
- Component styling with CSS modules
- Responsive design patterns
- CSS classes composition in React
- Styling best practices checklist

---

### 5. API Integration
📁 **Location**: `.github/skills/api-integration/`  
🎯 **Use When**:
- Integrating backend APIs
- Creating service layers
- Handling HTTP requests
- Error handling & retries
- Using custom data-fetching hooks
- Testing API interactions

**Key Topics**:
- Service layer architecture
- API configuration & base service
- Request/response types
- HTTP error handling
- REST methods (GET, POST, PUT, DELETE)
- Custom `useApi` hook
- Error handling in components
- Mock services for testing
- API best practices checklist

---

## How to Use These Skills

### In VS Code with GitHub Copilot

When working on your project, you can reference skills in Copilot chat:

```
/typescript-standards     # For TypeScript guidance
/react-components        # For component architecture
/component-testing       # For testing questions
/styling-guide          # For CSS/SCSS help
/api-integration        # For API/data fetching help
```

### Example Prompts

- **"Using `/react-components`, how should I structure a form component with validation?"**
- **"According to `/component-testing`, what's the best way to test this custom hook?"**
- **"Show me a BEM example from `/styling-guide` for a user card component"**
- **"Using `/api-integration`, how do I implement error handling for API calls?"**

### Quick Reference

| I need help with... | Use Skill |
|-------------------|-----------|
| Type safety & interfaces | `/typescript-standards` |
| Component architecture | `/react-components` |
| Writing tests | `/component-testing` |
| Styling & CSS | `/styling-guide` |
| APIs & data fetching | `/api-integration` |

---

## Skill Contents Overview

Each skill is independently complete and includes:

✅ **Full guidance** on the topic  
✅ **Code examples** demonstrating best practices  
✅ **Common patterns** used in the project  
✅ **Best practices checklist**  
✅ **Troubleshooting tips**  
✅ **Resource links**  

---

## Navigation

Back to [Main Agent Guide](../../../agent.md)

---

**Last Updated**: March 2026  
**Project**: testing-ia React Frontend
