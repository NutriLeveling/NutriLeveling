import { useRef, useState } from "react";

import "./home.css";

import Intro from "../components/Intro/Intro";
import Hero from "../components/Hero/Hero";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import BuildSection from "../components/BuildSection/BuildSection";

const HOME_UNLOCK_STORAGE_KEY = "nutrileveling-home-unlocked";

function Home({
  onOpenQuest,
  onOpenAbout,
  onOpenLearn,
  onOpenProjects,
  onOpenContact,
  introFinished,
  setIntroFinished,
}) {
  const [showWelcome, setShowWelcome] = useState(() => {
    return (
      window.sessionStorage.getItem(
        HOME_UNLOCK_STORAGE_KEY
      ) === "true"
    );
  });

  const [showBuilds, setShowBuilds] = useState(() => {
    return (
      window.sessionStorage.getItem(
        HOME_UNLOCK_STORAGE_KEY
      ) === "true"
    );
  });

  const welcomeRef = useRef(null);
  const buildsRef = useRef(null);

  const handleRevealWelcome = () => {
    setShowWelcome(true);

    window.setTimeout(() => {
      welcomeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleRevealBuilds = () => {
    setShowBuilds(true);

    window.sessionStorage.setItem(
      HOME_UNLOCK_STORAGE_KEY,
      "true"
    );

    window.setTimeout(() => {
      buildsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!introFinished && (
        <Intro
          onComplete={() => {
            window.sessionStorage.setItem(
              "nutrileveling-intro-seen",
              "true"
            );

            setIntroFinished(true);
          }}
        />
      )}

      {introFinished && (
        <>
          <Hero
            onOpenQuest={onOpenQuest}
            onOpenAbout={onOpenAbout}
            onOpenLearn={onOpenLearn}
            onOpenProjects={onOpenProjects}
            onOpenContact={onOpenContact}
            onRevealWelcome={handleRevealWelcome}
          />

          {showWelcome && (
            <div ref={welcomeRef}>
              <WelcomeSection
                onRevealBuilds={handleRevealBuilds}
              />
            </div>
          )}

          {showBuilds && (
            <div
              ref={buildsRef}
              className="buildReveal show"
            >
              <BuildSection
                onOpenQuest={onOpenQuest}
              />

<footer className="homeFooter">
  <div className="homeFooterFrame">
    <div className="homeFooterTop">
      <div className="homeFooterBrand">
        <img
          src="/logo.png"
          alt="NutriLeveling"
          className="homeFooterLogo"
        />
      </div>

      <div className="homeFooterSocials">
        <a
          href="https://www.instagram.com/nutrileveling/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="homeFooterSocial"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
            />
            <circle
              cx="12"
              cy="12"
              r="4.2"
            />
            <circle
              cx="17.4"
              cy="6.7"
              r="1.1"
              className="homeFooterIconFill"
            />
          </svg>
        </a>

        <a
          href="https://www.tiktok.com/@nutrileveling"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className="homeFooterSocial"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.4 4.1c.6 2.4 2 3.9 4.8 4.1v3.1c-1.9.1-3.5-.5-4.8-1.5v6.5c0 3.5-2.4 5.7-5.5 5.7-3 0-5.2-2.1-5.2-5 0-3.1 2.5-5.2 5.8-5.2.4 0 .9 0 1.3.1v3.1a5 5 0 0 0-1.3-.2c-1.4 0-2.5.9-2.5 2.2 0 1.2.9 2 2 2 1.3 0 2.4-.9 2.4-2.7V4.1h3Z" />
          </svg>
        </a>

        <a
          href="https://www.youtube.com/@nutrileveling"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="homeFooterSocial"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="2.5"
              y="5"
              width="19"
              height="14"
              rx="4"
            />
            <path
              d="M10 9 16 12 10 15Z"
              className="homeFooterIconFill"
            />
          </svg>
        </a>
      </div>

      <button
        type="button"
        className="homeFooterBackToTop"
        onClick={handleBackToTop}
      >
        <strong>BACK TO TOP</strong>
        <span className="homeFooterArrow">↑</span>
      </button>
    </div>
    <div className="homeFooterBottom">
      <span className="homeFooterCopyright">
       © 2026 NUTRILEVELING
      </span>
    </div>
  </div>
</footer>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;