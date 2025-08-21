const modules = [
  { id: 'nutrition', title: 'Nutrition Basics', points: ['Balanced diet', 'Micronutrients', 'Hydration tips', 'Affordable healthy choices'] },
  { id: 'hygiene', title: 'Hygiene & Prevention', points: ['Handwashing steps', 'Safe water', 'Sanitation', 'Vaccination awareness'] },
  { id: 'mental', title: 'Mental Well‑Being', points: ['Stress management', 'Sleep hygiene', 'Mindfulness basics', 'When to seek help'] },
  { id: 'reproductive', title: 'Reproductive Health', points: ['Menstrual health', 'Family planning', 'Prenatal care', 'Postnatal care'] },
  { id: 'exercise', title: 'Exercise & Mobility', points: ['Home workouts', 'Stretching', 'Posture', 'Low‑impact routines'] },
];

export default function Education() {
  return (
    <section>
      <h2>Preventive Healthcare & Wellness Education</h2>
      <div className="grid two">
        {modules.map((m) => (
          <article key={m.id} className="card">
            <h3>{m.title}</h3>
            <ul className="bullets">
              {m.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <div className="row">
              <a className="btn" href={`#/education/${m.id}`}>Read</a>
              <a className="btn secondary" href="#/feedback">Give Feedback</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


