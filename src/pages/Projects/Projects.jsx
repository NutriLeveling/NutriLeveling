import { useState } from "react";

import "./Projects.css";

import projectsData from "./projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

function Projects({ onBackHome }) {
  const [selectedProject, setSelectedProject] =
    useState(null);

return (
  <main className="projectsPage">

    <header className="projectsTopbar">
      <button
        type="button"
        className="projectsBackButton"
        onClick={() => onBackHome?.()}
      >
        <span aria-hidden="true">←</span>
        <span>RETURN TO NUTRILEVELING</span>
      </button>

      <span className="projectsPageLabel">
        PROJECTS
      </span>
    </header>

<section className="projectsHero">

  <h1 className="projectsTitle">
    <span className="projectsTitleLine">
      FROM CONCEPT
    </span>

    <span className="projectsTitleLine projectsTitleLine--accent">
      TO CONTRIBUTION.
    </span>
  </h1>

  <p className="projectsIntro">
    Work, collaborations, and systems built around performance, health, and esports development.
  </p>

  <div className="projectsDivider" />
</section>

      <section
        className="projectsGrid"
        aria-label="Selected projects"
      >
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}

export default Projects;