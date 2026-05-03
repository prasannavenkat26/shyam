import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { AuthState, User, LoginCredentials, SignupData } from '../types';

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'HYDRATE'; payload: { user: User; token: string } };

type MockUser = User & { password: string };

const getStoredMockUsers = (): MockUser[] => {
  try {
    return JSON.parse(localStorage.getItem('mock_users') || '[]');
  } catch {
    return [];
  }
};

const saveStoredMockUsers = (users: MockUser[]) => {
  localStorage.setItem('mock_users', JSON.stringify(users));
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return { ...state, loading: false };
    case 'LOGOUT':
      return initialState;
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'HYDRATE':
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [error, setError] = React.useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        dispatch({
          type: 'HYDRATE',
          payload: {
            token: storedToken,
            user: JSON.parse(storedUser),
          },
        });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      setError(null);

      let user: User;
      let token: string;

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        user = data.user as User;
        token = data.token as string;
      } catch {
        const users = getStoredMockUsers();
        const matched = users.find(
          (storedUser) =>
            storedUser.email.toLowerCase() === credentials.email.toLowerCase() &&
            storedUser.password === credentials.password
        );

        if (!matched) {
          throw new Error('Invalid credentials');
        }

        user = {
          id: matched.id,
          email: matched.email,
          firstName: matched.firstName,
          lastName: matched.lastName,
          phone: matched.phone,
          avatar: matched.avatar,
          role: matched.role,
          address: matched.address,
          city: matched.city,
          state: matched.state,
          pincode: matched.pincode,
          coordinates: matched.coordinates,
          rewardPoints: matched.rewardPoints,
          carbonOffset: matched.carbonOffset,
          createdAt: matched.createdAt,
          updatedAt: matched.updatedAt,
        } as User;
        token = 'mock_token_' + Date.now();
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: message,
      });
      throw err;
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      setError(null);

      let user: User;
      let token: string;

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        const result = await response.json();
        user = result.user as User;
        token = result.token as string;
      } catch {
        const users = getStoredMockUsers();
        if (users.some((existing) => existing.email.toLowerCase() === data.email.toLowerCase())) {
          throw new Error('Email is already registered');
        }

        const newUser: MockUser = {
          id: 'mock_' + Date.now(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || '',
          avatar: '',
          role: data.role,
          address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            latitude: 0,
            longitude: 0,
          },
          city: '',
          state: '',
          pincode: '',
          coordinates: { latitude: 0, longitude: 0 },
          rewardPoints: 0,
          carbonOffset: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          password: data.password,
        };

        users.push(newUser);
        saveStoredMockUsers(users);

        user = {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          avatar: newUser.avatar,
          role: newUser.role,
          address: newUser.address,
          city: newUser.city,
          state: newUser.state,
          pincode: newUser.pincode,
          coordinates: newUser.coordinates,
          rewardPoints: newUser.rewardPoints,
          carbonOffset: newUser.carbonOffset,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        } as User;
        token = 'mock_token_' + Date.now();
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: message,
      });
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    setError(null);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  }, []);

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    updateUser,
    isLoading: state.loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
