import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getEvent, getEvents, getResearchArea } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getToday } from "@/lib/today";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const area = await getResearchArea(event.area);
  const isUpcoming = event.date >= (await getToday());

  return (
    <>
      <PageHeader title={event.title} lead={event.summary} trail={[{ label: "Events", href: "/events" }]}>
        <ul className="meta">
          <li className="meta__type">{event.format}</li>
          <li>
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </li>
          <li>{isUpcoming ? "Upcoming" : "Event report"}</li>
        </ul>
      </PageHeader>

      <section className="section section--tight">
        <div className="container article">
          <div className="prose">
            {event.report ? (
              event.report.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p>{isUpcoming ? "The full programme and speaker list will be published here closer to the date." : "The report for this event will be published here soon."}</p>
            )}
          </div>

          <aside className="panel">
            <h2 className="panel__title">Event details</h2>
            <dl className="facts">
              <div>
                <dt>Date</dt>
                <dd>{formatDate(event.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{event.time}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{event.venue}</dd>
              </div>
              {area && (
                <div>
                  <dt>Research area</dt>
                  <dd>
                    <Link className="text-link" href={`/research/${area.slug}`}>
                      {area.title}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
            {isUpcoming &&
              (event.registrationUrl ? (
                <a className="btn btn--primary" href={event.registrationUrl}>
                  Register for this event
                </a>
              ) : (
                <>
                  <Link className="btn" href="/contact">
                    Ask about this event
                  </Link>
                  <p className="panel__note">Registration has not opened yet.</p>
                </>
              ))}
          </aside>
        </div>
      </section>
    </>
  );
}
