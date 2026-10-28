import { useCallback, useEffect, useRef, useState } from 'react'
import { places, memories } from '../data/gallery'
import { destinations } from '../data/destinations'

const PLACE_DIR = '/gallery/places/'
const MEMORY_DIR = '/gallery/memories/'
const memoryTypes = ['Industrial Visit', 'Educational Tour', 'Tourism']
const tilt = [-2.2, 1.6, -1, 2.4, -1.8, 0.9]

export default function Gallery() {
  const [mode, setMode] = useState('places')
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const [loaded, setLoaded] = useState({})
  const [failed, setFailed] = useState({})
  const touchX = useRef(null)

  const stateName = (id) => destinations.find((d) => d.id === id)?.name || ''

  const all =
    mode === 'places'
      ? places.map((p) => ({ ...p, src: PLACE_DIR + p.file, meta: stateName(p.place) }))
      : memories.map((m) => ({
          ...m,
          src: MEMORY_DIR + m.file,
          meta: [m.college, m.place, m.year].filter(Boolean).join(' · '),
        }))

  const key = mode === 'places' ? 'place' : 'type'
  const chips =
    mode === 'places'
      ? destinations.map((d) => ({ id: d.id, name: d.name }))
      : memoryTypes.map((t) => ({ id: t, name: t }))

  const items = filter === 'all' ? all : all.filter((g) => g[key] === filter)
  const count = (id) => (id === 'all' ? all.length : all.filter((g) => g[key] === id).length)
  const tabs = [{ id: 'all', name: 'All' }, ...chips].filter((t) => count(t.id) > 0)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, step])

  const switchMode = (m) => {
    setMode(m)
    setFilter('all')
    setActive(null)
  }
  const pick = (id) => {
    setFilter(id)
    setActive(null)
  }

  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const photo = (g) =>
    failed[g.src] ? (
      <span className="gfallback">
        <svg viewBox="0 0 64 40" aria-hidden="true">
          <path d="M0 40 L18 14 L28 26 L40 6 L64 40Z" />
        </svg>
        <b>{g.caption}</b>
      </span>
    ) : (
      <img
        src={g.src}
        alt={g.caption}
        loading="lazy"
        onLoad={() => setLoaded((s) => ({ ...s, [g.src]: true }))}
        onError={() => setFailed((s) => ({ ...s, [g.src]: true }))}
      />
    )

  const cur = active !== null ? items[active] : null

  return (
    <section id="gallery" className="section section--sand gallery">
      <div className="container">
        <div className="head reveal">
          <p className="eyebrow">Our gallery</p>
          <h2>Places we go, memories we make</h2>
          <p className="gallery__intro">
            Explore the destinations on our routes, and the moments from the trips we have planned.
          </p>
        </div>

        <div className="gswitch" role="tablist" aria-label="Gallery type">
          <button className={mode === 'places' ? 'active' : ''} onClick={() => switchMode('places')}>
            Places <small>{places.length}</small>
          </button>
          <button className={mode === 'memories' ? 'active' : ''} onClick={() => switchMode('memories')}>
            Memories <small>{memories.length}</small>
          </button>
        </div>

        <div className="filters">
          {tabs.map((t) => (
            <button key={t.id} className={filter === t.id ? 'active' : ''} onClick={() => pick(t.id)}>
              {t.name} <small>{count(t.id)}</small>
            </button>
          ))}
        </div>

        {items.length === 0 && <p className="gempty">Photos coming soon.</p>}

        {mode === 'places' ? (
          <div className="ggrid" key="places">
            {items.map((g, i) => (
              <button
                key={g.src}
                type="button"
                className={`gitem ${filter === 'all' ? g.size || '' : ''} ${loaded[g.src] ? 'loaded' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Open photo: ${g.caption}`}
              >
                {photo(g)}
                <span className="gitem__cap">
                  <em>{g.meta}</em>
                  {g.caption}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mgrid" key="memories">
            {items.map((g, i) => (
              <button
                key={g.src}
                type="button"
                className={`polaroid ${loaded[g.src] ? 'loaded' : ''}`}
                style={{ '--r': `${tilt[i % tilt.length]}deg` }}
                onClick={() => setActive(i)}
                aria-label={`Open photo: ${g.caption}`}
              >
                <span className="polaroid__img">{photo(g)}</span>
                <span className="polaroid__cap">
                  <i>{g.type}</i>
                  <strong>{g.caption}</strong>
                  <small>{g.meta}</small>
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="gallery__foot">
          <p>
            {mode === 'places'
              ? 'Want these places on your college trip?'
              : 'Want memories like these for your students?'}
          </p>
          <a href="#contact" className="btn btn--primary">Plan Our Trip</a>
        </div>
      </div>

      {cur && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <button className="lb__close" onClick={close} aria-label="Close">✕</button>
          <button className="lb__nav lb__prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous photo">‹</button>

          <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
            {failed[cur.src] ? (
              <div className="lb__missing">{cur.caption}</div>
            ) : (
              <img src={cur.src} alt={cur.caption} />
            )}
            <figcaption>
              <strong>{cur.caption}</strong>
              <span>{cur.meta} · {active + 1} / {items.length}</span>
            </figcaption>
          </figure>

          <button className="lb__nav lb__next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next photo">›</button>
        </div>
      )}
    </section>
  )
}