import "./GlobalTopBar.css";

const navigationItems = [
  {
    label: "HOME",
    action: "home",
  },
  {
    label: "ABOUT",
    action: "about",
  },
  {
    label: "KNOWLEDGE HUB",
    action: "learn",
  },
  {
    label: "PROJECTS",
    action: "projects",
  },
  {
    label: "QUEST",
    action: "quest",
  },
  {
    label: "CONTACT",
    action: "contact",
  },
];

function GlobalTopBar({
  currentPage,
  onNavigate,
  accentColor,
}) {
  return (
    <header
      className="globalTopBar"
      data-accent={accentColor ? "true" : "false"}
      style={
        accentColor
          ? {
              "--global-top-bar-accent": accentColor,
            }
          : undefined
      }
    >
      <nav
        className="globalTopBarNavigation"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const isActive =
            currentPage === item.action;

          return (
            <button
              key={item.action}
              type="button"
              className={`globalTopBarButton ${
                isActive
                  ? "globalTopBarButtonActive"
                  : ""
              }`}
              onClick={() =>
                onNavigate?.(item.action)
              }
            >
              <span
                className="globalTopBarMarker"
                aria-hidden="true"
              />

              <span className="globalTopBarLabel">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default GlobalTopBar;