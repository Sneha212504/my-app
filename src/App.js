import { useEffect, useMemo, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Locator from './pages/Locator';
import Report from './pages/Report';
import Education from './pages/Education';
import Telemedicine from './pages/Telemedicine';
import Campaigns from './pages/Campaigns';
import Feedback from './pages/Feedback';
import { useAuth } from './hooks/useAuth';

function App() {
  const { currentUser } = useAuth();
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isAuthed = Boolean(currentUser);

  const content = useMemo(() => {
    switch (route) {
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      case '/dashboard':
        return isAuthed ? <Dashboard /> : <Login redirectTo="/dashboard" />;
      case '/locator':
        return isAuthed ? <Locator /> : <Login redirectTo="/locator" />;
      case '/report':
        return isAuthed ? <Report /> : <Login redirectTo="/report" />;
      case '/education':
        return <Education />;
      case '/telemedicine':
        return isAuthed ? <Telemedicine /> : <Login redirectTo="/telemedicine" />;
      case '/campaigns':
        return isAuthed ? <Campaigns /> : <Login redirectTo="/campaigns" />;
      case '/feedback':
        return <Feedback />;
      case '/':
      default:
        return <Landing />;
    }
  }, [route, isAuthed]);

  return (
    <div className="App">
      <NavBar />
      <main className="container">{content}</main>
      <footer className="footer">HH308 • Collaborative Digital Ecosystem for Inclusive Health & Well‑Being</footer>
    </div>
  );
}

export default App;

