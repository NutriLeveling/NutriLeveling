import { useRef, useState } from "react";

import Intro from "../components/Intro/Intro";
import Hero from "../components/Hero/Hero";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import BuildSection from "../components/BuildSection/BuildSection";

function Home({
  onOpenQuest,
  onOpenAbout,
  onOpenLearn,
  onOpenProjects,
  onOpenContact,
  introFinished,
  setIntroFinished,
}) {
  const [showBuilds, setShowBuilds] = useState(false);

  const buildsRef = useRef(null);

  const handleRevealBuilds = () => {
    setShowBuilds(true);

    window.setTimeout(() => {
      buildsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      {!introFinished && (
        <Intro onComplete={() => setIntroFinished(true)} />
      )}

      {introFinished && (
        <>
          <Hero
            onOpenQuest={onOpenQuest}
            onOpenAbout={onOpenAbout}
            onOpenLearn={onOpenLearn}
            onOpenProjects={onOpenProjects}
            onOpenContact={onOpenContact}
            onRevealBuilds={handleRevealBuilds}
          />

          <WelcomeSection onRevealBuilds={handleRevealBuilds} />

          {showBuilds && (
  <div
    ref={buildsRef}
    className="buildReveal show"
  >
    <BuildSection onOpenQuest={onOpenQuest} />
  </div>
)}
        </>
      )}
    </>
  );
}

export default Home;