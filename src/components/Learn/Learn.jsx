import { useMemo, useState } from "react";

import LearnCard from "./LearnCard";
import LearnModal from "./LearnModal";
import { learnContent } from "./learnData";

import "./Learn.css";

const filters = ["all", "article", "video"];

function Learn({ onBackHome }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredContent = useMemo(() => {
    if (activeFilter === "all") {
      return learnContent;
    }

    return learnContent.filter(
      (item) => item.type === activeFilter
    );
  }, [activeFilter]);

const handleOpenItem = (item) => {
  setSelectedItem(item);
};

const handleCloseModal = () => {
  setSelectedItem(null);
};

  return (
    <main className="learnPage">
      <header className="learnTopbar">
        <button
          type="button"
          className="learnBackButton"
          onClick={onBackHome}
        >
          <span aria-hidden="true">←</span>
          <span>RETURN TO NUTRILEVELING</span>
        </button>

        <span className="learnPageLabel">KNOWLEDGE HUB</span>
      </header>

      <section className="learnHero">
        <div
          className="learnHeroTechnicalGrid"
          aria-hidden="true"
        />

        <div className="learnHeroContent">
          <div className="learnHeroEyebrowRow">
            <span className="learnEyebrow">
              LEVEL 01
            </span>

            <span
              className="learnHeroDash"
              aria-hidden="true"
            />
          </div>

          <div className="learnHeroTitleRow">
            <h1>
              <span className="learnHeroTitleLine">
                LEARN THE SYSTEM.
              </span>

<span className="learnHeroTitleLine learnHeroTitleLine--gold">
  LEVEL UP THE PLAYER
  <span
    className="learnHeroTitlePixel"
    aria-hidden="true"
  >
                  .
                </span>
              </span>
            </h1>

            <div
              className="learnHeroSignal"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="learnHeroFooter">
            <p>
              Evidence-based nutrition, recovery and
              performance content for gamers and
              esports athletes.
            </p>

            <span className="learnHeroCode">
              FUEL // RECOVER // PERFORM
            </span>
          </div>
        </div>
      </section>

      <section className="learnLibrary">
        <div className="learnLibraryHeader">
          <div className="learnLibraryIdentity">
            <h2>THE LIBRARY</h2>
          </div>

          <div
            className="learnFilters"
            aria-label="Filter Learn content"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter
                    ? "is-active"
                    : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="learnEditorialList">
          {filteredContent.map((item, index) => (
            <LearnCard
              key={item.id}
              item={item}
              index={index}
              onOpen={handleOpenItem}
            />
          ))}
        </div>
      </section>

<LearnModal
  item={selectedItem}
  onClose={handleCloseModal}
/>
    </main>
  );
}

export default Learn;