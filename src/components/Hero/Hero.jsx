import { useEffect, useState } from "react";

import "./Hero.css";
import GlobalTopBar from "../GlobalTopBar/GlobalTopBar";

const HERO_ANIMATION_STORAGE_KEY =
  "nutrileveling-hero-animation-seen";

function Hero({
  onOpenQuest,
  onOpenAbout,
  onOpenLearn,
  onOpenProjects,
  onOpenContact,
  onRevealWelcome,
}) {
  const [shouldAnimateHero] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return !window.sessionStorage.getItem(
      HERO_ANIMATION_STORAGE_KEY
    );
  });

  const [hideScrollIndicator, setHideScrollIndicator] =
    useState(false);

  useEffect(() => {
    window.sessionStorage.setItem(
      HERO_ANIMATION_STORAGE_KEY,
      "true"
    );
  }, []);

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

  const handleNavigation = (action) => {
    switch (action) {
      case "home":
        scrollToSection("home");
        break;

      case "about":
        onOpenAbout?.();
        break;

      case "learn":
        onOpenLearn?.();
        break;

      case "projects":
        onOpenProjects?.();
        break;

      case "quest":
        onOpenQuest?.();
        break;

      case "contact":
        onOpenContact?.();
        break;

      default:
        break;
    }
  };

  return (
    <section
      className={`hero ${
        shouldAnimateHero
          ? ""
          : "heroNoEntrance"
      }`}
      id="home"
    >
      <video
  className="heroBackgroundVideo"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-hidden="true"
>
  <source src="/assets/hero.mp4" type="video/mp4" />
</video>

<div className="heroVideoOverlay" aria-hidden="true" />

      <div
        className="heroAmbientGlow"
        aria-hidden="true"
      />

      <GlobalTopBar
        currentPage="home"
        onNavigate={handleNavigation}
      />

      <div className="heroContent">
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
  onClick={onRevealWelcome}
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
  onClick={onRevealWelcome}
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