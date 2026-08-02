import {
  useCallback,
  useEffect,
  useState,
} from "react";

function ProjectModal({ project, onClose }) {
  const [isClosing, setIsClosing] =
    useState(false);

const requestClose = useCallback(() => {
  if (isClosing) return;

  setIsClosing(true);

  window.setTimeout(() => {
    onClose();
  }, 260);
}, [isClosing, onClose]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [requestClose]);

  return (
    <div
      className={`projectModalBackdrop ${
        isClosing ? "is-closing" : ""
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
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
        </header>

        {project.cover && (
          <div className="projectModalCover">
            <img
              src={project.cover}
              alt={project.coverAlt}
              style={{
                objectFit: project.coverFit || "cover",
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

          {project.gallery?.length > 0 && (
            <section className="projectModalSection">
              <p className="projectModalSectionLabel">
                Gallery
              </p>

              <div className="projectModalGallery">
                {project.gallery.map(
                  (image, index) => (
                    <figure
                      className={`projectModalGalleryItem ${
                        index === 0
                          ? "projectModalGalleryItemFeatured"
                          : ""
                      }`}
                      key={image.src}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                      />
                    </figure>
                  )
                )}
              </div>
            </section>
          )}

          {project.partners?.length > 0 && (
            <section className="projectModalSection">
              <p className="projectModalSectionLabel">
                Project Partners
              </p>

              <div className="projectModalPartners">
                {project.partners.map((partner) => (
                  <div
                    className="projectModalPartner"
                    key={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                    />

                    <span>{partner.name}</span>
                  </div>
                ))}
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

                <p>{project.funding.text}</p>
              </div>
            </section>
          )}

          {project.information?.length > 0 && (
            <section className="projectModalSection projectModalInformationSection">
              <p className="projectModalSectionLabel">
                Project Information
              </p>

              <dl className="projectModalInformation">
                {project.information.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}

export default ProjectModal;