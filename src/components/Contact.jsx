
import { useMemo, useState } from 'react'
import { destinations } from '../data/destinations'

const WHATSAPP_NUMBER = '919345641385'
const CALL_NUMBER = '+918220567432'

const types = [
  'Industrial Visit',
  'Educational Tour',
  'Strangers Trip',
]

// Fixed state list: independent of destination data.
const states = [
  'Andhra Pradesh',
  'Karnataka',
  'Kerala',
  'Tamil Nadu',
  'Telangana',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    college: '',
    type: types[0],
    state: '',
    place: '',
    people: '',
    date: '',
    note: '',
  })

  // Only show destinations belonging to the selected state.
  const placesInSelectedState = useMemo(() => {
    return destinations.filter(
      (destination) => destination.state === form.state
    )
  }, [form.state])

  // Update form fields and reset the destination when state changes.
  const change = (event) => {
    const { name, value } = event.target

    setForm((previous) => {
      if (name === 'state') {
        return {
          ...previous,
          state: value,
          place: '',
        }
      }

      return {
        ...previous,
        [name]: value,
      }
    })
  }

  // Send the enquiry to WhatsApp.
  const submit = (event) => {
    event.preventDefault()

    const lines = [
      'Hi AuraFlora Journeys! I would like to enquire about a trip.',
      '',
      `Name: ${form.name}`,
      form.college &&
        `College / organisation: ${form.college}`,
      `Trip type: ${form.type}`,
      `State: ${form.state}`,
      `Destination: ${form.place}`,
      form.people && `Travellers: ${form.people}`,
      form.date && `Preferred date: ${form.date}`,
      form.note && `Note: ${form.note}`,
    ].filter(
      (line) =>
        line !== false &&
        line !== undefined &&
        line !== ''
    )

    const message = encodeURIComponent(lines.join('\n'))

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      id="contact"
      className="section section--green"
    >
      <div className="container contact reveal">

        {/* LEFT: CONTACT INFORMATION */}
        <div className="contact__info">
          <p className="eyebrow light">Let's talk</p>

          <h2>Plan your next trip with us</h2>

          <p className="contact__lead">
            Tell us your college, group size, destination
            and preferred date. We'll reply with a custom
            itinerary and quote.
          </p>

          <div className="contact__cards">

           
            {/* WHATSAPP CONTACT */}
            <a
              className="ccard"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hi AuraFlora Journeys! 👋 I would like to enquire about your tour packages.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <span className="ccard__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
            
              <span className="ccard__copy">
                <small>Quick enquiry</small>
                <strong>WhatsApp us</strong>
              </span>
            </a>


            {/* PHONE CONTACT */}
            <a
              className="ccard"
              href={`tel:${CALL_NUMBER}`}
              aria-label="Call AuraFlora Journeys"
              title="Call us"
            >
              <span
                className="ccard__icon"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>

              <span className="ccard__copy">
                <small>Speak to our team</small>
                <strong>Call us</strong>
              </span>
            </a>

          </div>
        </div>

        {/* RIGHT: TRIP ENQUIRY FORM */}
        <form onSubmit={submit}>

          {/* NAME AND ORGANISATION */}
          <div className="contact__row">
            <input
              name="name"
              value={form.name}
              placeholder="Your name"
              autoComplete="name"
              required
              onChange={change}
            />

            <input
              name="college"
              value={form.college}
              placeholder="College / organisation"
              autoComplete="organization"
              onChange={change}
            />
          </div>

          {/* TRIP TYPE AND STATE */}
          <div className="contact__row">
            <select
              name="type"
              value={form.type}
              onChange={change}
              aria-label="Trip type"
              required
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              name="state"
              value={form.state}
              onChange={change}
              aria-label="Select South Indian state"
              required
            >
              <option value="" disabled>
                Select a state
              </option>

              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* DESTINATIONS FILTERED BY STATE */}
          <div>
            <select
              name="place"
              value={form.place}
              onChange={change}
              aria-label="Select tourist destination"
              required
              disabled={
                !form.state ||
                placesInSelectedState.length === 0
              }
            >
              <option value="" disabled>
                {!form.state
                  ? 'Select a state first'
                  : placesInSelectedState.length > 0
                    ? 'Select a tourist place'
                    : 'No destinations available'}
              </option>

              {placesInSelectedState.map((destination) => (
                <option
                  key={destination.id}
                  value={destination.name}
                >
                  {destination.name}
                </option>
              ))}
            </select>

            {form.state &&
              placesInSelectedState.length === 0 && (
                <p className="contact__hint">
                  No destinations are listed for this
                  state yet.
                </p>
              )}
          </div>

          {/* TRAVELLERS AND DATE */}
          <div className="contact__row">
            <input
              name="people"
              value={form.people}
              type="number"
              min="1"
              step="1"
              placeholder="No. of students / travellers"
              aria-label="Number of travellers"
              onChange={change}
            />

            <input
              name="date"
              value={form.date}
              type="date"
              aria-label="Preferred date"
              min={new Date().toISOString().split('T')[0]}
              onChange={change}
            />
          </div>

          {/* ADDITIONAL DETAILS */}
          <textarea
            name="note"
            value={form.note}
            rows="3"
            placeholder="Anything special? (department, budget, number of days)"
            onChange={change}
          />

          {/* FORM ACTIONS */}
          <div className="contact__actions">
            <button
              className="btn btn--light"
              type="submit"
            >
              Send on WhatsApp
            </button>

            <a
              className="btn btn--call"
              href={`tel:${CALL_NUMBER}`}
            >
              Call Enquiry
            </a>
          </div>

        </form>
      </div>
    </section>
  )
}
