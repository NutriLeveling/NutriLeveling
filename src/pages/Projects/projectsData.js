import ecidCover from "./assets/ecid/ecid-cover.png";
import ecidGallery01 from "./assets/ecid/ecid-gallery-01.png";
import ecidGallery02 from "./assets/ecid/ecid-gallery-02.png";
import ecidGallery03 from "./assets/ecid/ecid-gallery-03.png";
import ecidBeaLogo from "./assets/ecid/bea-logo.png";
import h20Logo from "./assets/ecid/h20-logo.png";
import dgiLogo from "./assets/ecid/dgi-logo.png";
import ecidErasmusLogo from "./assets/ecid/erasmus-horizontal.png";

import lockinCover from "./assets/lockin/lockin-cover.png";
import lockinGallery01 from "./assets/lockin/lockin-gallery-01.png";
import lockinGallery02 from "./assets/lockin/lockin-gallery-02.png";
import lockinGallery03 from "./assets/lockin/lockin-gallery-03.png";
import nutrilevelingLogo from "./assets/lockin/nutrileveling-logo.png";
import gamersPerformanceLogo from "./assets/lockin/gamers-performance-logo.png";
import lockinBeaLogo from "./assets/lockin/bea-logo.png";

import beyondBeaLogo from "./assets/beyond/bea-logo.png";
import breezageriLogo from "./assets/beyond/breezageri-logo.png";
import universityBergenLogo from "./assets/beyond/university-bergen-logo.png";
import beyondErasmusLogo from "./assets/beyond/erasmus-horizontal.png";

const projectsData = [
  {
    id: "lock-in",
    status: "Active",
    title: "LOCK IN",
    role: "Founder & Project Manager",

    description:
      "A science-based health and performance initiative designed to help grassroots esports players perform, recover and develop sustainably.",

    cover: lockinCover,
    coverFit: "contain",
    coverAlt: "LOCK IN project identity",

    about: [
      "LOCK IN is a health and performance initiative built for grassroots esports. It translates evidence-informed performance principles into practical systems that players, coaches and parents can understand and use.",

      "The project is structured around four central pillars: diet and hydration, physical activity and posture, gaming health, and general wellbeing. Together, they address focus, endurance, recovery, injury prevention, sleep, mental resilience and sustainable gaming habits.",

      "Through educational content, workshops and practical frameworks, LOCK IN aims to help players feel better, perform consistently and build habits that support long-term development rather than short-term performance hacks.",
    ],

    roleDescription:
      "I lead the project, overseeing concept, content, and overall direction. LOCK IN is developed in collaboration with NutriLeveling, Gamers Performance, and Bredde-e-sport Alliansen.",

    gallery: [
      {
        src: lockinGallery01,
        alt: "LOCK IN educational content",
      },
      {
        src: lockinGallery02,
        alt: "LOCK IN performance material",
      },
      {
        src: lockinGallery03,
        alt: "LOCK IN visual content",
      },
    ],

    partners: [
      {
        name: "NutriLeveling",
        logo: nutrilevelingLogo,
      },
      {
        name: "Gamers Performance",
        logo: gamersPerformanceLogo,
      },
      {
        name: "Bredde-e-sport Alliansen",
        logo: lockinBeaLogo,
      },
    ],

    funding: null,

    information: [
      {
        label: "Role",
        value: "Founder & Project Manager",
      },
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Focus",
        value: "Health & Sustainable Performance",
      },
    ],
  },

  {
    id: "beyond-the-game",
    status: "Starting September 2026",
    title: "Beyond The Game",
    role: "Project Coordinator & Project Manager",

    description:
      "An Erasmus+ youth project transforming grassroots gaming into a structured environment for skills recognition and non-formal learning.",

    cover: null,
    coverFit: "contain",
    coverAlt: "Beyond The Game project identity",

    about: [
      "Beyond The Game is an Erasmus+ Small-scale Partnership in Youth that explores how grassroots gaming can function as a structured environment for non-formal learning and youth development.",

      "The project aims to close the skills translation gap between gaming and real-life opportunities. Through gaming, young people develop competences such as teamwork, leadership, communication, strategic thinking, resilience, emotional regulation and responsible digital behaviour, yet these skills often remain invisible in education and employment.",

      "Beyond The Game will develop a Gaming Skills Profile, a Competence Mapping Matrix, gamified Skill Development Tracks and a lightweight Digital Toolkit. These resources will help young people identify, strengthen and communicate their transferable skills in learning pathways, CVs, interviews and everyday life.",

      "The 16-month project will bring together partners from Norway and Cyprus and will include coach training, transnational pilot implementation, evaluation and open educational resources.",
    ],

    roleDescription:
      "I serve as Project Coordinator and Project Manager, leading implementation, partnership coordination, and strategic direction of the programme.",

    gallery: [],

    partners: [
      {
        name: "Bredde-e-sport Alliansen",
        logo: beyondBeaLogo,
      },
      {
        name: "Breezageri Ltd",
        logo: breezageriLogo,
      },
      {
        name: "University of Bergen",
        logo: universityBergenLogo,
      },
    ],

    funding: {
      text: "Co-funded by the European Union through the Erasmus+ Programme.",
      logo: beyondErasmusLogo,
      alt: "Erasmus+ Programme",
    },

    information: [
      {
        label: "Role",
        value: "Project Coordinator & Project Manager",
      },
      {
        label: "Programme",
        value: "Erasmus+ KA210-YOU",
      },
      {
        label: "Duration",
        value: "16 Months",
      },
      {
        label: "Project Period",
        value: "September 2026 – December 2027",
      },
    ],
  },

  {
    id: "ecid",
    status: "Active",
    title: "ECID",
    role: "Project Contributor & Work Package Lead",

    description:
      "An Erasmus+ partnership strengthening coaching competence, inclusion and digital wellbeing across grassroots esports.",

    cover: ecidCover,
    coverFit: "contain",
    coverAlt: "ECID project meeting",

    about: [
      "Esports Coaching for Inclusion and Development (ECID) is an 18-month Erasmus+ Small-scale Partnership focused on strengthening inclusive coaching practices in grassroots esports.",

      "The project brings together organisations from Norway, Denmark and the Netherlands to develop a European coaching framework that combines principles from sports coaching, pedagogy, digital wellbeing and inclusive practice.",

      "Through surveys, interviews and the mapping of existing initiatives, ECID is building a knowledge base around the competences and structures needed at grassroots level. This research supports the development of a structured coaching framework and a modular training programme.",

      "The methodology will be translated into practical workshops, pilot-tested in grassroots clubs and supported by an open digital toolkit containing resources, videos and self-study modules for clubs and coaches.",
    ],

    roleDescription:
      "I contribute as part of the project team, leading the development and delivery of a work package. My contribution includes research, content development, framework design, and practical implementation.",

    gallery: [
      {
        src: ecidGallery01,
        alt: "ECID kick-off meeting",
      },
      {
        src: ecidGallery02,
        alt: "ECID project partners during the kick-off meeting",
      },
      {
        src: ecidGallery03,
        alt: "ECID project development session",
      },
    ],

    partners: [
      {
        name: "Bredde-e-sport Alliansen",
        logo: ecidBeaLogo,
      },
      {
        name: "H20 Esports Campus",
        logo: h20Logo,
      },
      {
        name: "DGI",
        logo: dgiLogo,
      },
    ],

    funding: {
      text: "Co-funded by the European Union through the Erasmus+ Programme.",
      logo: ecidErasmusLogo,
      alt: "Erasmus+ Programme",
    },

    information: [
      {
        label: "Role",
        value: "Project Contributor & Work Package Lead",
      },
      {
        label: "Programme",
        value: "Erasmus+ Small-scale Partnership",
      },
      {
        label: "Duration",
        value: "18 Months",
      },
      {
        label: "Countries",
        value: "Norway, Denmark & Netherlands",
      },
    ],
  },
];

export default projectsData;