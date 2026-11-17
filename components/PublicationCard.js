import Link from "next/link";
import Media from "./Media";
import PublicationMeta from "./PublicationMeta";

// A publication as a card: picture, title, meta line and (optionally) summary.
// `areaLabel` is shown in type when the publication has no picture.
export default function PublicationCard({ publication, typeLabel, areaLabel, showSummary = true, shape = "wide", sizes }) {
  return (
    <article className="pub-card">
      <Media image={publication.image} label={areaLabel} shape={shape} sizes={sizes} />
      <h3 className="pub-card__title">
        <Link href={`/publications/${publication.slug}`}>{publication.title}</Link>
      </h3>
      <PublicationMeta publication={publication} typeLabel={typeLabel} />
      {showSummary && <p className="pub-card__summary">{publication.summary}</p>}
    </article>
  );
}
