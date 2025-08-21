import { useState } from 'react';

export default function Telemedicine() {
  const [symptoms, setSymptoms] = useState('');
  const [mode, setMode] = useState('chat');
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const req = { id: Date.now().toString(), symptoms, mode, slot };
    const list = JSON.parse(localStorage.getItem('hh308_telemedicine') || '[]');
    list.unshift(req);
    localStorage.setItem('hh308_telemedicine', JSON.stringify(list));
    setBooked(true);
  }

  if (booked) {
    return (
      <section>
        <h2>Consultation booked</h2>
        <p>A verified professional will contact you at the selected time via your chosen mode.</p>
        <a className="btn" href="#/dashboard">Back to dashboard</a>
      </section>
    );
  }

  return (
    <section>
      <h2>Telemedicine & Virtual Consultation</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Preferred mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="chat">Chat</option>
            <option value="audio">Audio Call</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label>Symptoms / Concern
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={5} placeholder="Briefly describe your concern" />
        </label>
        <label>Choose a slot
          <input value={slot} onChange={(e) => setSlot(e.target.value)} placeholder="e.g., Today 6:30 PM" />
        </label>
        <button className="btn primary" type="submit">Request consultation</button>
      </form>
    </section>
  );
}


