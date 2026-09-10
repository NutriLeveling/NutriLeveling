import { useEffect, useState } from "react";
import "./Quest.css";
import GlobalTopBar from "../../components/GlobalTopBar/GlobalTopBar";
import { heroes } from "./heroes";

const QUEST_RESULT_STORAGE_KEY =
  "nutrilevelingQuestResult";

const QuestResult = ({
  onBackHome,
  onOpenContact,
  onNavigate,
  currentPage,
}) => {
  const [questResult, setQuestResult] = useState(null);

  useEffect(() => {
    try {
      const storedResult = window.localStorage.getItem(
        QUEST_RESULT_STORAGE_KEY
      );

      if (!storedResult) {
        onNavigate?.("quest");
        return;
      }

      const parsedResult = JSON.parse(storedResult);

      if (
        !parsedResult?.result ||
        !parsedResult?.playerStats ||
        !heroes[parsedResult.result]
      ) {
        onNavigate?.("quest");
        return;
      }

      setQuestResult(parsedResult);
    } catch {
      window.localStorage.removeItem(
        QUEST_RESULT_STORAGE_KEY
      );

      onNavigate?.("quest");
    }
  }, [onNavigate]);

  if (!questResult) {
    return null;
  }

  const result = questResult.result;
  const playerStats = questResult.playerStats;
  const hero = heroes[result];

const handleRetake = () => {
  window.history.pushState(
    {
      questStarted: true,
      questRetake: true,
    },
    "",
    "#/quest"
  );

  onNavigate?.("quest");
};

  const handleReturnToMain = () => {
    onBackHome?.();
  };

  return (
    <section className="quest">
      <div
        className="questBackground resultBackground"
        aria-hidden="true"
        style={{
          "--result-accent": hero.accent,
        }}
      >
        <div className="questGlow questGlowOne" />
        <div className="questGlow questGlowTwo" />
        <div className="questGrid" />
        <div className="questNoise" />
      </div>

      <GlobalTopBar
        currentPage={currentPage}
        onNavigate={onNavigate}
        accentColor={hero.accent}
      />

      <div className="questShell">
        <div
          className="questResult"
          style={{
            "--hero-accent": hero.accent,
          }}
        >
          <header className="questResultHeroHeader">
            <span>PLAYER BUILD IDENTIFIED</span>

            <h1>{hero.name}</h1>

            <h2>{hero.tagline}</h2>

            <p>{hero.description}</p>
          </header>

          <div className="questResultBody">
            <div className="questResultProfile">
              <section className="questProfilePanel">
                <div className="questResultSectionTitle">
                  PERFORMANCE PROFILE
                </div>

                <div className="questStats">
                  {Object.entries(playerStats).map(
                    ([stat, value]) => (
                      <div
                        className="questStat"
                        key={stat}
                      >
                        <span>{stat}</span>

                        <div className="questStatBar">
                          <div
                            className="questStatFill"
                            style={{
                              width: `${value}%`,
                            }}
                          />
                        </div>

                        <strong>{value}</strong>
                      </div>
                    )
                  )}
                </div>

                <div className="questResultInsights">
                  <div className="questInsightBlock">
                    <span className="questInsightLabel">
                      STRENGTHS
                    </span>

                    <ul>
                      {hero.strengths.map(
                        (strength) => (
                          <li key={strength}>
                            {strength}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="questInsightBlock">
                    <span className="questInsightLabel">
                      RISK ZONE
                    </span>

                    <ul>
                      {hero.watchOut.map((risk) => (
                        <li key={risk}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="questResultVisual">
              <div className="questHeroFrame">
                <img
                  src={hero.image}
                  alt={hero.name}
                />
              </div>
            </div>
          </div>

<div className="questUpgradeBlock">
  <div
    className="questUpgradeIcon"
    aria-hidden="true"
  >
    ↑
  </div>

  <div className="questUpgradeContent">
    <span className="questInsightLabel">
      NEXT UPGRADE
    </span>

    <p>{hero.upgrade}</p>
  </div>
</div>

<div className="questResultButtons">
  <button
    type="button"
    className="questSecondaryButton"
    onClick={handleRetake}
  >
    RETAKE QUEST
  </button>

  <button
    type="button"
    className="questPrimaryButton"
    onClick={onOpenContact}
  >
    TAKE YOUR BUILD FURTHER
  </button>
</div>
        </div>
      </div>
    </section>
  );
};

export default QuestResult;