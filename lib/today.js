// Today's date as "YYYY-MM-DD".
//
// Pages are pre-built, so "now" has to be a cached value: this one is
// refreshed about once an hour. It decides which events count as upcoming
// and which year the footer shows.

import { cacheLife } from "next/cache";

export async function getToday() {
  "use cache";
  cacheLife("hours");
  return new Date().toISOString().slice(0, 10);
}
