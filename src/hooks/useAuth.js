import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'hh308_current_user_v1';
const TOKEN_KEY = 'hh308_auth_token_v1';
const BASE_URL = 'http://localhost:5000';

const AuthContext = createContext({
  currentUser: null,
  login: async (_email, _password) => {},
  register: async (_payload) => {},
  logout: () => {},
  token: null,
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(STORAGE_KEY);
      const rawToken = localStorage.getItem(TOKEN_KEY);
      if (rawUser) setCurrentUser(JSON.parse(rawUser));
      if (rawToken) setToken(rawToken);
    } catch (_) {
      // ignore
    }
  }, []);

  const persistAuth = useCallback((user, newToken) => {
    setCurrentUser(user || null);
    setToken(newToken || null);
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
      if (newToken) localStorage.setItem(TOKEN_KEY, newToken);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (_) {
      // ignore
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Invalid email or password');
    }
    const { user, token: newToken } = data;
    persistAuth(user, newToken || null);
    return user;
  }, [persistAuth]);

  const register = useCallback(async (payload) => {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        address: payload.address || ''
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Unable to create user');
    }
    const { user, token: newToken } = data;
    persistAuth(user, newToken || null);
    return user;
  }, [persistAuth]);

  const logout = useCallback(() => {
    persistAuth(null, null);
  }, [persistAuth]);

  const value = useMemo(() => ({ currentUser, login, register, logout, token }), [currentUser, login, register, logout, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


