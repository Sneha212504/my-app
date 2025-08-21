import { useState } from 'react';

export default function Report() {
  const [type, setType] = useState('illness');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [coords, setCoords] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function captureLocation() {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { id: Date.now().toString(), type, description, urgency, coords };
    const list = JSON.parse(localStorage.getItem('hh308_reports') || '[]');
    list.unshift(payload);
    localStorage.setItem('hh308_reports', JSON.stringify(list));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section>
        <h2>Thank you</h2>
        <p>Your report has been recorded. We will notify nearby facilities if urgent.</p>
        <a className="btn" href="#/dashboard">Back to dashboard</a>
      </section>
    );
  }

  return (
    <section>
      <h2>Community Health Reporting</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Type of report
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="illness">Illness / Outbreak</option>
            <option value="injury">Injury / Accident</option>
            <option value="maternal">Maternal / Child Health</option>
            <option value="mental">Mental Health Crisis</option>
            <option value="supply">Medicine / Supply Shortage</option>
          </select>
        </label>
        <label>Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the situation, symptoms, number of people affected, etc." rows={5} />
        </label>
        <label>Urgency
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="priority">Priority</option>
            <option value="emergency">Emergency</option>
          </select>
        </label>
        <div className="row">
          <button type="button" className="btn" onClick={captureLocation}>Use my GPS</button>
          <div className="muted">{coords ? `GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'No location yet'}</div>
        </div>
        <button className="btn primary" type="submit">Submit report</button>
      </form>
      <ReportsList />
    </section>
  );
}

function ReportsList() {
  const reports = JSON.parse(localStorage.getItem('hh308_reports') || '[]');
  if (!reports.length) return null;
  return (
    <div className="mt">
      <h3>Recent reports</h3>
      <ul className="list">
        {reports.map((r) => (
          <li key={r.id} className="card">
            <div className="tag">{r.type}</div>
            <div className="muted">Urgency: {r.urgency}</div>
            {r.coords && <div className="muted">GPS: {r.coords.lat.toFixed(3)}, {r.coords.lng.toFixed(3)}</div>}
            <div>{r.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


