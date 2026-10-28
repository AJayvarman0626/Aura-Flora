const states = ['Kerala', 'Tamil Nadu', 'Karnataka']

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__eyebrow">Industrial Visits · Educational Tours · Tourism</p>

          <h1>
            Learn beyond the classroom.
            <br />
            <em>Travel through the green.</em>
          </h1>

          <p className="hero__sub">
            AuraFlora Journeys plans company visits and memorable trips for college
            students and strangers trip across Kerala, Tamil Nadu and Karnataka. We handle every detail.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">Plan Our College Trip</a>
            <a href="#gallery" className="btn btn--outline">Explore Our Moments</a>
          </div>

          <ul className="hero__tags">
            {states.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__arch">
            <img src="/gallery/hero.jpg" alt="Students on an AuraFlora journey" />
            <span className="hero__chip">Industrial Visits</span>
          </div>
          <div className="hero__mini">
            <img src="/gallery/hero-2.jpg" alt="South India landscape" />
          </div>
        </div>
      </div>

      <svg className="hero__mountains" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 140 L0 110 L120 70 L200 95 L330 30 L430 90 L520 60 L640 110 L760 45 L880 100 L980 65 L1100 105 L1220 55 L1340 95 L1440 70 L1440 140 Z" />
      </svg>
    </section>
  )
}