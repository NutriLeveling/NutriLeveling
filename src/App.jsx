import { useEffect, useState } from "react";

import Home from "./pages/home";
import Quest from "./pages/Quest/Quest";
import About from "./pages/About/About";
import Learn from "./components/Learn/Learn";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";

const VALID_PAGES = new Set([
  "home",
  "quest",
  "about",
  "learn",
  "projects",
  "contact",
]);

function getRouteFromHash() {
  const rawHash = window.location.hash
    .replace(/^#\/?/, "")
    .trim()
    .toLowerCase();

  if (!rawHash) {
    return {
      page: "home",
      projectId: null,
    };
  }

  const [page, projectId] = rawHash
    .split("/")
    .filter(Boolean);

  if (!VALID_PAGES.has(page)) {
    return {
      page: "home",
      projectId: null,
    };
  }

  return {
    page,
    projectId:
      page === "projects"
        ? projectId || null
        : null,
  };
}

function App() {
  const [route, setRoute] = useState(
    getRouteFromHash
  );

  const [introFinished, setIntroFinished] =
    useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  const navigateTo = (
    page,
    subPath = null
  ) => {
    if (!VALID_PAGES.has(page)) {
      return;
    }

    const nextHash =
      page === "home"
        ? ""
        : `#/${page}${
            subPath ? `/${subPath}` : ""
          }`;

    if (window.location.hash === nextHash) {
      setRoute({
        page,
        projectId:
          page === "projects"
            ? subPath
            : null,
      });

      window.scrollTo(0, 0);
      return;
    }

    window.location.hash = nextHash;
  };

  const openQuest = () => navigateTo("quest");

  const openHome = () => navigateTo("home");

  const openAbout = () => navigateTo("about");

  const openLearn = () => navigateTo("learn");

  const openProjects = () =>
    navigateTo("projects");

  const openContact = () =>
    navigateTo("contact");

  if (route.page === "quest") {
    return (
      <Quest
        onBackHome={openHome}
        onOpenContact={openContact}
        onNavigate={navigateTo}
        currentPage={route.page}
      />
    );
  }

  if (route.page === "about") {
    return (
      <About
        onBackHome={openHome}
        onNavigate={navigateTo}
        currentPage={route.page}
      />
    );
  }

  if (route.page === "learn") {
    return (
      <Learn
        onBackHome={openHome}
        onNavigate={navigateTo}
        currentPage={route.page}
      />
    );
  }

  if (route.page === "projects") {
    return (
      <Projects
        onBackHome={openHome}
        onNavigate={navigateTo}
        currentPage={route.page}
        initialProjectId={route.projectId}
      />
    );
  }

  if (route.page === "contact") {
    return (
      <Contact
        onBackHome={openHome}
        onNavigate={navigateTo}
        currentPage={route.page}
      />
    );
  }

  return (
    <Home
      onOpenQuest={openQuest}
      onOpenAbout={openAbout}
      onOpenLearn={openLearn}
      onOpenProjects={openProjects}
      onOpenContact={openContact}
      introFinished={introFinished}
      setIntroFinished={setIntroFinished}
    />
  );
}

export default App;