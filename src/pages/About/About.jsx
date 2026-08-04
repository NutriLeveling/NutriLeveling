import "./About.css";

function About({ onBackHome }) {
  return (
    <main className="aboutPage">
      <div className="aboutBackground" aria-hidden="true">
        <div className="aboutGlow aboutGlowOne" />
        <div className="aboutGlow aboutGlowTwo" />
        <div className="aboutGrid" />
      </div>

      <header className="aboutTopbar">
        <button
          type="button"
          className="aboutBackButton"
          onClick={onBackHome}
        >
          <span aria-hidden="true">←</span>
          <span>RETURN TO NUTRILEVELING</span>
        </button>

        <span className="aboutPageLabel">
          ABOUT
        </span>
      </header>

      <section className="aboutMain">
        <div className="aboutCopy">

          <h1 className="aboutTitle">
            BUILT FOR THE GAME
            <span>BEHIND THE GAME.</span>
          </h1>

          <div
            className="aboutTitleLine"
            aria-hidden="true"
          />

          <div className="aboutText">
            <p>
              Hi, I’m Loizos, a dietitian, nutritionist, and the
              founder of NutriLeveling. I hold a Bachelor’s degree
              in Nutrition and Dietetics from the European
              University of Cyprus, and I currently work at
              Bredde-e-sport Alliansen in Norway as an esports
              nutrition advisor and research assistant.   Through NutriLeveling, my goal is to make
  evidence-based nutrition and wellbeing more relevant,
  practical, and accessible for the gaming and esports
  world. 
            </p>

<p>
This commitment also extends to research,
  including my peer-reviewed narrative review on
  personalized nutrition, lifestyle, and supplementation
  strategies for esports athletes, published in{" "}
  <a
    href="https://doi.org/10.3390/nu18060981"
    target="_blank"
    rel="noopener noreferrer"
    className="aboutPublicationLink"
  >
    <em>Nutrients</em>
  </a>
  . Beyond esports, I also work with individuals who have similarly
  demanding cognitive lifestyles, helping translate
  science into practical habits that support focus, consistency,
  recovery, and long-term health.
</p>
          </div>

          <div className="aboutMeta">
            <div className="aboutMetaItem">
              <span
                className="aboutMetaIcon"
                aria-hidden="true"
              >
                ▦
              </span>

              <div className="aboutMetaContent">
                <span className="aboutMetaLabel">
                  FOUNDED
                </span>

                <strong>2025</strong>
              </div>
            </div>

            <div className="aboutMetaItem">
              <span
                className="aboutMetaIcon"
                aria-hidden="true"
              >
                ◉
              </span>

              <div className="aboutMetaContent">
                <span className="aboutMetaLabel">
                  BASED IN
                </span>

                <strong>NORWAY</strong>
              </div>
            </div>

            <div className="aboutMetaItem aboutMetaFocus">
              <span
                className="aboutMetaIcon"
                aria-hidden="true"
              >
                ◎
              </span>

              <div className="aboutMetaContent">
                <span className="aboutMetaLabel">
                  FOCUS
                </span>

                <strong>
                  ESPORTS NUTRITION
                  <br />
                  PERFORMANCE &amp; WELLBEING
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="aboutVisual">
          <div
            className="aboutPortraitGlow"
            aria-hidden="true"
          />

          <div className="aboutPortraitFrame">
            <img
              src="/about/loizos-portrait.jpeg"
              alt="Loizos presenting an esports nutrition workshop"
              className="aboutPortrait"
            />

            <img
              src="/about/boss.gif"
              alt=""
              aria-hidden="true"
              className="aboutMotionAccent"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;