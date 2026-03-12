---
name: React Frontend Development
description: "Agent customization for testing-ia: A React frontend project. Enforces coding standards, best practices, TypeScript conventions, testing requirements, and component architecture guidelines for professional React development."
tools.disable: []
---

# Testing-IA Frontend Agent Guide

Agent providing specialized guidance for developing the **testing-ia** React frontend application.

## Project Overview

**testing-ia** is a React-based frontend application built with professional development standards, TypeScript support, component-based architecture, and comprehensive testing practices.

### Technology Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS/SCSS with modern conventions
- **Testing**: Jest + React Testing Library
- **Build Tool**: Webpack/Vite (via Create React App or equivalent)
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Package Manager**: npm/yarn
- **Git Hooks**: Husky + lint-staged

---

## 📁 Project Structure

```
testing-ia/
├── public/                      # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.tsx                 # Root component
│   ├── index.tsx               # Entry point
│   ├── components/             # Reusable components
│   │   ├── common/             # Common/shared components
│   │   ├── layouts/            # Layout components
│   │   └── features/           # Feature-specific components
│   ├── pages/                  # Page components (if using routing)
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API services, utilities
│   ├── types/                  # TypeScript type definitions
│   ├── styles/                 # Global styles, SCSS variables
│   ├── utils/                  # Helper functions
│   ├── constants/              # Application constants
│   └── __mocks__/              # Mock data for testing
├── tests/                      # Test files (mirror src/ structure)
├── .github/
│   └── workflows/              # CI/CD workflows
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── jest.config.js              # Jest testing configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

---

## 🎯 Coding Standards

### TypeScript

#### Type Definitions

- **Always define** prop interfaces for components using `interface` or `type`
- Use discriminated unions for complex state shapes
- Avoid `any` type; use `unknown` if necessary and narrow the type
- Export types from `types/` directory for reusability

```typescript
// ✅ Good
interface UserProfileProps {
  userId: string;
  onUpdate: (user: User) => void;
  isLoading?: boolean;
}

export type User = {
  id: string;
  name: string;
  email: string;
};

// ❌ Avoid
const UserProfile = (props: any) => {
  return <div>{props.user.name}</div>;
};
```

#### Generic Components

- Use generics for reusable components
- Document generic constraints clearly

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

export const List = <T,>({ items, renderItem, keyExtractor }: ListProps<T>) => (
  <ul>
    {items.map(item => (
      <li key={keyExtractor(item)}>{renderItem(item)}</li>
    ))}
  </ul>
);
```

### Component Structure

#### Functional Components

- Use Functional Components with Hooks (no class components)
- Keep component files small (< 300 lines, prefer < 150)
- Organize hooks at the top before CSS-in-JS or JSX

```typescript
// ✅ Good structure
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onClose,
}) => {
  // 1. State
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. Derived values
  const displayText = useMemo(() => title.toUpperCase(), [title]);
  
  // 3. Effects
  useEffect(() => {
    // side-effects
  }, []);
  
  // 4. Event handlers
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  
  // 5. Render
  return (
    <div>
      <h1>{displayText}</h1>
      <button onClick={handleClick}>{isOpen ? 'Close' : 'Open'}</button>
    </div>
  );
};
```

#### Props Naming

- Props are **PascalCase** interfaces/types
- Component names are **PascalCase**
- File names match component names (e.g., `UserCard.tsx`)

```typescript
// File: components/UserCard.tsx
interface UserCardProps {
  userId: string;
  isActive: boolean;
  onDelete: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ userId, isActive, onDelete }) => {
  // ...
};
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfileCard`, `NavigationBar` |
| Files (components) | PascalCase | `UserCard.tsx` |
| Hooks | camelCase, prefix `use` | `useUserData`, `useLocalStorage` |
| Functions/utilities | camelCase | `formatDate`, `calculateTotal` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Variables | camelCase | `userName`, `isLoading` |
| CSS Classes | kebab-case | `user-card`, `nav-item--active` |
| Event handlers | prefix `handle` | `handleClick`, `handleSubmit` |
| Callbacks passed as props | prefix `on` | `onClose`, `onSuccess` |

---

## 🏗️ Component Architecture

### Component Types

#### 1. Presentational Components

- Receive all data via props
- No business logic or API calls
- Highly reusable
- Located in `components/common/`

```typescript
// ✅ Presentational
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => (
  <button className={`btn btn--${variant}`} onClick={onClick}>
    {label}
  </button>
);
```

#### 2. Container Components

- Manage state and side-effects
- Make API calls
- Pass data/callbacks to presentational components
- Located in `components/features/` or `pages/`

```typescript
// ✅ Container
export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setIsLoading(false));
  }, []);
  
  return <UserListView users={users} isLoading={isLoading} />;
};
```

#### 3. Layout Components

- Define page structure
- Handle responsive layout
- Located in `components/layouts/`

```typescript
// ✅ Layout
export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => (
  <div className="layout">
    <Header />
    <Sidebar />
    <main className="layout__content">{children}</main>
    <Footer />
  </div>
);
```

### Custom Hooks

- Place in `hooks/` directory
- Export as named export
- Use TypeScript for hook types
- Document with JSDoc comments

```typescript
// hooks/useUserData.ts
interface UseUserDataResult {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches user data by ID
 * @param userId - The user's unique identifier
 * @returns User data, loading state, error, and refetch function
 */
export const useUserData = (userId: string): UseUserDataResult => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchUser(userId);
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);
  
  useEffect(() => {
    refetch();
  }, [userId, refetch]);
  
  return { user, isLoading, error, refetch };
};
```

---

## 🧪 Testing Standards

### Test File Organization

- Test files located in `tests/` directory
- Mirror `src/` directory structure
- File naming: `[ComponentName].test.tsx` or `[name].spec.ts`

```
src/
  components/
    UserCard.tsx
tests/
  components/
    UserCard.test.tsx
```

### Testing Requirements

- **Minimum coverage**: 80% for components, 90% for utilities
- Test behavior, not implementation details
- Use React Testing Library (not Enzyme)
- Avoid snapshot tests; use specific assertions

```typescript
// ✅ Good test
describe('UserCard', () => {
  it('should display user information', () => {
    const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('should call onDelete when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    const mockUser = { id: '1', name: 'John' };
    
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});

// ❌ Avoid snapshot tests
it('should render correctly', () => {
  const component = render(<UserCard user={mockUser} />);
  expect(component).toMatchSnapshot();
});
```

### Test Best Practices

- Use `data-testid` sparingly (prefer accessible queries)
- Mock API calls with `jest.mock()` or MSW
- Use setup/teardown with `beforeEach`/`afterEach`
- Test edge cases and error states

---

## 🎨 Styling Guidelines

### CSS/SCSS Architecture

- Use BEM (Block Element Modifier) naming convention
- Organize styles in `styles/` directory
- Separate component styles into `[ComponentName].module.scss`
- Use CSS variables for theming

```scss
// styles/variables.scss
$primary-color: #007bff;
$spacing-unit: 8px;
$border-radius: 4px;

// components/UserCard.module.scss
.userCard {
  padding: $spacing-unit * 2;
  border: 1px solid #ddd;
  border-radius: $border-radius;
  background-color: white;
  
  &__header {
    margin-bottom: $spacing-unit;
  }
  
  &__name {
    font-size: 18px;
    color: $primary-color;
    font-weight: bold;
  }
  
  &__email {
    font-size: 14px;
    color: #666;
  }
  
  &--active {
    border-color: $primary-color;
  }
}
```

### CSS Classes in Components

```tsx
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  isActive?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, isActive }) => {
  const className = [
    styles.userCard,
    isActive && styles['userCard--active']
  ].filter(Boolean).join(' ');
  
  return (
    <div className={className}>
      <div className={styles.userCard__header}>
        <h3 className={styles.userCard__name}>{user.name}</h3>
        <p className={styles.userCard__email}>{user.email}</p>
      </div>
    </div>
  );
};
```

---

## 📦 API Integration

### Service Layer

- Create API services in `services/` directory
- Export typed API functions
- Handle errors consistently
- Use async/await pattern

```typescript
// services/userService.ts
export interface ApiResponse<T> {
  data: T;
  error: ApiError | null;
}

interface ApiError {
  code: string;
  message: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const userService = {
  async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null as any,
        error: {
          code: 'FETCH_ERROR',
          message: err instanceof Error ? err.message : 'Unknown error'
        }
      };
    }
  },
  
  async createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    // implementation
  }
};
```

### Using Services in Components

```typescript
export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    userService.getUser(userId).then(response => {
      if (response.error) {
        setError(response.error.message);
      } else {
        setUser(response.data);
      }
      setIsLoading(false);
    });
  }, [userId]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return <UserCard user={user} />;
};
```

---

## 🚀 Development Workflow

### Available Scripts

```bash
# Development
npm start                    # Start dev server
npm run dev                  # Alternative dev server

# Building
npm run build               # Production build
npm run build:staging       # Staging build

# Testing
npm test                    # Run tests
npm run test:coverage       # Run tests with coverage
npm run test:watch         # Watch mode

# Linting & Formatting
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues
npm run format             # Format with Prettier
npm run typecheck          # Run TypeScript type checking

# CI/CD
npm run ci                 # CI pipeline (lint, type-check, test, build)
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit with conventional commits: `git commit -m "feat: add new user profile component"`
3. Keep commits small and focused
4. Pre-commit hooks run: linting, formatting, tests
5. Create pull request for review
6. Merge after approval

### Conventional Commits

```
feat: add user profile component
fix: resolve infinite loop in useEffect
refactor: simplify component logic
style: update UserCard styling
test: add tests for UserCard component
docs: update README with setup instructions
chore: update dependencies
```

---

## 🔍 Code Review Checklist

When reviewing code or receiving feedback, ensure:

- [ ] TypeScript types are defined for all props and return values
- [ ] Components are small and focused (< 300 lines)
- [ ] No `any` types; use `unknown` with proper narrowing
- [ ] Tests exist for new components (target 80%+ coverage)
- [ ] Naming conventions are followed consistently
- [ ] No console.log or debug code in production
- [ ] Accessibility considerations (ARIA labels, semantic HTML)
- [ ] Performance considerations (useMemo, useCallback when needed)
- [ ] Error handling is implemented
- [ ] Comments/documentation for complex logic
- [ ] No hardcoded values; use constants instead
- [ ] Import statements are organized and sorted

---

## 🛠️ Tools & Configuration

### ESLint

Rules enforce:
- TypeScript best practices
- React hooks rules
- Accessibility standards
- Code quality

Run: `npm run lint`

### Prettier

Automatic code formatting:
- 2 spaces indentation
- Single quotes for strings
- Semicolons required
- Auto line wrapping

Run: `npm run format`

### TypeScript

Strict mode enabled:
- No implicit any
- Strict null checks
- No unused variables
- Strict property initialization

Check: `npm run typecheck`

### Jest

- Unit tests for utilities
- Component tests with React Testing Library
- Mock external dependencies
- Coverage reports in `coverage/` directory

Run: `npm test`

---

## 🐛 Debugging

### Common Issues

#### Component Not Re-rendering

- Check if state setter is being called
- Verify dependency arrays in useEffect/useMemo/useCallback
- Ensure immutable state updates

#### Memory Leaks

- Clean up subscriptions in useEffect cleanup
- Cancel pending requests on unmount
- Remove event listeners

```typescript
useEffect(() => {
  const subscription = eventEmitter.subscribe(onEvent);
  const timer = setTimeout(() => {}, 1000);
  
  return () => {
    subscription.unsubscribe();
    clearTimeout(timer);
  };
}, []);
```

#### TypeScript Errors

- Use `as const` for literal types
- Extract complex types to `types/` directory
- Use `satisfies` operator to validate types without narrowing

---

## 📚 Resources & References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

## 🤝 Contributing

When contributing to testing-ia:

1. Follow all standards outlined in this guide
2. Write tests for new features
3. Update documentation as needed
4. Request code review before merging
5. Maintain code quality and consistency
6. Respect the project's architecture

---

**Last Updated**: March 2026
