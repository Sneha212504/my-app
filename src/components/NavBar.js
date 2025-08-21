import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

function Link({ to, children }) {
  const active = useMemo(() => (window.location.hash.replace('#', '') || '/') === to, [to]);
  return (
    <a href={`#${to}`} className={active ? 'nav-link active' : 'nav-link'}>{children}</a>
  );
}

export default function NavBar() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="brand">
        <a href="#/" className="brand-link">HH308</a>
      </div>
      <nav className="nav">
        <Link to="/education">Learn</Link>
        <Link to="/locator">Locator</Link>
        <Link to="/report">Report</Link>
        <Link to="/telemedicine">Telemedicine</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>
      <div className="auth">
        {currentUser ? (
          <div className="user-menu">
            <span className="user-email">{currentUser.email || currentUser.name || 'User'}</span>
            <button className="btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <a className="btn" href="#/login">Login</a>
            <a className="btn secondary" href="#/register">Register</a>
          </div>
        )}
      </div>
    </header>
  );
}


