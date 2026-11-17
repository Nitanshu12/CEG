// Image lookup, kept apart from lib/content.js so that browser-side
// components can use it without loading the rest of the content.

import { images } from "@/content/images";

/** Returns an image record ({ src, alt, ... }) for a key, or null. */
export function getImage(key) {
  return key ? images[key] ?? null : null;
}

/** Stand-in photos that need a credit line. */
export function getCreditedImages() {
  return Object.values(images).filter((image) => image.credit);
}
