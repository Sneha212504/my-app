import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Stat({ label, value }) {
  return (
    <div className="card stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const greeting = useMemo(() => {
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, [now]);

  return (
    <section>
      <h2>{greeting}, {currentUser?.name || currentUser?.email || 'Friend'} 👋</h2>
      <p>Here is a quick overview and shortcuts.</p>
      <div className="grid">
        <Stat label="Nearby Services" value="8" />
        <Stat label="Open Campaigns" value="3" />
        <Stat label="Reports Pending" value="2" />
        <Stat label="Telemedicine Slots" value="5" />
      </div>
      <div className="grid two">
        <a className="card link" href="#/locator">Find services near me →</a>
        <a className="card link" href="#/report">Report a case →</a>
        <a className="card link" href="#/telemedicine">Consult a doctor →</a>
        <a className="card link" href="#/education">Wellness education →</a>
      </div>
    </section>
  );
}


