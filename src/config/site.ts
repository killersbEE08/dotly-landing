export const site = {
  name: "Dotly",
  parent: "Prince Labs",
  developer: "One Eleven Dev",
  attribution: "A Prince Labs product",
  tagline: "See your life, one dot at a time",
  description:
    "Dotly turns your life into a living calendar — a quiet grid of dots on your wallpaper and home screen that shows how far you've come and how much time is left. Built to make every day count.",
  storeUrl: "https://play.google.com/store/apps/details?id=com.dotly.app",
  url: "https://dotly.princelabs.me",
  parentUrl: "https://princelabs.me",
  email: "hello@princelabs.me",
  ogImage: "/og.png",
  social: {
    github: "https://github.com/princelabs",
    x: "https://x.com/princelabs",
    linkedin: "https://www.linkedin.com/company/princelabs",
  },
} as const;

export const nav = [
  { label: "The idea", href: "#idea" },
  { label: "Features", href: "#features" },
  { label: "Widgets", href: "#widgets" },
  { label: "How it works", href: "#how" },
  { label: "Download", href: "#download" },
] as const;
