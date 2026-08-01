import { useEffect, useRef, useState } from "react";
import "./WelcomeSection.css";

function WelcomeSection({ onRevealBuilds }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.22,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`welcomeSection ${
                isVisible ? "welcomeSection--visible" : ""
            }`}
            id="about"
        >
            <p className="backgroundText" aria-hidden="true">
                LEVEL UP
                <br />
                YOUR GAME
            </p>

            <div className="welcomeLabel welcomeReveal welcomeReveal--label">
                <span>WELCOME TO</span>
            </div>

            <div className="welcomeTitle welcomeReveal welcomeReveal--title">
                <h2>
                    <span>NUTRI</span>
                    <span>LEVELING</span>
                </h2>
            </div>

            <div className="welcomeDivider" aria-hidden="true">
                <span className="welcomeDividerDiamond" />
                <span className="welcomeDividerPixel welcomeDividerPixel--one" />
                <span className="welcomeDividerPixel welcomeDividerPixel--two" />
            </div>

            <div className="welcomeDescription">
                <h3 className="aboutHeading welcomeReveal welcomeReveal--heading">
                    The missing piece in modern esports.
                </h3>

                <div className="welcomeReveal welcomeReveal--copy">
                    <p className="aboutParagraph">
                        In traditional sports, nutrition and recovery are
                        non-negotiable. In esports, they&apos;re often
                        overlooked—even though reaction time, decision-making,
                        and consistency rely on the very same foundation.
                    </p>

                    <p className="aboutParagraph">
                        NutriLeveling brings evidence-based nutrition and
                        performance science into esports, helping players build
                        sustainable habits that support both long-term health and sustainable performance.
                    </p>
                </div>

                <div className="aboutFocus welcomeReveal welcomeReveal--focus">
                    <h4>What we focus on</h4>

                    <ul>
                        <li>
                            <span
                                className="focusIcon"
                                aria-hidden="true"
                            />
                            <span>Focus &amp; Mental Performance</span>
                        </li>

                        <li>
                            <span
                                className="focusIcon"
                                aria-hidden="true"
                            />
                            <span>Nutrition &amp; Hydration</span>
                        </li>

                        <li>
                            <span
                                className="focusIcon"
                                aria-hidden="true"
                            />
                            <span>Recovery &amp; Burnout Prevention</span>
                        </li>
                    </ul>
                </div>

                <p className="aboutClosing welcomeReveal welcomeReveal--closing">
                    <span>Every game has a strategy.</span>
                    <span>Your health should too.</span>
                </p>
            </div>

<button
    type="button"
    className="welcomeCTA welcomeReveal welcomeReveal--cta"
    onClick={onRevealBuilds}
>
    UNLOCK YOUR NEXT LEVEL
</button>
        </section>
    );
}

export default WelcomeSection;