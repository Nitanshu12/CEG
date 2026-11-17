import Link from "next/link";
import { dateParts } from "@/lib/format";

// A ruled list of events, each with a date block.
// `linkLabel` is the text of the link at the end of each row.
export default function EventList({ events, linkLabel = "Details" }) {
  if (events.length === 0) {
    return <p className="empty">No events are listed at the moment. Please check back soon.</p>;
  }

  return (
    <ul className="event-list">
      {events.map((event) => {
        const date = dateParts(event.date);
        return (
          <li className="event-row" key={event.slug}>
            <time className="date-block" dateTime={event.date}>
              <span className="date-block__day">{date.day}</span>
              <span className="date-block__month">
                {date.month} {date.year}
              </span>
            </time>
            <div>
              <h3 className="row-title">
                <Link href={`/events/${event.slug}`}>{event.title}</Link>
              </h3>
              <ul className="meta">
                <li className="meta__type">{event.format}</li>
                <li>{event.time}</li>
                <li>{event.venue}</li>
              </ul>
            </div>
            <Link className="link" href={`/events/${event.slug}`} aria-label={`${linkLabel}: ${event.title}`}>
              {linkLabel}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
