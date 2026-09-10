import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

import "./Contact.css";
import contactPhoto from "./assets/contact-photo.png";

import discoveryFruit from "./assets/services/discovery.png";
import teamsFruit from "./assets/services/teams.png";
import nutritionFruit from "./assets/services/nutrition.png";

import GlobalTopBar from "../../components/GlobalTopBar/GlobalTopBar";

const FORMSPREE_FORM_ID = "mwvgjrwr";

const services = [
  {
    id: "discovery",
    title: "Discovery Call",
    accent: "#f27d1e",
    duration: "20 MIN",
    price: "FREE",
    image: discoveryFruit,
    description:
      "Not sure what kind of support you need? This free introductory call is an opportunity to tell me about yourself, your goals, and what you're looking to improve.",
    details:
      "We'll briefly discuss your current situation, where NutriLeveling may be able to help, and what our next steps could be. No full nutrition assessment or personalized plan is provided during this call.",
    bookingUrl:
      "https://nutrileveling.setmore.com/services/3ecc53d5-bc31-4b8c-83ca-371de952f3dc",
    bookingLabel: "BOOK DISCOVERY CALL",
  },
  {
    id: "teams",
    title: "Teams, Workshops & Collaborations",
    accent: "#95b120",
    duration: "30 MIN",
    price: "FREE",
    image: teamsFruit,
    description:
      "For esports teams, clubs, organizations, schools, researchers, brands, and professionals interested in working with NutriLeveling.",
    details:
      "If you're looking for a workshop, educational session, team nutrition support, collaboration, or another project, this call gives us the opportunity to discuss your needs and objectives, and explore ways we can work together.",
    bookingUrl:
      "https://nutrileveling.setmore.com/services/e708c968-b4b1-40b1-8138-ff6e0e50699d",
    bookingLabel: "BOOK COLLABORATION CALL",
  },
  {
    id: "nutrition",
    title: "Nutrition Level-Up Session",
    accent: "#f6474b",
    duration: "45 MIN",
    price: "500 KR",
    image: nutritionFruit,
    description:
      "A personalized nutrition consultation for gamers and esports athletes looking to support their health and performance.",
    details:
      "We'll discuss your current nutrition, lifestyle, gaming or training demands, goals, and the areas where you may need support. From there, we'll identify practical strategies tailored to your individual needs. Feel free to bring questions and we'll build your game plan from there.",
    bookingUrl:
      "https://nutrileveling.setmore.com/services/b790a2c5-df3c-4b0c-b874-04c9a54af38c",
    bookingLabel: "BOOK SESSION",
  },
];

export default function Contact({
  onNavigate,
  currentPage,
}) {
  const [state, handleSubmit, reset] =
    useForm(FORMSPREE_FORM_ID);

  const [openService, setOpenService] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    if (!state.succeeded) return;

    formRef.current?.reset();

    const timer = setTimeout(() => {
      reset();
    }, 4000);

    return () => clearTimeout(timer);
  }, [state.succeeded, reset]);

  const handleServiceToggle = (serviceId) => {
    setOpenService((current) =>
      current === serviceId ? null : serviceId
    );
  };

  return (
<main
  className="contactPage"
  style={{
    "--contact-background-image": `url(${contactPhoto})`,
  }}
>
      <GlobalTopBar
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="contactContent">
        <header className="contactPageHeader">
          <span className="contactPageEyebrow">
            LET'S WORK TOGETHER
          </span>

          <h1>CONTACT</h1>

          <h2>
            Have a question, want to work together,
            or ready to book a service?
          </h2>
        </header>

        <div className="contactColumns">
          <section className="contactColumn contactMessageColumn">
            <div className="contactColumnHeader">
              <span className="contactColumnNumber">
                01
              </span>

              <div>
                <h3>CONTACT</h3>

                <p>
Have a question, idea, or collaboration? Message me.
                </p>
              </div>
            </div>

            <form
              ref={formRef}
              className="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="contactField">
                <label htmlFor="contact-name">
                  Full Name
                </label>

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
                <label htmlFor="contact-email">
                  Email Address
                </label>

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
                <label htmlFor="contact-subject">
                  Subject
                </label>

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
                <label htmlFor="contact-message">
                  Message
                </label>

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
                  Thanks for reaching out. I'll be in
                  touch as soon as possible!
                </p>
              ) : (
                <p className="contactReplyTime">
                  I'll usually get back to you within
                  1–2 business days.
                </p>
              )}

              {state.errors?.getFormErrors().length > 0 && (
                <p
                  className="contactStatus contactStatusError"
                  role="alert"
                >
                  Something went wrong. Please check the
                  fields and try again.
                </p>
              )}
            </form>
          </section>

          <section className="contactColumn contactServicesColumn">
            <div className="contactColumnHeader">
              <span className="contactColumnNumber">
                02
              </span>

              <div>
                <h3>SERVICES</h3>

                <p>
                  Choose the option that best fits what
                  you're looking for.
                </p>
              </div>
            </div>

            <div className="contactServices">
              {services.map((service) => {
                const isOpen =
                  openService === service.id;

                return (
<article
  className={`contactService ${
    isOpen
      ? "contactServiceOpen"
      : ""
  }`}
  key={service.id}
  style={{
    "--service-accent": service.accent,
  }}
>
                    <button
                      type="button"
                      className="contactServiceTrigger"
                      onClick={() =>
                        handleServiceToggle(service.id)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                    >
                      <span className="contactServiceFruit">
                        <img
                          src={service.image}
                          alt=""
                          aria-hidden="true"
                        />
                      </span>

                      <span className="contactServiceMain">
                        <span className="contactServiceTitle">
                          {service.title}
                        </span>

                        <span className="contactServiceMeta">
                          <span>{service.duration}</span>
                          <span aria-hidden="true">
                            ·
                          </span>
                          <span>{service.price}</span>
                        </span>
                      </span>

                      <span
                        className="contactServiceArrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </button>

                    <div
                      id={`service-panel-${service.id}`}
                      className="contactServicePanel"
                      hidden={!isOpen}
                    >
                      <div className="contactServiceDetails">
                        <p>{service.description}</p>

                        <p>{service.details}</p>
                      </div>

                      <a
                        className="contactServiceBooking"
                        href={service.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          {service.bookingLabel}
                        </span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}