import { useEffect, useState } from "react";
import "./Intro.css";

function Intro({ onComplete }) {
  const [phase, setPhase] = useState("play");

  useEffect(() => {
    if (phase === "loading") {
      const loadingTimer = window.setTimeout(() => {
        setPhase("mission");
      }, 1400);

      return () => window.clearTimeout(loadingTimer);
    }

    if (phase === "mission") {
      const missionTimer = window.setTimeout(() => {
        setPhase("hero");
        onComplete?.();
      }, 3500);

      return () => window.clearTimeout(missionTimer);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    document.body.style.overflow =
      phase === "hero" ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  const handleStart = () => {
    setPhase("loading");
  };

  return (
    <section className="intro">
      {phase === "play" && (
        <>
          <div className="pixelField" aria-hidden="true">
            <span className="pixelLayer pixelLayerOne" />
            <span className="pixelLayer pixelLayerTwo" />
            <span className="pixelLayer pixelLayerThree" />
          </div>

          <button
            type="button"
            className="playButton"
            onClick={handleStart}
          >
            <span className="playSelector" aria-hidden="true" />
            <span>PRESS START</span>
          </button>
        </>
      )}

      {phase === "loading" && (
        <div className="loadingScreen">
          <div className="pixelSpinner" aria-label="Loading">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      )}

      {phase === "mission" && (
        <div className="missionScreen">
          <div className="missionLine" />

<span className="missionLabel">
  MISSION
</span>

<h2>OPTIMIZE</h2>
<h2>PLAYER PERFORMANCE</h2>

<div className="missionLine" />
        </div>
      )}
    </section>
  );
}

export default Intro;