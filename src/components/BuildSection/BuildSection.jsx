import { useEffect, useRef, useState } from "react";

import "./BuildSection.css";

import nutrition from "../../assets/images/nutrition.png";
import science from "../../assets/images/science.png";
import wellbeing from "../../assets/images/wellbeing.png";
import unfiltered from "../../assets/images/unfiltered.png";

const builds = [
  {
    title: "Nutrition XP",
    image: nutrition,
    description:
      "Evidence-based nutrition and hydration strategies designed to support gaming performance, recovery, and long-term consistency.",
  },
  {
    title: "Science Lab",
    image: science,
    description:
      "Research-driven content on supplements, biomarkers, and performance science, translated into practical insights for esports.",
  },
  {
    title: "Wellbeing Buffs",
    image: wellbeing,
    description:
      "Healthy habits and lifestyle practices that help gamers improve recovery, resilience, and sustainable performance.",
  },
  {
    title: "UNFILTERED",
    image: unfiltered,
    description:
      "Straightforward commentary on esports nutrition and performance, focused on clarity, honesty, and real-world relevance.",
  },
];

export default function BuildSection({ onOpenQuest }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.unobserve(section);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance-framework"
      className={`buildSection ${
        isVisible ? "buildSection--visible" : ""
      }`}
    >
      <div className="buildSectionInner">
        <div className="buildHeading">
          <span className="buildEyebrow">
            NUTRILEVELING FRAMEWORK
          </span>

          <h2>THE PILLARS BEHIND THE PLAYER</h2>

          <p className="buildSubtitle">
            How NutriLeveling approaches esports nutrition, recovery, performance.
          </p>
        </div>

        <div className="buildGrid">
          {builds.map((build) => (
            <article
              className="buildCard"
              key={build.title}
            >
              <img
                src={build.image}
                alt={build.title}
              />

              <div className="buildOverlay">
                <h3>{build.title}</h3>

                <p>{build.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="terminalBridge">
          <div className="terminalBridgeIntro">
            <span className="terminalBridgeLine" />

            <p>
              YOUR PLAYER BUILD GOES BEYOND MECHANICS
            </p>

            <span className="terminalBridgeLine" />
          </div>

          <div className="terminalAccess">
            <div className="terminalAccessStatus">
              <span className="terminalAccessDot" />

              <span>PLAYER BUILD UNIDENTIFIED</span>
            </div>

            <button
              type="button"
              className="terminalAccessButton"
              onClick={() => onOpenQuest?.()}
            >
              <span>IDENTIFY MY BUILD</span>

              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}