const pillars = [
  {
    no: '01',
    title: 'Industrial Visits',
    text: 'Factory floors, IT parks, plants and processing units. Students see how what they study works in the real world, with permissions and guides arranged by us.',
  },
  {
    no: '02',
    title: 'Strangers Trips',
    text: 'Relaxed holidays for families and groups, planned end to end: stays, transport, food and local experiences.',
  },
  {
    no: '03',
    title: 'Educational Tours',
    text: 'Department-wise and year-wise tours that mix learning stops with heritage, nature and culture, so the trip is useful and memorable.',
  },
]

const points = [
  'Company permissions arranged for you',
  'Safe, verified transport and stays',
  'A trip coordinator with your group throughout',
  'Itinerary customised for each department',
]

const states = ['Kerala', 'Tamil Nadu', 'Karnataka']

const stats = [
  { value: '5', label: 'States covered' },
  { value: '50+', label: 'Institutions served' },
  { value: '5000+', label: 'Students travelled' },
  { value: '24/7', label: 'On-trip support' },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__intro">
          <div className="about__photo reveal">
            <img src="/gallery/about.jpg" alt="Students on an AuraFlora industrial visit" />
            <div className="about__badge">
              <strong>Learn · Explore · Grow</strong>
              <span>Industrial visits &amp; tourism</span>
            </div>
          </div>

          <div className="about__text reveal">
            <p className="eyebrow">Who we are</p>
            <h2>Where learning meets the journey</h2>
            <p className="lead">
              AuraFlora Journeys plans industrial visits and educational tours for
              colleges and Strangers Trips , along with curated tourism packages across South India.
            </p>
            <p>
              We handle everything from company permissions to transport, stays,
              food and safety, so faculty can focus on the students.
            </p>

            <ul className="about__points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="about__states">
              {states.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="pillars">
          {pillars.map((p) => (
            <article key={p.no} className="pillar reveal">
              <span className="pillar__no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="stats reveal">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}