import { useEffect, useMemo, useState } from 'react';

function distanceKm(a, b) {
  if (!a || !b) return Infinity;
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const x = Math.sin(dLat/2) ** 2 + Math.sin(dLon/2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const d = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  return +(R * d).toFixed(2);
}

const MOCK_SERVICES = [
  { id: 'camp-1', type: 'Blood Donation Camp', name: 'City Blood Center', lat: 22.5726, lng: 88.3639 },
  { id: 'clinic-2', type: 'Free Clinic', name: 'Hope Community Clinic', lat: 22.59, lng: 88.40 },
  { id: 'mental-3', type: 'Mental Health Support', name: 'MindCare Helpline', lat: 22.56, lng: 88.35 },
];

export default function Locator() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setError('Could not get your location'),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setError('Geolocation not supported');
    }
  }, []);

  const listed = useMemo(() => {
    return MOCK_SERVICES
      .map((s) => ({ ...s, distance: distanceKm(coords, { lat: s.lat, lng: s.lng }) }))
      .sort((a, b) => a.distance - b.distance);
  }, [coords]);

  return (
    <section>
      <h2>Nearby Health Services</h2>
      <div className="muted">Your GPS: {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Detecting...'}</div>
      {error && <div className="error">{error}</div>}
      <ul className="list">
        {listed.map((s) => (
          <li key={s.id} className="card">
            <div className="tag">{s.type}</div>
            <div className="title">{s.name}</div>
            <div className="muted">{s.distance} km away</div>
            <div className="row">
              <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`} target="_blank" rel="noreferrer">Open Map</a>
              <a className="btn secondary" href="#/report">Report/Request</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


