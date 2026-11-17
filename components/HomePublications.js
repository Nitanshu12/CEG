"use client";

import { useState } from "react";
import Link from "next/link";
import Media from "./Media";
import PublicationCard from "./PublicationCard";
import PublicationMeta from "./PublicationMeta";

// Homepage block: publication-type tabs over the newest publications.
//   Left:  the lead story (its text panel overlaps the picture), then two
//          picture cards.
//   Right: a list of the next five, set lower, and links to browse by area.
// Receives its data from the page, so it never touches the content layer.
export default function HomePublications({ publications, types, areas }) {
  const [type, setType] = useState("all");

  const tabs = [{ slug: "all", label: "All" }, ...types];
  const typeLabel = (slug) => types.find((item) => item.slug === slug)?.singular;
  const areaLabel = (slug) => areas.find((item) => item.slug === slug)?.shortTitle;
  const visible = (type === "all" ? publications : publications.filter((item) => item.type === type)).slice(0, 8);
  const [lead, ...others] = visible;
  const cards = others.slice(0, 2);
  const rest = others.slice(2);

  return (
    <>
      <div className="tabs" role="group" aria-label="Filter publications by type">
        {tabs.map((tab) => (
          <button className="tab" type="button" key={tab.slug} aria-pressed={type === tab.slug} onClick={() => setType(tab.slug)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="home-pubs">
        {lead ? (
          <div>
          <article className="home-lead">
            <Media image={lead.image} label={areaLabel(lead.area)} shape="wide" sizes="(min-width: 60rem) 60vw, 100vw" />
            <div className="home-lead__panel">
              <h3>
                <Link href={`/publications/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <PublicationMeta publication={lead} typeLabel={typeLabel(lead.type)} />
              <p>{lead.summary}</p>
            </div>
          </article>

          {cards.length > 0 && (
            <div className="home-pubs__cards">
              {cards.map((publication) => (
                <PublicationCard publication={publication} typeLabel={typeLabel(publication.type)} areaLabel={areaLabel(publication.area)} showSummary={false} shape={null} sizes="(min-width: 60rem) 30vw, 100vw" key={publication.slug} />
              ))}
            </div>
          )}
          </div>
        ) : (
          <p className="empty">Nothing of this type has been published yet.</p>
        )}

        <div className="home-pubs__side">
          {rest.length > 0 && (
          <ul className="home-pubs__list">
            {rest.map((publication) => (
              <li key={publication.slug}>
                <h3 className="row-title">
                  <Link href={`/publications/${publication.slug}`}>{publication.title}</Link>
                </h3>
                <PublicationMeta publication={publication} typeLabel={typeLabel(publication.type)} />
              </li>
            ))}
          </ul>
          )}

          <nav className="home-pubs__browse" aria-labelledby="browse-areas">
            <h3 id="browse-areas">Browse by research area</h3>
            <ul className="chips">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link className="chip" href={`/research/${area.slug}`}>
                    {area.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
