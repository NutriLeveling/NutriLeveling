import strategistGif from "../../assets/heroes/strategist.gif";
import reactorGif from "../../assets/heroes/reactor.gif";
import sentinelGif from "../../assets/heroes/sentinel.gif";
import catalystGif from "../../assets/heroes/catalyst.gif";

export const heroes = {
  strategist: {
    name: "The Strategist",
      accent: "#004aad",
    tagline: "Every move has a purpose.",
    description:
      "You play with intention, structure, and smart decision-making. Your edge comes from focus, pattern recognition, and staying in control when pressure rises.",

    strengths: [
      "High focus",
      "Smart decision-making",
      "Planning and structure",
      "Consistency under pressure",
    ],

    watchOut: [
      "Overthinking",
      "Mental fatigue",
      "Neglecting recovery",
      "Being too hard on yourself",
    ],

    upgrade:
      "Build flexible routines that give you structure without limiting your ability to react.\n\nWant to take this build further? Click here to get in touch!",

    image: strategistGif,
  },

  reactor: {
    name: "The Reactor",
    accent: "#ff5757",
    tagline: "Speed is your advantage.",
    description:
      "You play fast, instinctively, and with high intensity. Your strength is explosive execution, but your performance can drop quickly when energy and habits are not well managed.",

    strengths: [
      "Fast reflexes",
      "High tempo",
      "Aggressive execution",
      "Quick reactions under pressure",
    ],

    watchOut: [
      "Impulsive decisions",
      "Energy crashes",
      "Poor nutrition habits",
      "Relying too heavily on caffeine",
    ],

    upgrade:
      "Create short reset rituals that help you maintain speed without sacrificing control.\n\nWant to take this build further? Click here to get in touch!",

    image: reactorGif,
  },

  sentinel: {
    name: "The Sentinel",
    accent: "#00bf63",
    tagline: "Consistency beats intensity.",
    description:
      "You build performance on a strong foundation. You are reliable, disciplined, and difficult to break over long sessions, even if your style is not always the most explosive.",

    strengths: [
      "Endurace",
      "Recovery awareness",
      "Discipline",
      "Stability and control",
    ],

    watchOut: [
      "Lower explosiveness",
      "Playing it too safe",
      "Slower adaptation",
      "Discomfort with sudden changes",
    ],

    upgrade:
      "Introduce controlled challenges that push your adaptability without disrupting consistency.\n\nWant to take this build further? Click here to get in touch!",

    image: sentinelGif,
  },

  catalyst: {
    name: "The Catalyst",
    accent: "#8c52ff",
    tagline: "Growth never stops.",
    description:
      "You learn quickly, adapt easily, and can perform in different ways depending on the situation. Your biggest opportunity is turning flexibility into a stable system.",

    strengths: [
      "Adaptability",
      "Fast learning",
      "Balance across different areas",
      "Versatility",
       ],

    watchOut: [
      "Changing direction before mastering a system",
      "Difficulty maintaining consistent routines",
    ],

    upgrade:
      "Choose one core system and refine it before moving toward the next opportunity.\n\nWant to take this build further? Click here to get in touch!",

    image: catalystGif,
  },
};