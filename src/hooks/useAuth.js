import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'hh308_current_user_v1';

const AuthContext = createContext({
  currentUser: null,
  login: (_email, _password) => {},
  register: (_payload) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch (_) {
      // ignore
    }
  }, []);

  const persist = useCallback((user) => {
    setCurrentUser(user);
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
  }, []);

  const login = useCallback((email, _password) => {
    const user = { id: Date.now().toString(), email };
    persist(user);
    return user;
  }, [persist]);

  const register = useCallback((payload) => {
    const user = { id: Date.now().toString(), ...payload };
    persist(user);
    return user;
  }, [persist]);

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const value = useMemo(() => ({ currentUser, login, register, logout }), [currentUser, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


