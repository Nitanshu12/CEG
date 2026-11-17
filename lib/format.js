// Small formatting helpers shared by pages and components.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Dates are stored as "YYYY-MM-DD" and split by hand so the result never
// shifts with the server's or the visitor's time zone.
function parts(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return { year, month, day };
}

/** "2026-10-28" -> "28 October 2026" */
export function formatDate(isoDate) {
  const { year, month, day } = parts(isoDate);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** "2026-10-28" -> { day: "28", month: "Oct", year: "2026" } */
export function dateParts(isoDate) {
  const { year, month, day } = parts(isoDate);
  return { day: String(day), month: MONTHS[month - 1].slice(0, 3), year: String(year) };
}

/** "Shaurya Doval" -> "SD" (titles such as "Dr." are skipped) */
export function initials(name) {
  const words = name.split(" ").filter((word) => !word.endsWith("."));
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}
