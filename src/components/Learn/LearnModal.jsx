import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { learnCategories } from "./learnData";

const CLOSE_ANIMATION_DURATION = 190;

function LearnModal({ item, onClose }) {
  const [isClosing, setIsClosing] =
    useState(false);

  const isClosingRef = useRef(false);
  const closeTimerRef = useRef(null);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    closeTimerRef.current =
      window.setTimeout(() => {
        onClose();
      }, CLOSE_ANIMATION_DURATION);
  }, [onClose]);

  /*
   * Reset the closing state every time
   * a new article or video opens.
   */
useLayoutEffect(() => {
  if (!item) return;

  if (closeTimerRef.current) {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  isClosingRef.current = false;
  setIsClosing(false);
}, [item]);

  /*
   * Escape key and body scroll lock.
   */
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [item, requestClose]);

  /*
   * Clear any pending timer if the
   * component itself unmounts.
   */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(
          closeTimerRef.current
        );
      }
    };
  }, []);

  if (!item) return null;

  const categoryVisual =
    learnCategories[item.category];

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      requestClose();
    }
  };

  return (
    <div
      className={
        isClosing
          ? "learnModalBackdrop is-closing"
          : "learnModalBackdrop"
      }
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <article
        className="learnModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="learn-modal-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <header className="learnModalHeader">
          <div className="learnModalHeaderMeta">
            <span className="learnModalType">
              {item.type}
            </span>

            <span className="learnModalDuration">
              {item.duration}
            </span>
          </div>

          <button
            type="button"
            className="learnModalClose"
            onClick={requestClose}
            disabled={isClosing}
            aria-label="Close content"
            title="Close"
          >
            ×
          </button>
        </header>

        <div className="learnModalBody">
          <div className="learnModalIntro">
            <div className="learnModalIntroMain">
              <span className="learnModalCategory">
                {item.category}
              </span>

              <h2 id="learn-modal-title">
                {item.title}
              </h2>

              <p className="learnModalDescription">
                {item.description}
              </p>
            </div>

            {categoryVisual && (
              <div
                className="learnModalMediaPanel"
                aria-hidden="true"
              >
                <div className="learnModalMedia">
                  <img
                    src={
                      categoryVisual.image
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>

          {item.type === "article" && (
            <article className="learnArticle">
              {item.content?.map(
                (block, blockIndex) => {
                  if (
                    block.type ===
                    "paragraphs"
                  ) {
                    return (
                      <div
                        className="learnArticleText"
                        key={`paragraphs-${blockIndex}`}
                      >
                        {block.paragraphs?.map(
                          (
                            paragraph,
                            paragraphIndex
                          ) => (
                            <p
                              key={`paragraph-${blockIndex}-${paragraphIndex}`}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>
                    );
                  }

                  if (block.type === "tip") {
                    return (
                      <aside
                        className="learnArticleTip"
                        key={`tip-${blockIndex}`}
                      >
                        {block.label && (
                          <span className="learnArticleTipLabel">
                            {block.label}
                          </span>
                        )}

                        {block.title && (
                          <h3>
                            {block.title}
                          </h3>
                        )}

                        {block.text && (
                          <p>{block.text}</p>
                        )}
                      </aside>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul
                        className="learnArticleList"
                        key={`list-${blockIndex}`}
                      >
                        {block.items?.map(
                          (
                            listItem,
                            itemIndex
                          ) => (
                            <li
                              key={`list-${blockIndex}-${itemIndex}`}
                            >
                              <span
                                aria-hidden="true"
                              />

                              <p>
                                {listItem}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    );
                  }

                  if (
                    block.type === "quote"
                  ) {
                    return (
                      <blockquote
                        className="learnArticleQuote"
                        key={`quote-${blockIndex}`}
                      >
                        <span className="learnArticleQuoteLabel">
                          FINAL TAKE
                        </span>

                        <p>{block.text}</p>
                      </blockquote>
                    );
                  }

                  return null;
                }
              )}
            </article>
          )}

          {item.type === "video" && (
            <div className="learnVideo">
              {item.videoUrl ? (
                <iframe
                  src={item.videoUrl}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="learnVideoPlaceholder">
                  <span>
                    VIDEO CONTENT
                  </span>

                  <p>
                    Add the YouTube embed
                    URL inside
                    <code>
                      {" "}
                      learnData.js
                    </code>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default LearnModal;