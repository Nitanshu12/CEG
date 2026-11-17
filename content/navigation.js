// Main menu. Each item may have `children` (the dropdown links) and a
// `blurb` shown beside them in the dropdown panel.

export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    href: "/about",
    blurb: "An independent policy think tank committed to advancing India's national interest.",
    children: [
      { label: "Who we are", href: "/about#who-we-are" },
      { label: "Vision and mission", href: "/about#vision-mission" },
      { label: "Core idea", href: "/about#core-idea" },
      { label: "Our focus areas", href: "/about#focus-areas" },
      { label: "Guiding principles", href: "/about#guiding-principles" },
      { label: "Work with us", href: "/work-with-us" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    blurb: "Five sectors we believe are foundational to India's next phase of growth.",
    children: [
      { label: "Defence and strategic technologies", href: "/research/defence-strategic-technologies" },
      { label: "AI and frontier technology", href: "/research/ai-frontier-technology" },
      { label: "Energy security", href: "/research/energy-security" },
      { label: "Urban water management", href: "/research/urban-water-management" },
      { label: "Economic strategy", href: "/research/economic-strategy" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    blurb: "Analysis, briefs, reports, journal articles and podcasts from CEG researchers.",
    children: [
      { label: "Latest analysis", href: "/publications?type=latest-analysis" },
      { label: "Briefs and reports", href: "/publications?type=briefs-reports" },
      { label: "Journals and articles", href: "/publications?type=journals-articles" },
      { label: "Podcasts", href: "/publications?type=podcasts" },
    ],
  },
  { label: "People", href: "/people" },
  {
    label: "Events",
    href: "/events",
    blurb: "Roundtables, conferences and dialogues that bring research into the room.",
    children: [
      { label: "Upcoming events", href: "/events#upcoming" },
      { label: "Event reports", href: "/events#reports" },
    ],
  },
];

// Footer link columns.
export const footerNav = [
  {
    title: "About",
    links: [
      { label: "Who we are", href: "/about#who-we-are" },
      { label: "Vision and mission", href: "/about#vision-mission" },
      { label: "Guiding principles", href: "/about#guiding-principles" },
      { label: "People", href: "/people" },
      { label: "Work with us", href: "/work-with-us" },
    ],
  },
  {
    title: "Research",
    links: mainNav.find((item) => item.href === "/research").children,
  },
  {
    title: "Publications",
    links: mainNav.find((item) => item.href === "/publications").children,
  },
  {
    title: "Connect",
    links: [
      { label: "Upcoming events", href: "/events#upcoming" },
      { label: "Event reports", href: "/events#reports" },
      { label: "Contact us", href: "/contact" },
      { label: "Photo credits", href: "/credits" },
    ],
  },
];
