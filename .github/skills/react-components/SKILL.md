---
name: react-components
description: "Use when: building React components, creating component hierarchy, structuring props, or designing reusable component architecture. Provides best practices for functional components, hooks, and component composition."
---

# React Components Architecture

Professional guidelines for building well-structured, reusable React components.

## Functional Components Structure

```typescript
// ✅ Proper component structure order
export interface MyComponentProps {
  title: string;
  items: Item[];
  onSelect: (item: Item) => void;
  isLoading?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  items,
  onSelect,
  isLoading = false
}) => {
  // 1. State declarations
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // 2. Derived values (useMemo for expensive calculations)
  const selectedItem = useMemo(
    () => items.find(item => item.id === selectedId),
    [items, selectedId]
  );
  
  // 3. Effects (side effects)
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);
  
  // 4. Event handlers (useCallback to prevent unnecessary re-renders)
  const handleSelect = useCallback((item: Item) => {
    setSelectedId(item.id);
    onSelect(item);
  }, [onSelect]);
  
  // 5. Render
  return (
    <div className="component">
      <h2>{title}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ItemList items={items} onSelect={handleSelect} selected={selectedId} />
      )}
    </div>
  );
};
```

## Component Composition

### Presentational Components

```typescript
// ✅ Pure presentational component
interface ItemListProps {
  items: Item[];
  selected?: string;
  onSelect: (item: Item) => void;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  selected,
  onSelect
}) => (
  <ul className="item-list">
    {items.map(item => (
      <li
        key={item.id}
        className={`item-list__item ${selected === item.id ? 'item-list__item--selected' : ''}`}
        onClick={() => onSelect(item)}
      >
        {item.name}
      </li>
    ))}
  </ul>
);
```

### Container Components

```typescript
// ✅ Container managing state and side-effects
export const MyComponentContainer: React.FC<{ itemsUrl: string }> = ({ itemsUrl }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    fetch(itemsUrl)
      .then(res => res.json())
      .then(setItems)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [itemsUrl]);
  
  const handleSelect = useCallback((item: Item) => {
    console.log('Selected:', item);
  }, []);
  
  if (error) return <ErrorBoundary error={error} />;
  
  return (
    <MyComponent
      title="Items"
      items={items}
      onSelect={handleSelect}
      isLoading={isLoading}
    />
  );
};
```

## Hooks Usage

### Custom Hooks Best Practices

```typescript
// ✅ Well-documented custom hook
interface UseDataOptions {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches data from an API endpoint
 * @param url - The endpoint URL
 * @param options - Configuration options
 * @returns Loading state, data, error, and refetch function
 */
export const useData = <T,>(
  url: string,
  options: UseDataOptions = {}
): UseDataResult<T> => {
  const { enabled = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const result = await response.json();
      setData(result);
      setError(null);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [url, onSuccess, onError]);
  
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);
  
  return { data, isLoading, error, refetch: fetchData };
};

// ✅ Usage
export const UserList: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useData<User[]>(
    '/api/users',
    {
      onSuccess: (users) => console.log('Loaded', users.length, 'users'),
      onError: (error) => console.error('Failed to load users:', error)
    }
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

## Props Drilling Prevention

### Context API for Shared State

```typescript
// ✅ Create context for theme
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const value: ThemeContextType = {
    isDark,
    toggleTheme: () => setIsDark(prev => !prev)
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ✅ Usage: No prop drilling needed
export const UserProfile: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'dark' : 'light'}>
      User Profile
    </div>
  );
};
```

## Component Naming & File Organization

```
src/
├── components/
│   ├── common/                 # Shared across features
│   │   ├── Button.tsx
│   │   ├── Button.types.ts    # (optional)
│   │   ├── Modal.tsx
│   │   └── Modal.types.ts
│   ├── layouts/               # Page structure
│   │   ├── MainLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── layouts.types.ts
│   ├── features/              # Feature-specific
│   │   ├── UserProfile/
│   │   │   ├── UserCard.tsx
│   │   │   ├── UserForm.tsx
│   │   │   ├── useUserData.ts
│   │   │   └── index.ts
│   │   └── Products/
│   │       ├── ProductList.tsx
│   │       └── ProductCard.tsx
```

## Error Boundaries

```typescript
// ✅ Error boundary for error handling
interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught:', error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong: {this.state.error?.message}</div>;
    }
    
    return this.props.children;
  }
}
```

## Lazy Loading Components

```typescript
// ✅ Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

export const App: React.FC = () => (
  <ErrorBoundary fallback={<div>Failed to load component</div>}>
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  </ErrorBoundary>
);
```

## Component Best Practices Checklist

- [ ] Props interface defined and exported
- [ ] Component exported as named export + interface
- [ ] Hooks organized: state, effects, handlers, render
- [ ] useCallback for expensive calculations or callbacks passed to children
- [ ] useMemo for derived values
- [ ] No inline object/array literals in JSX (move to component body)
- [ ] Event handlers typed with React event types
- [ ] Default props set in destructuring
- [ ] No prop-drilling; use Context for shared state
- [ ] Error handling for async operations
- [ ] Loading states properly handled
- [ ] Accessibility considerations (ARIA, semantic HTML)
