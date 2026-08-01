function ProjectCard({ project, onOpen }) {
  return (
    <article className="projectCard">
      <div className="projectCardHeader">
        <span className="projectCardStatus">
          <span className="projectCardStatusDot" />

          {project.status}
        </span>

        <button
          type="button"
          className="projectCardButton"
          onClick={() => onOpen(project)}
          aria-label={`Read more about ${project.title}`}
        >
          Read More

          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <button
        type="button"
        className="projectCardMedia"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title}`}
      >
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.coverAlt}
            style={{
              objectFit: project.coverFit || "cover"
    }}
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
      </button>

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