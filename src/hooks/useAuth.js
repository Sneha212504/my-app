import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CURRENT_USER_KEY = 'hh308_current_user_v1';
const USERS_KEY = 'hh308_users_v1';

const AuthContext = createContext({
  currentUser: null,
  login: (_email, _password) => null,
  register: (_payload) => null,
  logout: () => {},
});

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (_) {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(CURRENT_USER_KEY);
      if (rawUser) setCurrentUser(JSON.parse(rawUser));
    } catch (_) {
      // ignore
    }
  }, []);

  const persistUser = useCallback((user) => {
    setCurrentUser(user || null);
    try {
      if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(CURRENT_USER_KEY);
    } catch (_) {
      // ignore
    }
  }, []);

  const login = useCallback((email, password) => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email);
    if (!found || found.password !== password) {
      throw new Error('Invalid email or password');
    }
    const { password: _omitted, ...safeUser } = found;
    persistUser(safeUser);
    return safeUser;
  }, [persistUser]);

  const register = useCallback((payload) => {
    const users = loadUsers();
    const exists = users.some((u) => u.email === payload.email);
    if (exists) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: Date.now().toString(),
      name: payload.name,
      email: payload.email,
      password: payload.password,
      address: payload.address || '',
      coords: payload.coords || null,
    };
    users.push(newUser);
    saveUsers(users);
    const { password: _hidden, ...safeUser } = newUser;
    persistUser(safeUser);
    return safeUser;
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const value = useMemo(() => ({ currentUser, login, register, logout }), [currentUser, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


