function LearnCard({ item, index, onOpen }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

const actionLabel = item.publication
  ? "EXPLORE"
  : item.type === "video"
    ? "WATCH"
    : "READ";

  return (
    <button
      type="button"
      className={`learnEditorialItem ${
        item.featured
          ? "learnEditorialItem--featured"
          : ""
      }`}
      onClick={() => onOpen(item)}
      aria-label={`${actionLabel}: ${item.title}`}
    >
      <span
        className="learnEditorialAccent"
        aria-hidden="true"
      />

      <div className="learnEditorialIdentity">
        <span className="learnEditorialIndex">
          {formattedIndex}
        </span>

        <div className="learnEditorialMeta">
          <span className="learnEditorialType">
            {item.publication
            ? "Featured Article"
            : item.type}
          </span>

          <span className="learnEditorialCategory">
            {item.category}
          </span>
        </div>
      </div>

      <span
        className="learnEditorialDivider"
        aria-hidden="true"
      />

<div className="learnEditorialMain">
  <h3>{item.title}</h3>

  {item.status === "coming-soon" && (
    <span className="learnEditorialStatus">
      <span
        className="learnEditorialStatusDot"
        aria-hidden="true"
      />

      COMING SOON
    </span>
  )}

  <p>{item.description}</p>
</div>

      <div className="learnEditorialAction">
        <span className="learnEditorialDuration">
          {item.duration}
        </span>

        <span className="learnEditorialOpen">
          <span>{actionLabel}</span>

          <span
            className="learnEditorialArrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </span>
      </div>
    </button>
  );
}

export default LearnCard;