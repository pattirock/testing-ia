---
name: api-integration
description: "Use when: integrating APIs, creating service layers, handling HTTP requests, setting up error handling, or managing data fetching. Provides patterns for robust API communication."
---

# API Integration & Services

Professional patterns for integrating backend APIs with typed, error-handled data fetching.

## Service Layer Architecture

```
src/
├── services/
│   ├── index.ts                # Export all services
│   ├── api.config.ts           # API configuration
│   ├── userService.ts          # User API endpoints
│   ├── productService.ts       # Product API endpoints
│   └── __mocks__/
│       └── userService.mock.ts # Mock for testing
├── types/
│   ├── api.types.ts            # API response types
```

## API Configuration

```typescript
// services/api.config.ts
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// ✅ Request/Response interceptor types
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

// ✅ HTTP error handler
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
```

## Base API Service

```typescript
// services/baseService.ts
import { API_CONFIG, ApiError, RequestConfig, HttpError } from './api.config';

export class BaseApiService {
  protected baseUrl = API_CONFIG.BASE_URL;
  
  /**
   * Execute HTTP request with error handling and retries
   */
  protected async request<T>(
    endpoint: string,
    options: RequestInit & RequestConfig = {}
  ): Promise<T> {
    const { headers = {}, timeout = API_CONFIG.TIMEOUT, ...restOptions } = options;
    
    const url = `${this.baseUrl}${endpoint}`;
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    const finalHeaders = {
      'Content-Type': 'application/json',
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` })
    };
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...restOptions,
        headers: finalHeaders,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new HttpError(
          response.status,
          'HTTP_ERROR',
          `HTTP ${response.status}: ${response.statusText}`
        );
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * GET request
   */
  protected get<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options
    });
  }
  
  /**
   * POST request
   */
  protected post<T>(
    endpoint: string,
    body: any,
    options?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }
  
  /**
   * PUT request
   */
  protected put<T>(
    endpoint: string,
    body: any,
    options?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options
    });
  }
  
  /**
   * DELETE request
   */
  protected delete<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options
    });
  }
  
  /**
   * Error handling
   */
  private handleError(error: any): never {
    if (error instanceof HttpError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new HttpError(0, 'NETWORK_ERROR', 'Network request failed');
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new HttpError(0, 'TIMEOUT_ERROR', 'Request timeout');
    }
    
    throw new HttpError(500, 'UNKNOWN_ERROR', error?.message || 'Unknown error');
  }
}
```

## User Service Example

```typescript
// services/userService.ts
import { BaseApiService } from './baseService';
import { User, CreateUserDto, UpdateUserDto } from '@/types';

export interface UserListResponse {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
}

export class UserService extends BaseApiService {
  /**
   * Fetch all users with pagination
   */
  async getUsers(page: number = 1, pageSize: number = 10): Promise<UserListResponse> {
    return this.get(`/api/users?page=${page}&pageSize=${pageSize}`);
  }
  
  /**
   * Fetch single user by ID
   */
  async getUser(id: string): Promise<User> {
    return this.get(`/api/users/${id}`);
  }
  
  /**
   * Create new user
   */
  async createUser(data: CreateUserDto): Promise<User> {
    return this.post('/api/users', data);
  }
  
  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.put(`/api/users/${id}`, data);
  }
  
  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    return this.delete(`/api/users/${id}`);
  }
  
  /**
   * Search users
   */
  async searchUsers(query: string): Promise<User[]> {
    return this.get(`/api/users/search?q=${encodeURIComponent(query)}`);
  }
}

// Export singleton instance
export const userService = new UserService();
```

## Custom Hook for Data Fetching

```typescript
// hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';
import { HttpError } from '@/services/api.config';

interface UseApiOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: HttpError) => void;
  refreshInterval?: number;
}

interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: HttpError | null;
  refetch: () => Promise<void>;
}

/**
 * Generic hook for API data fetching with automatic refetching
 */
export const useApi = <T,>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> => {
  const {
    enabled = true,
    onSuccess,
    onError,
    refreshInterval
  } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);
  
  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    try {
      const result = await apiCall();
      setData(result);
      setError(null);
      onSuccess?.(result);
    } catch (err) {
      const httpError = err instanceof HttpError ? err : new HttpError(
        500, 'UNKNOWN', 'An error occurred'
      );
      setError(httpError);
      onError?.(httpError);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, enabled, onSuccess, onError]);
  
  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Auto-refresh interval
  useEffect(() => {
    if (!refreshInterval) return;
    
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);
  
  return { data, isLoading, error, refetch: fetchData };
};

// ✅ Usage example
export const UserListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const { data: users, isLoading, error, refetch } = useApi(
    () => userService.getUsers(page),
    {
      onError: (error) => {
        console.error('Failed to load users:', error.message);
        // Show toast notification
      }
    }
  );
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  if (!users) return <NoData />;
  
  return (
    <div>
      <UserList items={users.items} />
      <Pagination
        current={page}
        total={users.total}
        onChange={setPage}
      />
    </div>
  );
};
```

## Error Handling in Components

```typescript
// ✅ Comprehensive error handling
interface UserDetailProps {
  userId: string;
}

export const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const { data: user, isLoading, error, refetch } = useApi(
    () => userService.getUser(userId)
  );
  
  // Handle different error types
  const getErrorMessage = (): string => {
    if (!error) return '';
    
    switch (error.code) {
      case 'NETWORK_ERROR':
        return 'Network connection failed. Please check your internet connection.';
      case 'TIMEOUT_ERROR':
        return 'Request took too long. Please try again.';
      case 'HTTP_ERROR':
        if (error.statusCode === 404) {
          return 'User not found.';
        }
        if (error.statusCode === 401) {
          return 'Unauthorized. Please log in again.';
        }
        if (error.statusCode >= 500) {
          return 'Server error. Please try again later.';
        }
        return error.message;
      default:
        return 'An unexpected error occurred.';
    }
  };
  
  if (isLoading) return <Skeleton />;
  
  if (error) {
    return (
      <ErrorAlert
        title="Error Loading User"
        message={getErrorMessage()}
        onRetry={refetch}
      />
    );
  }
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <UserCard user={user} onRefresh={refetch} />
  );
};
```

## Mock Service for Testing

```typescript
// services/__mocks__/userService.mock.ts
import { User, UserListResponse } from '../userService';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2024-01-02T00:00:00Z'
  }
];

export const mockUserService = {
  getUsers: jest.fn(async (): Promise<UserListResponse> => ({
    items: mockUsers,
    total: 2,
    page: 1,
    pageSize: 10
  })),
  
  getUser: jest.fn(async (id: string): Promise<User> => {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }),
  
  createUser: jest.fn(async (data: any): Promise<User> => ({
    ...data,
    id: '3',
    createdAt: new Date().toISOString()
  })),
  
  updateUser: jest.fn(async (id: string, data: any): Promise<User> => ({
    ...mockUsers[0],
    ...data,
    id
  })),
  
  deleteUser: jest.fn(async (): Promise<void> => {})
};

// In tests
jest.mock('@/services/userService', () => ({
  userService: mockUserService
}));
```

## API Best Practices Checklist

- [ ] Use service layer for all API calls
- [ ] Typed requests and responses
- [ ] Comprehensive error handling with specific error types
- [ ] Timeout handling for requests
- [ ] Retry logic for failed requests
- [ ] Loading and error states in UI
- [ ] Mock services for testing
- [ ] Auth token handling (Authorization header)
- [ ] Request/response logging for debugging
- [ ] Proper HTTP method usage (GET, POST, PUT, DELETE)
- [ ] URL encoding for query parameters
- [ ] Graceful degradation when API is unavailable
- [ ] User-friendly error messages

## Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [REST API Best Practices](https://restfulapi.net/)
