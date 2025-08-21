import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords(null),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Name, email and password are required');
      return;
    }
    try {
      await register({ name, email, password, address, coords });
      window.location.hash = '/dashboard';
    } catch (err) {
      setError(err?.message || 'Registration failed');
    }
  }

  return (
    <section>
      <h2>Create Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </label>
        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
        </label>
        <label>Address
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City" />
        </label>
        <div className="muted">GPS: {coords ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}` : 'Not available'}</div>
        {error && <div className="error">{error}</div>}
        <button className="btn primary" type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="#/login">Sign in</a></p>
    </section>
  );
}


