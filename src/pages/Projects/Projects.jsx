import {
  useEffect,
  useState,
} from "react";

import "./Projects.css";

import projectsData from "./projectsData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import GlobalTopBar from "../../components/GlobalTopBar/GlobalTopBar";

function Projects({
  onNavigate,
  currentPage,
  initialProjectId,
}) {
  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);

  useEffect(() => {
    if (!initialProjectId) {
      setSelectedProject(null);
      return;
    }

    const project =
      projectsData.find(
        (item) =>
          item.id === initialProjectId
      );

    setSelectedProject(
      project || null
    );
  }, [initialProjectId]);

  const openProject = (project) => {
    onNavigate(
      "projects",
      project.id
    );
  };

  const closeProject = () => {
    onNavigate("projects");
  };

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
            onOpen={openProject}
          />
        ))}
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
        />
      )}

    </main>
  );
}

export default Projects;