---
name: component-testing
description: "Use when: writing tests for React components, setting up Jest configurations, testing with React Testing Library, or improving test coverage. Provides comprehensive testing patterns and best practices."
---

# Component Testing Guide

Complete testing strategies for React components using Jest and React Testing Library.

## Test File Structure

```
src/
├── components/
│   ├── UserCard.tsx
├── tests/
│   └── components/
│       ├── UserCard.test.tsx
│       └── __mocks__/
│           └── userMocks.ts
```

## Basic Component Test

```typescript
// tests/components/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from '@/components/UserCard';
import { User } from '@/types';

// Helper: Create mock data
const createMockUser = (overrides?: Partial<User>): User => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
});

describe('UserCard', () => {
  // ✅ Test rendering
  it('should display user information', () => {
    const user = createMockUser();
    render(<UserCard user={user} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  // ✅ Test user interactions
  it('should call onDelete when delete button is clicked', async () => {
    const mockOnDelete = jest.fn();
    const user = createMockUser();
    
    render(<UserCard user={user} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
  
  // ✅ Test conditional rendering
  it('should show badge when user is active', () => {
    const user = createMockUser({ id: '2' });
    render(<UserCard user={user} isActive />);
    
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
  
  // ✅ Test edge cases
  it('should render with no email gracefully', () => {
    const user = createMockUser({ email: '' });
    render(<UserCard user={user} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText(/.+@.+/)).not.toBeInTheDocument();
  });
});
```

## Testing Hooks

```typescript
// ✅ Test custom hooks with renderHook
import { renderHook, act } from '@testing-library/react';
import { useUserData } from '@/hooks/useUserData';

describe('useUserData', () => {
  it('should fetch user data on mount', async () => {
    const { result } = renderHook(() => useUserData('user-123'));
    
    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeDefined();
  });
  
  it('should handle errors', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    const { result } = renderHook(() => useUserData('user-123'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('API Error');
  });
  
  it('should refetch data when called', async () => {
    const { result } = renderHook(() => useUserData('user-123'));
    
    await act(async () => {
      result.current.refetch();
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Mocking API Calls

```typescript
// ✅ Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('API calls', () => {
  it('should fetch data from API', async () => {
    const mockData = { id: '1', name: 'John' };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });
    
    const response = await fetch('/api/users/1');
    const data = await response.json();
    
    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
  });
  
  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    
    const response = await fetch('/api/users/999');
    
    expect(response.ok).toBe(false);
  });
});
```

## Mocking Child Components

```typescript
// ✅ Mock child components for isolated testing
jest.mock('@/components/UserList', () => ({
  UserList: ({ users }: { users: User[] }) => (
    <div data-testid="user-list">{users.length} users</div>
  )
}));

describe('UserContainer', () => {
  it('should render UserList with users', () => {
    const mockUsers = [
      createMockUser({ id: '1' }),
      createMockUser({ id: '2' })
    ];
    
    render(<UserContainer initialUsers={mockUsers} />);
    
    expect(screen.getByTestId('user-list')).toHaveTextContent('2 users');
  });
});
```

## Testing with Data-TestId

```typescript
// ✅ Use data-testid for hard-to-query elements
it('should render form fields', () => {
  render(<UserForm />);
  
  expect(screen.getByTestId('form-email-input')).toBeInTheDocument();
  expect(screen.getByTestId('form-submit-button')).toBeEnabled();
});

// ✅ But prefer accessible queries
// Better:
expect(screen.getByLabelText('Email')).toBeInTheDocument();
expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
```

## Testing Async Operations

```typescript
// ✅ Test async form submission
it('should submit form and show success', async () => {
  const mockOnSuccess = jest.fn();
  
  render(<UserForm onSuccess={mockOnSuccess} />);
  
  const emailInput = screen.getByLabelText('Email');
  const submitButton = screen.getByRole('button', { name: /submit/i });
  
  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.click(submitButton);
  
  // Wait for async operation
  await screen.findByText(/successfully submitted/i);
  
  expect(mockOnSuccess).toHaveBeenCalledWith({
    email: 'user@example.com'
  });
});
```

## Testing Context

```typescript
// ✅ Create wrapper for Context-dependent components
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ThemeProvider>
  );
};

it('should use theme context', () => {
  render(<ComponentUsingTheme />, { wrapper: createWrapper() });
  
  const element = screen.getByTestId('theme-aware');
  expect(element).toHaveClass('dark-theme'); // if dark mode is default
});
```

## Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## Test Setup File

```typescript
// jest.setup.ts
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
```

## Test Coverage Goals

| Category | Target | Notes |
|----------|--------|-------|
| Utilities | 90%+ | Critical for app logic |
| Custom Hooks | 85%+ | Core to component behavior |
| Components | 80%+ | Focus on behavior |
| Pages | 75%+ | Integration tested |
| Services | 90%+ | API integration critical |

## Testing Best Practices Checklist

- [ ] Tests describe user behavior, not implementation
- [ ] Use `screen` queries instead of `container`
- [ ] Prefer accessible queries (role, label, text)
- [ ] Avoid testing internals or component state directly
- [ ] Mock external dependencies (API, localStorage, etc.)
- [ ] Test error states and edge cases
- [ ] Use meaningful test descriptions
- [ ] Clean up after tests (jest.clearAllMocks)
- [ ] No snapshot tests (use specific assertions)
- [ ] Test user interactions with userEvent, not fireEvent
- [ ] Async operations properly awaited
- [ ] Coverage reports tracked and maintained

## Useful Testing Queries

```typescript
// ✅ Best practices in order of preference
screen.getByRole('button', { name: /delete/i })    // Accessible
screen.getByLabelText('Username')                   // Accessible
screen.getByPlaceholderText('Enter name')          // Accessible
screen.getByText('Submit')                         // Accessible
screen.getByTestId('form-submit')                  // Last resort
```

## Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
