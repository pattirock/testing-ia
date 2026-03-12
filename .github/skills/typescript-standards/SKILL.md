---
name: typescript-standards
description: "Use when: setting up TypeScript configurations, defining types, creating interfaces, avoiding type issues, or establishing strict type safety. Provides comprehensive TypeScript best practices for the testing-ia project."
---

# TypeScript Standards for testing-ia

Guide for implementing strict TypeScript practices ensuring type safety across the React frontend.

## Strict Mode Configuration

Enable in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Type Definition Best Practices

### Defining Component Props

```typescript
// ✅ Good: Clear interface with optional properties
interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

### Discriminated Unions for Complex States

```typescript
// ✅ Good: Type-safe state management
type UserState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: User }
  | { status: 'error'; error: Error };

function useUser(): UserState {
  const [state, setState] = useState<UserState>({ status: 'idle' });
  
  // Discriminated union ensures type safety
  if (state.status === 'success') {
    console.log(state.user.name); // ✅ user is available
  }
  
  // ❌ This would be a TypeScript error
  // console.log(state.user.name); // Error: user may not exist
}
```

### Avoiding `any` Type

```typescript
// ❌ Avoid
const processData = (data: any): any => {
  return data.value * 2;
};

// ✅ Use `unknown` with proper narrowing
const processData = (data: unknown): number => {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    const typedData = data as { value: number };
    return typedData.value * 2;
  }
  throw new Error('Invalid data format');
};

// ✅ Better: Use type guards
const isDataWithValue = (data: unknown): data is { value: number } => {
  return typeof data === 'object' && data !== null && 'value' in data;
};

const processData = (data: unknown): number => {
  if (isDataWithValue(data)) {
    return data.value * 2;
  }
  throw new Error('Invalid data format');
};
```

## Generic Components

```typescript
// ✅ Reusable generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
}

export const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items found'
}: ListProps<T>): React.ReactElement => {
  if (items.length === 0) {
    return <div className="list--empty">{emptyMessage}</div>;
  }
  
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

// ✅ Usage with type inference
interface User {
  id: string;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>
```

## Type Organization

### Directory Structure

```
src/
├── types/
│   ├── index.ts              # Export all types
│   ├── api.types.ts          # API response types
│   ├── domain.types.ts       # Business domain types
│   └── ui.types.ts           # UI-specific types
├── components/
│   ├── UserCard.tsx
│   └── UserCard.types.ts     # Component-specific types (optional)
```

### Exporting Types

```typescript
// types/index.ts
export * from './domain.types';
export * from './api.types';
export * from './ui.types';

// In components, import from types
import type { User, ApiResponse } from '@/types';
```

## Utility Types

```typescript
// ✅ Extract prop types from component
const MyComponent: React.FC<{ name: string; age: number }> = ({ name, age }) => (
  <div>{name} - {age}</div>
);

type MyComponentProps = React.ComponentProps<typeof MyComponent>;

// ✅ Omit properties
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UserWithoutPassword = Omit<User, 'password'>;

// ✅ Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// ✅ Partial for optional properties
type UserUpdate = Partial<User>;

// ✅ Record for key-value mappings
type UserRoles = Record<'admin' | 'user' | 'guest', boolean>;

// ✅ Readonly for immutability
type ReadonlyUser = Readonly<User>;
```

## Function Types

```typescript
// ✅ Clear function type definition
type EventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
type AsyncCallback<T> = (data: T) => Promise<void>;

export const AsyncButton: React.FC<{
  onClick: AsyncCallback<string>;
}> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick('clicked');
    } finally {
      setIsLoading(false);
    }
  };
  
  return <button onClick={handleClick} disabled={isLoading}>Click me</button>;
};
```

## Const Assertions

```typescript
// ✅ Use as const for literal types
const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

type Status = typeof STATUS[keyof typeof STATUS]; // 'pending' | 'success' | 'error'

// Without as const, types would be string (too broad)
```

## Satisfies Operator (TypeScript 4.9+)

```typescript
// ✅ Validate without narrowing
const config = {
  api: {
    timeout: 5000,
    retries: 3
  },
  features: {
    analytics: true,
    notifications: false
  }
} satisfies {
  api: { timeout: number; retries: number };
  features: Record<string, boolean>;
};

// config maintains its literal type
const { timeout } = config.api; // timeout is 5000, not number
```

## Common Pitfalls to Avoid

| ❌ Avoid | ✅ Use |
|---------|--------|
| `any` | `unknown` with type guards |
| Implicit `any` | Explicit type annotations |
| `||` for defaults | Nullish coalescing `??` |
| `object` type | Specific interface/type |
| Loose equality `==` | Strict equality `===` |
| Mutable arrays in state | Create new array with spread |
| Function params `any[]` | Typed tuple or interface |
| Untyped event handlers | `React.MouseEvent<T>` |

## TypeScript Configuration References

- [Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [No Implicit Any](https://www.typescriptlang.org/tsconfig#noImplicitAny)
- [Type Checking JS](https://www.typescriptlang.org/tsconfig#allowJs)
