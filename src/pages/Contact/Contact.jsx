import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

import "./Contact.css";
import contactPhoto from "./assets/contact-photo.png";

const FORMSPREE_FORM_ID = "mwvgjrwr";

export default function Contact({ onBackHome }) {
 const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID);
  const formRef = useRef(null);

useEffect(() => {
  if (!state.succeeded) return;

  formRef.current?.reset();

  const timer = setTimeout(() => {
    reset();
  }, 4000);

  return () => clearTimeout(timer);
}, [state.succeeded, reset]);

  return (
    <main
      className="contactPage"
      style={{
        backgroundImage: `url(${contactPhoto})`,
      }}
    >
      <div className="contactTopBar">
        <button
          type="button"
          className="contactBackButton"
          onClick={() => onBackHome?.()}
        >
          <span aria-hidden="true">←</span>
          <span>RETURN TO NUTRILEVELING</span>
        </button>

        <div className="contactTopRight">
          <span className="contactHeroCircle" aria-hidden="true" />
          <span>GET IN TOUCH</span>
        </div>
      </div>

      <section className="contactHero">
        <div className="contactHeroContent">
          <h1>CONTACT</h1>

<h2>
  Where{" "}
  <span className="contactHeroAccent">ideas</span>
  {" "}turn into{" "}
  <span className="contactHeroAccent">action</span>.
</h2>

          <p>
            Whether you have a question, an idea, or simply want to explore a
            potential collaboration, I'm always open to meaningful
            conversations.
          </p>
        </div>
      </section>

      <section className="contactFormSection">
        <form
          ref={formRef}
          className="contactForm"
          onSubmit={handleSubmit}
        >
          <div className="contactField">
            <label htmlFor="contact-name">Full Name</label>

            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Super Mario"
              required
            />

            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
            />
          </div>

          <div className="contactField">
            <label htmlFor="contact-email">Email Address</label>

            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="playerone@email.com"
              required
            />

            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="contactField">
            <label htmlFor="contact-subject">Subject</label>

            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder="Coaching quest / Workshop inquiry / Collaboration"
              required
            />

            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
            />
          </div>

          <div className="contactField">
            <label htmlFor="contact-message">Message</label>

            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder="Tell me a bit about your request, your goals, or how I can help."
              required
            />

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <input
            type="text"
            name="_gotcha"
            className="contactHoneypot"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <button
            className="contactSubmit"
            type="submit"
            disabled={state.submitting}
          >
            {state.submitting
              ? "Sending..."
              : state.succeeded
                ? "Message Sent!"
                : "Send Message"}
          </button>

          {state.succeeded ? (
            <p
              className="contactStatus contactStatusSuccess"
              role="status"
              aria-live="polite"
            >
              Thanks for reaching out. I'll be in touch as soon as possible!
            </p>
          ) : (
            <p className="contactReplyTime">
              I'll usually get back to you within 1–2 business days.
            </p>
          )}

{state.errors?.getFormErrors().length > 0 && (
  <p
    className="contactStatus contactStatusError"
    role="alert"
  >
    Something went wrong. Please check the fields and try again.
  </p>
)}
        </form>
      </section>
    </main>
  );
}