import { useEffect, useState } from "react";
import "./Intro.css";

function Intro({ onComplete }) {
  const [phase, setPhase] = useState("play");

  useEffect(() => {
    if (phase === "loading") {
      const loadingTimer = setTimeout(() => {
        setPhase("mission");
      }, 1400);

      return () => clearTimeout(loadingTimer);
    }

    if (phase === "mission") {
  const timer = setTimeout(() => {
    setPhase("hero");
    onComplete?.();
  }, 3500);

  return () => clearTimeout(timer);
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
  className="playButton"
  type="button"
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
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} />
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