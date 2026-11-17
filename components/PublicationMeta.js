import { formatDate } from "@/lib/format";

// The line under a publication title: type, date, reading time.
export default function PublicationMeta({ publication, typeLabel }) {
  return (
    <ul className="meta">
      {typeLabel && <li className="meta__type">{typeLabel}</li>}
      <li>
        <time dateTime={publication.date}>{formatDate(publication.date)}</time>
      </li>
      <li>{publication.readTime}</li>
    </ul>
  );
}
