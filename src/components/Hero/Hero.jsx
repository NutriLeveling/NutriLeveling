import { useEffect, useState } from "react";
import "./Hero.css";

const navigationItems = [
  {
    label: "ABOUT",
    action: "about",
  },
  {
    label: "NUTRILEVELING FRAMEWORK",
    action: "performance",
  },
  {
    label: "BEGIN YOUR QUEST",
    action: "quest",
  },
  {
    label: "KNOWLEDGE HUB",
    action: "learn",
  },
  {
    label: "PROJECTS",
    action: "projects",
  },
  {
    label: "CONTACT",
    action: "contact",
  },
];

function Hero({
  onOpenQuest,
  onOpenAbout,
  onOpenLearn,
  onOpenProjects,
  onOpenContact,
  onRevealBuilds,
}) {
  const [hideScrollIndicator, setHideScrollIndicator] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideScrollIndicator(window.scrollY > 5);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);

    if (!target) {
      console.warn(
        `Section with id "${sectionId}" was not found.`
      );
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavigation = (item) => {
    switch (item.action) {
      case "about":
        onOpenAbout?.();
        break;

      case "performance":
        onRevealBuilds?.();
        break;

      case "quest":
        onOpenQuest?.();
        break;

      case "learn":
        onOpenLearn?.();
        break;

      case "projects":
        onOpenProjects?.();
        break;

      case "contact":
        onOpenContact?.();
        break;

      default:
        if (item.target) {
          scrollToSection(item.target);
        }
    }
  };

  return (
    <section className="hero" id="home">
      <div
        className="heroAmbientGlow"
        aria-hidden="true"
      />

      <div className="heroContent">
        <div className="heroNavigationFrame">
          <nav
            className="heroNavigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className="heroNavigationButton"
                style={{ "--nav-index": index }}
                onClick={() => handleNavigation(item)}
              >
                <span
                  className="heroNavigationMarker"
                  aria-hidden="true"
                />

                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="heroMain">
          <div className="heroLogoReveal">
            <img
              src="/logo.png"
              alt="NutriLeveling"
              className="heroLogo"
            />
          </div>

          <div className="heroText">
            <div className="heroTitleReveal">
              <h1 className="heroTitle">
                Esports Nutrition
                <br />

                <span className="heroSubtitle">
                  &amp; Performance Science
                </span>
              </h1>
            </div>

            <button
              type="button"
              className="heroCTA"
              onClick={() => scrollToSection("about")}
            >
              <span
                className="heroLine"
                aria-hidden="true"
              />

              <span className="heroCTAText">
                DISCOVER MORE
              </span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`scrollIndicator ${
          hideScrollIndicator
            ? "scrollIndicatorHidden"
            : ""
        }`}
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
      >
        <span className="scrollIndicatorPixel" />
        <span className="scrollIndicatorPixel" />
        <span className="scrollIndicatorPixel" />
      </button>
    </section>
  );
}

export default Hero;