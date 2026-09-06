import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const [galleryStartIndex, setGalleryStartIndex] =
    useState(0);

  const [lightboxIndex, setLightboxIndex] =
    useState(null);

  const [linkCopied, setLinkCopied] =
  useState(false);

  const gallery = project.gallery || [];

  const visibleGalleryItems = 3;

  const maxGalleryStartIndex = Math.max(
    0,
    gallery.length - visibleGalleryItems
  );

  const requestClose = () => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    window.setTimeout(() => {
      onClose();
    }, 260);
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

    document.execCommand(
      "copy"
    );

    document.body.removeChild(
      textArea
    );

    setLinkCopied(true);

    window.setTimeout(() => {
      setLinkCopied(false);
    }, 1600);
  }
};

  const showPreviousLightboxImage = () => {
    setLightboxIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }

      return current === 0
        ? gallery.length - 1
        : current - 1;
    });
  };

  const showNextLightboxImage = () => {
    setLightboxIndex((current) => {
      if (current === null || gallery.length === 0) {
        return current;
      }

      return current === gallery.length - 1
        ? 0
        : current + 1;
    });
  };

  const showPreviousGalleryItems = () => {
    setGalleryStartIndex((current) =>
      Math.max(0, current - 1)
    );
  };

  const showNextGalleryItems = () => {
    setGalleryStartIndex((current) =>
      Math.min(
        maxGalleryStartIndex,
        current + 1
      )
    );
  };

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (lightboxIndex !== null) {
        if (event.key === "Escape") {
          closeLightbox();
          return;
        }

        if (event.key === "ArrowLeft") {
          showPreviousLightboxImage();
          return;
        }

        if (event.key === "ArrowRight") {
          showNextLightboxImage();
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
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [lightboxIndex]);

  const lightbox =
    lightboxIndex !== null &&
    gallery.length > 0
      ? createPortal(
          <div
            className="projectGalleryLightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} gallery viewer`}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeLightbox();
              }
            }}
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
          if (
            event.target ===
            event.currentTarget
          ) {
            requestClose();
          }
        }}
      >
        <article
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
  <span aria-hidden="true">↗</span>

  {linkCopied
    ? "Link Copied"
    : "SHARE PROJECT"}
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
                    disabled={
                      galleryStartIndex === 0
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
                    disabled={
                      galleryStartIndex >=
                      maxGalleryStartIndex
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