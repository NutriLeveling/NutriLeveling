import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const CLOSE_ANIMATION_DURATION = 190;

function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const [galleryStartIndex, setGalleryStartIndex] =
    useState(0);

  const [lightboxIndex, setLightboxIndex] =
    useState(null);

  const [linkCopied, setLinkCopied] =
    useState(false);

  const [visibleGalleryItems, setVisibleGalleryItems] =
    useState(() =>
      window.innerWidth <= 760 ? 1 : 3
    );

  const gallery = project.gallery || [];

  const maxGalleryStartIndex = Math.max(
    0,
    gallery.length - visibleGalleryItems
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleGalleryItems(
        window.innerWidth <= 760 ? 1 : 3
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const requestClose = () => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    window.setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_DURATION);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const copyProjectLink = async () => {
    const projectUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `#/projects/${project.id}`;

    try {
      await navigator.clipboard.writeText(
        projectUrl
      );

      setLinkCopied(true);

      window.setTimeout(() => {
        setLinkCopied(false);
      }, 1600);
    } catch {
      const textArea =
        document.createElement("textarea");

      textArea.value = projectUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(textArea);

      setLinkCopied(true);

      window.setTimeout(() => {
        setLinkCopied(false);
      }, 1600);
    }
  };

  const showPreviousLightboxImage = () => {
    setLightboxIndex((current) => {
      if (
        current === null ||
        gallery.length === 0
      ) {
        return current;
      }

      return current === 0
        ? gallery.length - 1
        : current - 1;
    });
  };

  const showNextLightboxImage = () => {
    setLightboxIndex((current) => {
      if (
        current === null ||
        gallery.length === 0
      ) {
        return current;
      }

      return current === gallery.length - 1
        ? 0
        : current + 1;
    });
  };

const showPreviousGalleryItems = () => {
  setGalleryStartIndex((current) =>
    current === 0
      ? maxGalleryStartIndex
      : current - 1
  );
};

const showNextGalleryItems = () => {
  setGalleryStartIndex((current) =>
    current === maxGalleryStartIndex
      ? 0
      : current + 1
  );
};

useEffect(() => {
  const previousOverflow =
    document.body.style.overflow;

  const previousPaddingRight =
    document.body.style.paddingRight;

  const scrollbarWidth =
    window.innerWidth -
    document.documentElement.clientWidth;

  document.body.style.overflow =
    "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight =
      `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow =
      previousOverflow;

    document.body.style.paddingRight =
      previousPaddingRight;
  };
}, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (lightboxIndex !== null) {
        if (event.key === "ArrowLeft") {
          showPreviousLightboxImage();
          return;
        }

        if (event.key === "ArrowRight") {
          showNextLightboxImage();
          return;
        }

        if (event.key === "Escape") {
          closeLightbox();
          return;
        }

        return;
      }

      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [lightboxIndex, isClosing]);

  const handleLightboxMouseDown = (event) => {
    const clickedButton =
      event.target.closest("button");

    const clickedImage =
      event.target.closest(
        ".projectGalleryLightboxImage"
      );

    if (clickedButton || clickedImage) {
      return;
    }

    closeLightbox();
  };

  const handleModalWheel = (event) => {
    if (!modalRef.current) return;
    if (modalRef.current.contains(event.target)) return;

    event.preventDefault();
    modalRef.current.scrollBy({
      top: event.deltaY,
      left: 0,
      behavior: "auto",
    });
  };

  const lightbox =
    lightboxIndex !== null &&
    gallery.length > 0
      ? createPortal(
          <div
            className="projectGalleryLightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} gallery viewer`}
            onMouseDown={handleLightboxMouseDown}
          >
            <button
              type="button"
              className="projectGalleryLightboxClose"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              ×
            </button>

            <button
              type="button"
              className="projectGalleryLightboxPrevious"
              onClick={
                showPreviousLightboxImage
              }
              aria-label="Previous image"
            >
              ←
            </button>

            <div className="projectGalleryLightboxContent">
              <img
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].alt}
                className="projectGalleryLightboxImage"
              />

              <span className="projectGalleryLightboxCounter">
                {lightboxIndex + 1} / {gallery.length}
              </span>
            </div>

            <button
              type="button"
              className="projectGalleryLightboxNext"
              onClick={
                showNextLightboxImage
              }
              aria-label="Next image"
            >
              →
            </button>
          </div>,
          document.body
        )
      : null;

  return (
    <>
<div
  className={`projectModalBackdrop ${
    isClosing ? "is-closing" : ""
  }`}
  onMouseDown={(event) => {
    if (event.target === event.currentTarget) {
      requestClose();
    }
  }}
  onWheel={handleModalWheel}
>
<article
  ref={modalRef}
  className={`projectModal ${
    isClosing ? "is-closing" : ""
  }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            className="projectModalClose"
            onClick={requestClose}
            aria-label="Close project"
          >
            <span aria-hidden="true">×</span>
          </button>

          <header className="projectModalHero">
            <div className="projectModalStatus">
              <span className="projectModalStatusDot" />
              {project.status}
            </div>

            <h2 id="project-modal-title">
              {project.title}
            </h2>

            <p>{project.description}</p>

            <button
              type="button"
              className="projectModalCopyLink"
              onClick={copyProjectLink}
            >
              <span
                className="projectModalCopyLinkIcon"
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
                  ? "Link Copied"
                  : "SHARE PROJECT"}
              </span>
            </button>
          </header>

          {project.cover && (
            <div className="projectModalCover">
              <img
                src={project.cover}
                alt={project.coverAlt}
                style={{
                  objectFit:
                    project.coverFit || "cover",
                }}
              />

              <div
                className="projectModalCoverOverlay"
                aria-hidden="true"
              />
            </div>
          )}

          <div className="projectModalBody">
            <section className="projectModalSection">
              <p className="projectModalSectionLabel">
                About the Project
              </p>

              <div className="projectModalText">
                {project.about.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="projectModalSection projectModalRoleSection">
              <p className="projectModalSectionLabel">
                My Role
              </p>

              <h3>{project.role}</h3>

              <p>{project.roleDescription}</p>
            </section>

            {gallery.length > 0 && (
              <section className="projectModalSection">
                <p className="projectModalSectionLabel">
                  Gallery
                </p>

                <div className="projectModalGallery">
                  <button
                    type="button"
                    className="projectModalGalleryArrow projectModalGalleryArrow--left"
                    onClick={
                      showPreviousGalleryItems
                    }
                    aria-label="Previous gallery images"
                  >
                    ←
                  </button>

                  <div className="projectModalGalleryViewport">
                    <div
                      className="projectModalGalleryTrack"
                      style={{
                        "--gallery-start":
                          galleryStartIndex,
                      }}
                    >
                      {gallery.map(
                        (image, index) => (
                          <button
                            type="button"
                            className="projectModalGalleryItem"
                            key={image.src}
                            onClick={() =>
                              openLightbox(index)
                            }
                            aria-label={`Open gallery image ${
                              index + 1
                            } of ${
                              gallery.length
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="projectModalGalleryArrow projectModalGalleryArrow--right"
                    onClick={
                      showNextGalleryItems
                    }
                    aria-label="Next gallery images"
                  >
                    →
                  </button>
                </div>
              </section>
            )}

            {project.partners?.length > 0 && (
              <section className="projectModalSection">
                <p className="projectModalSectionLabel">
                  Project Partners
                </p>

                <div className="projectModalPartners">
                  {project.partners.map(
                    (partner) => (
                      <a
                        className="projectModalPartner"
                        key={partner.name}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          loading="lazy"
                        />

                        <span>
                          {partner.name}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </section>
            )}

            {project.funding && (
              <section className="projectModalSection">
                <p className="projectModalSectionLabel">
                  Funding
                </p>

                <div className="projectModalFunding">
                  <img
                    src={project.funding.logo}
                    alt={project.funding.alt}
                    loading="lazy"
                  />

                  <p>
                    {project.funding.text}
                  </p>
                </div>
              </section>
            )}

            {project.information?.length > 0 && (
              <section className="projectModalSection projectModalInformationSection">
                <p className="projectModalSectionLabel">
                  Project Information
                </p>

                <dl className="projectModalInformation">
                  {project.information.map(
                    (item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    )
                  )}
                </dl>
              </section>
            )}
          </div>
        </article>
      </div>

      {lightbox}
    </>
  );
}

export default ProjectModal;