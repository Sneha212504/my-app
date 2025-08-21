import { useState } from 'react';

export default function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { id: Date.now().toString(), rating, comment };
    const list = JSON.parse(localStorage.getItem('hh308_feedback') || '[]');
    list.unshift(payload);
    localStorage.setItem('hh308_feedback', JSON.stringify(list));
    setDone(true);
  }

  if (done) {
    return (
      <section>
        <h2>Thanks for your feedback</h2>
        <a className="btn" href="#/dashboard">Back</a>
      </section>
    );
  }

  return (
    <section>
      <h2>Feedback & Referral</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Rate your experience
          <input type="range" min="1" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))} />
        </label>
        <label>Comments / Referrals
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Share suggestions, referrals, or issues" />
        </label>
        <button className="btn primary" type="submit">Submit</button>
      </form>
      <Recent />
    </section>
  );
}

function Recent() {
  const items = JSON.parse(localStorage.getItem('hh308_feedback') || '[]');
  if (!items.length) return null;
  return (
    <div className="mt">
      <h3>Recent submissions</h3>
      <ul className="list">
        {items.map((f) => (
          <li key={f.id} className="card">
            <div className="title">Rating: {f.rating} / 5</div>
            <div>{f.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


