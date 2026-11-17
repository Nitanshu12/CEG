// Site-wide details. Values marked "placeholder" must be replaced before launch.

export const site = {
  name: "Centre for Economic Growth",
  shortName: "CEG",
  tagline: "Prioritising Policy Praxis",
  description:
    "Centre for Economic Growth (CEG) is an independent policy think tank advancing India's national interest through evidence based research, constructive advocacy and high-quality policy dialogue.",
  url: "https://www.example.org", // placeholder

  contact: {
    email: "info@example.org", // placeholder
    phone: "", // placeholder: add when available
    addressLines: ["Office address to be added", "New Delhi, India"], // placeholder
  },

  // icon: a key from components/SocialIcons.js
  social: [
    { label: "LinkedIn", href: "#", icon: "linkedin" }, // placeholder links
    { label: "X", href: "#", icon: "x" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],

  // Only languages with `available: true` can be selected.
  languages: [
    { code: "en", label: "English", available: true },
    { code: "hi", label: "Hindi (coming soon)", available: false },
  ],
};
