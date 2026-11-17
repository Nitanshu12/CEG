// THE CONTENT LAYER
//
// Every page gets its content through the functions in this file and never
// imports from /content directly. Today the functions read the local
// placeholder files. When a CMS is connected, only the inside of these
// functions changes (for example to `fetch` from the CMS API); the pages,
// components and styles stay as they are.
//
// All functions are async on purpose, so a later switch to network requests
// needs no change in the pages that call them.

import { site } from "@/content/site";
import { mainNav, footerNav } from "@/content/navigation";
import { getCreditedImages } from "@/lib/images";
import { about } from "@/content/about";
import { researchAreas } from "@/content/research-areas";
import { people, peopleGroups } from "@/content/people";
import { publications, publicationTypes } from "@/content/publications";
import { events } from "@/content/events";
import { getToday } from "@/lib/today";

const byNewest = (a, b) => b.date.localeCompare(a.date);
const byOldest = (a, b) => a.date.localeCompare(b.date);

/* ---------- Site ---------- */

export async function getSite() {
  return site;
}

export async function getNavigation() {
  return { mainNav, footerNav };
}

export async function getImageCredits() {
  return getCreditedImages();
}

/* ---------- About ---------- */

export async function getAbout() {
  return about;
}

/* ---------- Research areas ---------- */

export async function getResearchAreas() {
  return researchAreas;
}

export async function getResearchArea(slug) {
  return researchAreas.find((area) => area.slug === slug) ?? null;
}

/* ---------- People ---------- */

export async function getPeople() {
  return people;
}

export async function getPeopleGroups() {
  return peopleGroups.map((group) => ({
    ...group,
    members: people.filter((person) => person.group === group.id),
  }));
}

export async function getPerson(slug) {
  return people.find((person) => person.slug === slug) ?? null;
}

export async function getPeopleByArea(areaSlug) {
  return people.filter((person) => person.areas.includes(areaSlug));
}

/* ---------- Publications ---------- */

export async function getPublicationTypes() {
  return publicationTypes;
}

/** Newest first. Options: { type, area, featured, limit }. */
export async function getPublications({ type, area, featured, limit } = {}) {
  let list = [...publications].sort(byNewest);
  if (type) list = list.filter((item) => item.type === type);
  if (area) list = list.filter((item) => item.area === area);
  if (featured) list = list.filter((item) => item.featured);
  return limit ? list.slice(0, limit) : list;
}

export async function getPublication(slug) {
  return publications.find((item) => item.slug === slug) ?? null;
}

/* ---------- Events ---------- */

/** Soonest first. */
export async function getUpcomingEvents({ limit } = {}) {
  const today = await getToday();
  const list = events.filter((event) => event.date >= today).sort(byOldest);
  return limit ? list.slice(0, limit) : list;
}

/** Most recent first. */
export async function getPastEvents({ limit } = {}) {
  const today = await getToday();
  const list = events.filter((event) => event.date < today).sort(byNewest);
  return limit ? list.slice(0, limit) : list;
}

export async function getEvents() {
  return [...events].sort(byNewest);
}

export async function getEvent(slug) {
  return events.find((event) => event.slug === slug) ?? null;
}
