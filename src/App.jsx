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

function getPageFromHash() {
  const page = window.location.hash
    .replace(/^#\/?/, "")
    .trim()
    .toLowerCase();

  if (!page) {
    return "home";
  }

  return VALID_PAGES.has(page) ? page : "home";
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const nextPage = getPageFromHash();

      setCurrentPage(nextPage);
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateTo = (page) => {
    if (!VALID_PAGES.has(page)) {
      return;
    }

    const nextHash = page === "home" ? "" : `#/${page}`;

    if (window.location.hash === nextHash) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      return;
    }

    window.location.hash = nextHash;
  };

  const openQuest = () => navigateTo("quest");
  const openHome = () => navigateTo("home");
  const openAbout = () => navigateTo("about");
  const openLearn = () => navigateTo("learn");
  const openProjects = () => navigateTo("projects");
  const openContact = () => navigateTo("contact");

  if (currentPage === "quest") {
    return (
      <Quest
        onBackHome={openHome}
        onOpenContact={openContact}
      />
    );
  }

  if (currentPage === "about") {
    return <About onBackHome={openHome} />;
  }

  if (currentPage === "learn") {
    return <Learn onBackHome={openHome} />;
  }

  if (currentPage === "projects") {
    return <Projects onBackHome={openHome} />;
  }

  if (currentPage === "contact") {
    return <Contact onBackHome={openHome} />;
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