import { useState } from "react";

import "./Projects.css";

import projectsData from "./projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import GlobalTopBar from "../../components/GlobalTopBar/GlobalTopBar";

function Projects({
  onNavigate,
  currentPage,
}) {
  const [selectedProject, setSelectedProject] =
    useState(null);

  return (
    <main className="projectsPage">

      <GlobalTopBar
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

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
          Work, collaborations, and systems built around
          performance, health, and esports development.
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