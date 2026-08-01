import { forwardRef } from "react";
import "./QuestTerminal.css";

const QuestTerminal = forwardRef(function QuestTerminal(
  { onOpenQuest },
  ref
) {
  return (
    <section
      ref={ref}
      className="questTerminalSection"
      id="quest-terminal"
    >
      <div className="terminalTopBar">
        <span>SYSTEM ONLINE</span>
        <span>NUTRILEVELING TERMINAL v1.0</span>
      </div>

      <div className="questTerminal">
        <div className="terminalHeader">
          <span className="terminalEyebrow">
            PLAYER BUILD ASSESSMENT
          </span>

          <h2>QUEST TERMINAL</h2>

          <p className="terminalIntro">
            Identify your player build and discover the performance habits
            that can help you focus, recover, and perform more consistently.
          </p>
        </div>

        <div className="terminalMeta">
          <div className="terminalMetaItem">
            <span>QUESTIONS</span>
            <strong>08</strong>
          </div>

          <div className="terminalMetaItem">
            <span>ESTIMATED TIME</span>
            <strong>≈ 60 SEC</strong>
          </div>

          <div className="terminalMetaItem">
            <span>RESULT</span>
            <strong>PLAYER BUILD</strong>
          </div>
        </div>

        <button
          type="button"
          className="questButton"
          onClick={() => onOpenQuest?.()}
        >
          <span className="questButtonIcon" aria-hidden="true">
            ▶
          </span>

          <span>START PLAYER BUILD QUEST</span>

          <span className="questButtonArrow" aria-hidden="true">
            →
          </span>
        </button>

        <p className="terminalNote">
          No signup required. Your result is generated instantly.
        </p>
      </div>
    </section>
  );
});

export default QuestTerminal;