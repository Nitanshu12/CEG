import PageHeader from "@/components/PageHeader";
import EventList from "@/components/EventList";
import { getPastEvents, getUpcomingEvents } from "@/lib/content";

export const metadata = {
  title: "Events",
  description: "Upcoming CEG events and reports from past roundtables, conferences and dialogues.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <>
      <PageHeader title="Events" lead="Roundtables, conferences and dialogues that bring research into the room." />

      <section className="section section--tight" id="upcoming">
        <div className="container split-head">
          <div>
            <h2>Upcoming events</h2>
            <p className="lead">Dates, times and venues for what is next on the CEG calendar.</p>
          </div>
          <EventList events={upcoming} />
        </div>
      </section>

      <section className="section" id="reports">
        <div className="container split-head">
          <div>
            <h2>Event reports</h2>
            <p className="lead">Summaries of the discussions we have hosted.</p>
          </div>
          <EventList events={past} linkLabel="Read report" />
        </div>
      </section>
    </>
  );
}
