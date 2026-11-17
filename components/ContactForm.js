"use client";

import { useState } from "react";

// The contact form. It is NOT connected yet: set `endpoint` to the address
// that should receive submissions (a CMS form handler or an API route).
// Until then it tells the visitor plainly that nothing was sent.
const endpoint = "";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!endpoint) {
      setStatus("Nothing was sent: this form is not connected yet. Please email us instead.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form) });
      setStatus(response.ok ? "Thank you. Your message has been sent." : "That did not go through. Please try again in a minute.");
      if (response.ok) form.reset();
    } catch {
      setStatus("That did not go through. Please try again in a minute.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">Full name</label>
        <input className="input" id="contact-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email address</label>
        <input className="input" id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="contact-organisation">Organisation</label>
        <input className="input" id="contact-organisation" name="organisation" type="text" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="contact-topic">Reason for writing</label>
        <select className="select" id="contact-topic" name="topic" defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Research collaboration</option>
          <option>Events and speaking</option>
          <option>Media</option>
          <option>Careers and internships</option>
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="contact-message">Message</label>
        <textarea className="textarea" id="contact-message" name="message" required />
      </div>
      <div className="form__footer">
        <button className="btn btn--primary" type="submit" disabled={busy} aria-busy={busy}>
          Send message
        </button>
        <p className="form__status" role="status">
          {status}
        </p>
      </div>
    </form>
  );
}
