"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import PublicationCard from "./PublicationCard";

// The searchable publications list: a search box, type tabs and an area
// filter. All filtering happens in the browser on the list the page passes
// in. A link such as /publications?type=podcasts opens with that tab chosen.
export default function PublicationsExplorer({ publications, types, areas }) {
  const params = useSearchParams();
  const typeFromUrl = params.get("type");

  // The tab follows the URL until the visitor picks one themselves.
  const [picked, setPicked] = useState({ forUrl: typeFromUrl, type: null });
  const chosen = picked.forUrl === typeFromUrl ? picked.type : null;
  const type = chosen ?? (types.some((item) => item.slug === typeFromUrl) ? typeFromUrl : "all");
  const setType = (slug) => setPicked({ forUrl: typeFromUrl, type: slug });

  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");

  const tabs = [{ slug: "all", label: "All" }, ...types];
  const typeLabel = (slug) => types.find((item) => item.slug === slug)?.singular;
  const areaTitle = (slug) => areas.find((item) => item.slug === slug);

  const words = query.trim().toLowerCase();
  const results = publications.filter((item) => {
    if (type !== "all" && item.type !== type) return false;
    if (area !== "all" && item.area !== area) return false;
    if (!words) return true;
    const text = [item.title, item.summary, item.authors.join(" "), areaTitle(item.area)?.title].join(" ").toLowerCase();
    return text.includes(words);
  });

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <div className="field">
          <label htmlFor="publication-search">Search publications</label>
          <div className="explorer__search">
            <LuSearch aria-hidden="true" />
            <input className="input" id="publication-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, topic or author" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="publication-area">Research area</label>
          <select className="select" id="publication-area" value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="all">All research areas</option>
            {areas.map((item) => (
              <option value={item.slug} key={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tabs" role="group" aria-label="Filter by publication type">
        {tabs.map((tab) => (
          <button className="tab" type="button" key={tab.slug} aria-pressed={type === tab.slug} onClick={() => setType(tab.slug)}>
            {tab.label}
          </button>
        ))}
      </div>

      <p className="explorer__count" role="status">
        {results.length === 1 ? "1 publication" : `${results.length} publications`}
      </p>

      {results.length > 0 ? (
        <div className="card-grid">
          {results.map((publication) => (
            <PublicationCard publication={publication} typeLabel={typeLabel(publication.type)} areaLabel={areaTitle(publication.area)?.shortTitle} key={publication.slug} />
          ))}
        </div>
      ) : (
        <p className="empty">No publications match these filters. Try a different search or clear a filter.</p>
      )}
    </div>
  );
}
