const campaigns = [
  { id: 'immu1', title: 'Immunization Drive - Ward 12', date: 'Sat 10:00', location: 'Community Hall', type: 'Immunization' },
  { id: 'check2', title: 'Free Health Checkup', date: 'Sun 9:00', location: 'Primary Health Center', type: 'General' },
  { id: 'mental3', title: 'Mental Health Camp', date: 'Fri 5:00', location: 'Town Library', type: 'Mental Health' },
  { id: 'blood4', title: 'Blood Donation Camp', date: 'Wed 11:00', location: 'City Blood Center', type: 'Blood Donation' },
];

export default function Campaigns() {
  return (
    <section>
      <h2>Health Campaign & Program Tracker</h2>
      <ul className="list">
        {campaigns.map((c) => (
          <li key={c.id} className="card">
            <div className="tag">{c.type}</div>
            <div className="title">{c.title}</div>
            <div className="muted">{c.date} • {c.location}</div>
            <div className="row">
              <a className="btn" href="#/locator">Locate</a>
              <a className="btn secondary" href="#/feedback">I will attend</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


