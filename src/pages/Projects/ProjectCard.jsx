function ProjectCard({ project, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <article
      className="projectCard"
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
    >
      <div className="projectCardHeader">
        <span className="projectCardStatus">
          <span className="projectCardStatusDot" />
          {project.status}
        </span>

        <span className="projectCardButton" aria-hidden="true">
          Read More
          <span>↗</span>
        </span>
      </div>

      <div className="projectCardMedia">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.coverAlt}
          />
        ) : (
          <span className="projectCardMediaFallback">
            {project.title}
          </span>
        )}

        <span
          className="projectCardMediaOverlay"
          aria-hidden="true"
        />
      </div>

      <div className="projectCardContent">
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <span className="projectCardRole">
          {project.role}
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;