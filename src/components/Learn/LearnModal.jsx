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

  const [linkCopied, setLinkCopied] =
    useState(false);
  const modalRef = useRef(null);
  const isClosingRef = useRef(false);
  const closeTimerRef = useRef(null);
  const handleModalWheel = (event) => {
  if (!modalRef.current) return;

  if (modalRef.current.contains(event.target)) {
    return;
  }

  event.preventDefault();

  modalRef.current.scrollBy({
    top: event.deltaY,
    left: 0,
    behavior: "auto",
  });
};
  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    closeTimerRef.current =
      window.setTimeout(() => {
        onClose();
      }, CLOSE_ANIMATION_DURATION);
  }, [onClose]);

  const copyItemLink = async () => {
    const itemUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `#/learn/${item.id}`;

    try {
      await navigator.clipboard.writeText(
        itemUrl
      );
    } catch {
      const textArea =
        document.createElement("textarea");

      textArea.value = itemUrl;

      textArea.style.position = "fixed";
      textArea.style.opacity = "0";

      document.body.appendChild(
        textArea
      );

      textArea.focus();
      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(
        textArea
      );
    }

    setLinkCopied(true);

    window.setTimeout(() => {
      setLinkCopied(false);
    }, 1600);
  };

  /*
   * Reset the closing state every time
   * a new article or video opens.
   */
  useLayoutEffect(() => {
    if (!item) return;

    if (closeTimerRef.current) {
      window.clearTimeout(
        closeTimerRef.current
      );

      closeTimerRef.current = null;
    }

    isClosingRef.current = false;
    setIsClosing(false);
    setLinkCopied(false);
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

  const previousPaddingRight =
    document.body.style.paddingRight;

  const scrollbarWidth =
    window.innerWidth -
    document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight =
      `${scrollbarWidth}px`;
  }

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    document.body.style.overflow =
      previousOverflow;

    document.body.style.paddingRight =
      previousPaddingRight;

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
  onWheel={handleModalWheel}
>
<article
  ref={modalRef}
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

  <div className="learnModalHeaderActions">
<button
  type="button"
  className="learnModalShare"
  onClick={copyItemLink}
>
  <span
    className="learnModalShareIcon"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18"
        cy="5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="6"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="18"
        cy="19"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8.2 10.9L15.8 6.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M8.2 13.1L15.8 17.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </span>

  <span>
    {linkCopied
      ? "LINK COPIED"
      : item.type === "video"
        ? "SHARE VIDEO"
        : "SHARE ARTICLE"}
  </span>
</button>

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
  </div>
</header>

        <div className="learnModalBody">
          <div className="learnModalIntro">
            <div className="learnModalIntroMain">
              <span className="learnModalCategory">
                {item.category}
              </span>

              <h2 id="learn-modal-title">
                {item.fullTitle || item.title}
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
                          <p>
                            {block.text}
                          </p>
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
                              <span aria-hidden="true" />

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

                        <p>
                          {block.text}
                        </p>
                      </blockquote>
                    );
                  }

                  if (
                    block.type ===
                    "publication"
                  ) {
                    return (
                      <div
                        className="learnArticlePublication"
                        key={`publication-${blockIndex}`}
                      >
                        <span className="learnArticleQuoteLabel">
                          {block.label}
                        </span>

                        <p>
                          {block.text}
                        </p>

                        {item.publicationUrl && (
                          <a
                            className="learnPublicationLink"
                            href={
                              item.publicationUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              Read Full Publication
                            </span>

                            <span aria-hidden="true">
                              ↗
                            </span>
                          </a>
                        )}
                      </div>
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
                    Add the YouTube embed URL
                    inside
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