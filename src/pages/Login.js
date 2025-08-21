import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login({ redirectTo }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      await login(email, password);
      window.location.hash = redirectTo || '/dashboard';
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn primary" type="submit">Sign In</button>
      </form>
      <p>New here? <a href="#/register">Create an account</a></p>
    </section>
  );
}


