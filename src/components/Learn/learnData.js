import nutritionXpImage from "../../assets/learn/pillars/nutrition-xp.webp";
import scienceLabImage from "../../assets/learn/pillars/science-lab.webp";
import wellbeingBuffsImage from "../../assets/learn/pillars/wellbeing-buffs.webp";
import unfilteredImage from "../../assets/learn/pillars/unfiltered.webp";

export const learnCategories = {
  "Nutrition XP": {
    image: nutritionXpImage,
    alt: "Animated Nutrition XP pillar graphic",
  },

  "Science Lab": {
    image: scienceLabImage,
    alt: "Animated Science Lab pillar graphic",
  },

  "Wellbeing Buffs": {
    image: wellbeingBuffsImage,
    alt: "Animated Wellbeing Buffs pillar graphic",
  },

  UNFILTERED: {
    image: unfilteredImage,
    alt: "Animated UNFILTERED pillar graphic",
  },
};

export const learnContent = [
{
  id: "pre-game-fueling",
  type: "article",
  category: "Nutrition XP",
  title: "Fuel Before You Queue",
  description:
    "A practical approach to pre-game nutrition for stable energy, focus and performance.",
  duration: "4 min read",

  content: [
    {
      type: "paragraphs",
      paragraphs: [
        "Gaming performance is not only mechanical. Long sessions require sustained attention, decision-making and consistent energy availability.",
        "A suitable pre-game meal should support performance without causing heaviness, discomfort or an energy crash.",
      ],
    },

    {
      type: "tip",
      label: "QUICK TIPS",
      title: "Fuel for Performance - Not Fullness",
      text:
        "Choose a meal that gives you stable energy without making you feel heavy, sleepy or uncomfortable during play.",
    },

    {
      type: "paragraphs",
      paragraphs: [
        "A useful pre-game meal usually combines accessible carbohydrates for energy with a moderate source of protein for satiety and recovery. You should also aim for familiar portions that feel comfortable and foods you have already tested during normal sessions.",
        "The ideal choice depends on timing, appetite and personal tolerance. The goal is preparation, not perfection.",
      ],
    },

    {
      type: "list",
      items: [
        "Yogurt with oats and fruit",
        "A sandwich with a lean protein source",
        "Rice with eggs and vegetables",
        "Toast with banana and yogurt",
      ],
    },

    {
      type: "quote",
      text:
        "Test your pre-game meal during ordinary sessions before relying on it during an important match or tournament.",
    },
  ],
},

  {
    id: "hydration-performance",
    type: "video",
    status: "coming-soon",
    category: "Nutrition XP",
    title: "Hydration Is a Performance Mechanic",
    description:
      "A short breakdown of why hydration deserves a place in every gaming setup.",
    duration: "0:48",
    featured: false,

    videoUrl: "",
  },

  {
    id: "caffeine-ranked",
    type: "article",
    category: "Science Lab",
    title: "Caffeine Without the Crash",
    description:
      "A smarter way to use caffeine for focus, alertness, and performance without overdoing it.",
    duration: "3 min read",
    featured: false,

content: [
  {
    type: "paragraphs",
    paragraphs: [
      "Caffeine can be a useful performance tool when used intentionally. It may help with alertness, reaction time, and sustained focus, but the benefit depends on dose, timing, and your own tolerance.",
      "Used poorly, it can leave you overstimulated, distracted, or crashing later in the session.",
    ],
  },

  {
    type: "tip",
    label: "QUICK RULE",
    title: "Use Caffeine Strategically",
    text:
      "Start with the smallest effective dose and avoid turning it into a habit you rely on every single time you play.",
  },

  {
    type: "paragraphs",
    paragraphs: [
      "Late caffeine intake may interfere with sleep, even when falling asleep does not initially feel difficult.",
      "Since sleep affects recovery and performance, caffeine usage should consider the entire day rather than a single session.",
      "Caffeine is not about maximum stimulation. It is about control, consistency, and knowing when it actually helps. Coffee, tea, or caffeine tablets can all work, but the best option is the one you tolerate well and can use predictably.",
    ],
  },

  {
    type: "quote",
    text:
      "If caffeine improves your play but ruins your sleep, it is helping the match and hurting the next one.",
  },
],
  },

  {
    id: "sleep-reaction-time",
    type: "video",
    status: "coming-soon",
    category: "Wellbeing Buffs",
    title: "Sleep Versus Reaction Time",
    description:
      "Why another hour of practice may be less valuable than another hour of sleep.",
    duration: "0:55",
    featured: false,

    videoUrl: "",
  },
];