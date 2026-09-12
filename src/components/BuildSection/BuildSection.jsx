import { useEffect, useRef, useState } from "react";

import "./BuildSection.css";

import nutrition from "../../assets/images/nutrition.webp";
import science from "../../assets/images/science.webp";
import wellbeing from "../../assets/images/wellbeing.webp";
import unfiltered from "../../assets/images/unfiltered.webp";

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

function BuildCard({
  build,
  isActive,
  onActivate,
}) {
  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <article
      className={`buildCard ${
        isActive
          ? "buildCard--active"
          : ""
      }`}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
    >
      <img
        src={build.image}
        alt={build.title}
      />

      <div className="buildOverlay">
        <div className="buildOverlayContent">
          <h3>{build.title}</h3>

          <div className="buildDescription">
            <p>{build.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BuildSection({
  onOpenQuest,
}) {
  const sectionRef = useRef(null);

const [isVisible, setIsVisible] =
    useState(() => {
        return (
            window.sessionStorage.getItem(
                "nutrileveling-framework-animation-seen"
            ) === "true"
        );
    });

  const [activeBuild, setActiveBuild] =
    useState(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
if (!entry.isIntersecting) return;

setIsVisible(true);

window.sessionStorage.setItem(
    "nutrileveling-framework-animation-seen",
    "true"
);

observer.unobserve(section);
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(section);

    return () =>
      observer.disconnect();
  }, []);

  const handleActivateBuild = (index) => {
    setActiveBuild((current) =>
      current === index
        ? null
        : index
    );
  };

  const getRowClassName = (rowIndex) => {
    const firstIndex =
      rowIndex * 2;

    const secondIndex =
      firstIndex + 1;

    if (activeBuild === firstIndex) {
      return "buildRow buildRow--active-left";
    }

    if (activeBuild === secondIndex) {
      return "buildRow buildRow--active-right";
    }

    return "buildRow";
  };

  return (
    <section
      ref={sectionRef}
      id="performance-framework"
      className={`buildSection ${
        isVisible
          ? "buildSection--visible"
          : ""
      }`}
    >
      <div className="buildSectionInner">

        <div className="buildHeading">
          <span className="buildEyebrow">
            NUTRILEVELING FRAMEWORK
          </span>

          <h2>
            THE PILLARS BEHIND THE PLAYER
          </h2>

          <p className="buildSubtitle">
            How NutriLeveling approaches esports
            nutrition, recovery, and performance.
          </p>
        </div>

        <div className="buildGrid">

          <div
            className={getRowClassName(0)}
          >
            <BuildCard
              build={builds[0]}
              isActive={
                activeBuild === 0
              }
              onActivate={() =>
                handleActivateBuild(0)
              }
            />

            <BuildCard
              build={builds[1]}
              isActive={
                activeBuild === 1
              }
              onActivate={() =>
                handleActivateBuild(1)
              }
            />
          </div>

          <div
            className={getRowClassName(1)}
          >
            <BuildCard
              build={builds[2]}
              isActive={
                activeBuild === 2
              }
              onActivate={() =>
                handleActivateBuild(2)
              }
            />

            <BuildCard
              build={builds[3]}
              isActive={
                activeBuild === 3
              }
              onActivate={() =>
                handleActivateBuild(3)
              }
            />
          </div>

        </div>

        <div className="terminalBridge">

          <div className="terminalBridgeIntro">
            <span className="terminalBridgeLine" />

            <p>
              YOUR PLAYER BUILD GOES
              BEYOND MECHANICS
            </p>

            <span className="terminalBridgeLine" />
          </div>

<div className="terminalAccess">

  <div className="terminalAccessStatus">
    <span className="terminalAccessDot" />

    <span>
      PLAYER BUILD UNIDENTIFIED
    </span>
  </div>

  <div className="terminalAccessActions">

    <button
      type="button"
      className="terminalAccessButton"
      onClick={() =>
        onOpenQuest?.()
      }
    >
      <span>
        IDENTIFY MY BUILD
      </span>

      <span aria-hidden="true">
        →
      </span>
    </button>

  </div>

</div>

        </div>

      </div>
    </section>
  );
}