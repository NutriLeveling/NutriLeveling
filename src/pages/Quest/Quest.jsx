import { useState } from "react";
import "./Quest.css";

import { questions } from "./questions";
import { heroes } from "./heroes";

const Quest = ({ onBackHome, onOpenContact }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [playerStats, setPlayerStats] = useState(null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);

    setTimeout(() => {
  setStarted(true);
  setIsStarting(false);
}, 3000);
  };

const handleAnswer = (answer, index) => {
  if (selectedAnswer !== null) return;

  setSelectedAnswer(index);

  const updatedAnswers = [...answers];

  updatedAnswers[currentQuestion] = {
    answerIndex: index,
    archetypes: answer.archetypes,
    stats: answer.stats,
  };

  setAnswers(updatedAnswers);

  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      calculateResult(updatedAnswers);
    }
  }, 360);
};

  const calculateResult = (finalAnswers) => {
    setIsCompiling(true);

    const archetypeScores = {
      strategist: 0,
      reactor: 0,
      sentinel: 0,
      catalyst: 0,
    };

    const statScores = {
      focus: 0,
      energy: 0,
      recovery: 0,
      adaptability: 0,
    };

    finalAnswers.forEach((answer) => {
      if (!answer) return;

      Object.entries(answer.archetypes).forEach(
        ([archetype, points]) => {
          archetypeScores[archetype] += points;
        }
      );

      Object.entries(answer.stats).forEach(([stat, points]) => {
        statScores[stat] += points;
      });
    });

    const winner = Object.entries(archetypeScores).reduce(
      (highest, current) =>
        current[1] > highest[1] ? current : highest
    )[0];

    const maxPossibleStatScore = questions.length * 2;

    const normalizedStats = Object.fromEntries(
      Object.entries(statScores).map(([stat, score]) => [
        stat,
        Math.round((score / maxPossibleStatScore) * 100),
      ])
    );

    setTimeout(() => {
  setResult(winner);
  setPlayerStats(normalizedStats);
  setIsCompiling(false);
}, 3600);
  };

const handleBack = () => {
  if (currentQuestion > 0) {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswer(null);
  }
};

const handleRetake = () => {
  setStarted(true);
  setCurrentQuestion(0);
  setSelectedAnswer(null);
  setAnswers([]);
  setResult(null);
  setPlayerStats(null);
  setIsCompiling(false);
  setIsStarting(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleReturnToMain = () => {
  onBackHome?.();
};

  return (
    <section className="quest questPageEntrance">
      <div
  className={`questBackground ${result ? "resultBackground" : ""}`}
  aria-hidden="true"
  style={{
    "--result-accent": result
      ? heroes[result].accent
      : "transparent",
  }}
>
        <div className="questGlow questGlowOne" />
        <div className="questGlow questGlowTwo" />
        <div className="questGrid" />
        <div className="questNoise" />
      </div>

      <div className="questShell">
        {!started && !isStarting ? (
<div className="questIntro">

  <div className="questIntroTopbar">

    <button
      type="button"
      className="questIntroBack"
      onClick={() => onBackHome?.()}
    >
      <span aria-hidden="true">←</span>
      <span>Back to NutriLeveling</span>
    </button>

    <div className="questIntroEyebrow">
      <span>NUTRILEVELING TERMINAL v1.0</span>
    </div>

  </div>

  <div className="questIntroLine" />

  <div className="questIntroContent">
    <div className="questIntroLeft">
      <p className="questIntroLabel">
        PERFORMANCE ASSESSMENT
      </p>

      <h1>
        DISCOVER YOUR
        <span>PLAYER BUILD</span>
      </h1>

      <p className="questIntroDescription">
        Answer a few quick questions to reveal how you focus,
  recover, adapt, and perform.
      </p>

    </div>

    <div className="questIntroRight">
      <div className="questSystemStatus">
        <span className="questStatusDot" />
        <span>SYSTEM READY</span>
      </div>

      <button
        type="button"
        className="questStartButton"
        onClick={handleStart}
      >
        <span>START YOUR QUEST</span>
        <span className="questStartArrow">↗</span>
      </button>

      <div className="questIntroMeta questIntroMetaRight">
    <div>
      <span>QUESTIONS</span>
      <strong>08</strong>
    </div>

    <div>
      <span>ESTIMATED TIME</span>
      <strong>≈ 60 SEC</strong>
    </div>
  </div>
    </div>
  </div>

  <div className="questIntroGhost">
    QUEST
  </div>
</div>
        ) : isStarting ? (
          <div className="questInitializing">
  <div className="questInitializingHeader">
    <span>BUILD SCAN PROTOCOL</span>
  </div>

  <div className="questInitializingCore">

    <h2>
      INITIALIZING
      <span>PLAYER BUILD SCAN</span>
    </h2>

    <div className="questInitializingTrack">
      <div className="questInitializingFill" />
    </div>

    <div className="questInitializingStatus">
      <span>LOADING</span>
      <strong>READY</strong>
    </div>

    <div className="questInitializingSignals">
      <span>FOCUS</span>
      <span>ENERGY</span>
      <span>RECOVERY</span>
      <span>ADAPTABILITY</span>
    </div>
  </div>

  <div className="questInitializingFrame" />
  <div className="questScanLine" />
</div>
        ) : isCompiling ? (
          <div className="questLoading">
  <div className="questLoadingHeader">
    <span>BUILD ANALYSIS</span>
  </div>

  <div className="questLoadingCore">
    <p className="questLoadingKicker">
      ASSESSMENT COMPLETE
    </p>

    <h2>
      COMPILING
      <span>YOUR PLAYER PROFILE</span>
    </h2>

    <div className="questLoadingTrack">
      <div className="questLoadingFill" />
    </div>

    <div className="questLoadingStatus">
      <span>ANALYZING PERFORMANCE PATTERNS</span>
      <strong>PROCESSING</strong>
    </div>

    <div className="questLoadingSignals">
      <div>
        <span>FOCUS</span>
        <i />
      </div>

      <div>
        <span>ENERGY</span>
        <i />
      </div>

      <div>
        <span>RECOVERY</span>
        <i />
      </div>

      <div>
        <span>ADAPTABILITY</span>
        <i />
      </div>
    </div>

    <div className="questLoadingReveal">
      <span>PLAYER BUILD</span>
      <strong>IDENTIFYING...</strong>
    </div>
  </div>

  <div className="questLoadingFrame" />
  <div className="questLoadingSweep" />
</div>
        ) : result ? (
        <div
  className="questResult"
  style={{
    "--hero-accent": heroes[result].accent,
  }}
>
  <header className="questResultHeroHeader">
    <span>PLAYER BUILD IDENTIFIED</span>

    <h1>{heroes[result].name}</h1>

    <h2>{heroes[result].tagline}</h2>

    <p>{heroes[result].description}</p>
  </header>

  <div className="questResultBody">
    <div className="questResultProfile">
      <section className="questProfilePanel">
        <div className="questResultSectionTitle">
          PERFORMANCE PROFILE
        </div>

        {playerStats && (
          <div className="questStats">
            {Object.entries(playerStats).map(([stat, value]) => (
              <div className="questStat" key={stat}>
                <span>{stat}</span>

                <div className="questStatBar">
                  <div
                    className="questStatFill"
                    style={{ width: `${value}%` }}
                  />
                </div>

                <strong>{value}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="questResultInsights">
          <div className="questInsightBlock">
            <span className="questInsightLabel">
              STRENGTHS
            </span>

            <ul>
              {heroes[result].strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="questInsightBlock">
            <span className="questInsightLabel">
              RISK ZONE
            </span>

            <ul>
              {heroes[result].watchOut.map((risk) => (
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
          src={heroes[result].image}
          alt={heroes[result].name}
        />
      </div>
    </div>
  </div>

<button
  type="button"
  className="questUpgradeBlock questUpgradeButton"
  onClick={() => onOpenContact?.()}
>
  <div className="questUpgradeIcon" aria-hidden="true">
    ↑
  </div>

  <div className="questUpgradeContent">
    <span className="questInsightLabel">
      NEXT UPGRADE
    </span>

    <p>{heroes[result].upgrade}</p>
  </div>

</button>

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
  onClick={handleReturnToMain}
>
  EXPLORE NUTRILEVELING
</button>
  </div>
</div>
        ) : (
          <div className="questQuestion">
            <div className="questQuestionTop">
              <span className="questEyebrow">BUILD SCAN</span>
              <span className="questProgress">
                {String(currentQuestion + 1).padStart(2, "0")}
                <span>/</span>
                {String(questions.length).padStart(2, "0")}
              </span>
            </div>

            <div className="questProgressTrack">
              <div
                className="questProgressFill"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            <div className="questQuestionContent">
              <h2>{questions[currentQuestion].question}</h2>

              <div
  className="questAnswers"
  key={currentQuestion}
>
  {questions[currentQuestion].answers.map(
    (answer, index) => (
      <button
        type="button"
        key={index}
        onClick={() => handleAnswer(answer, index)}
        className={
          selectedAnswer === index ? "selected" : ""
        }
        disabled={selectedAnswer !== null}
        style={{
          "--answer-delay": `${index * 70}ms`,
        }}
      >
        <span className="answerTop">
          <span className="answerIndex">
            {String.fromCharCode(65 + index)}
          </span>

          <span className="answerArrow">
            ↗
          </span>
        </span>

        <span className="answerText">
          {answer.text}
        </span>

        <span className="answerLine" />
      </button>
    )
  )}
</div>
            </div>

            {currentQuestion > 0 && (
              <button
                type="button"
                className="questBack"
                onClick={handleBack}
                disabled={selectedAnswer !== null}
              >
                ← Previous question
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Quest;