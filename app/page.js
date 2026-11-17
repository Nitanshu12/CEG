import Image from "next/image";
import Link from "next/link";
import Media from "@/components/Media";
import HomePublications from "@/components/HomePublications";
import PublicationMeta from "@/components/PublicationMeta";
import { LuArrowUpRight } from "react-icons/lu";
import EventList from "@/components/EventList";
import PersonCard from "@/components/PersonCard";
import { getAbout, getPastEvents, getPeopleGroups, getPublications, getPublicationTypes, getResearchAreas, getSite, getUpcomingEvents } from "@/lib/content";
import { getImage } from "@/lib/images";
import { dateParts, formatDate } from "@/lib/format";

// The routes listed in the "Work with CEG" panel; each links to /work-with-us.
const collaborationRoutes = ["Research partnerships", "Events and dialogue", "Fellowships and careers", "Internships"];

// The image key (from content/images.js) used behind the hero.
const HERO_IMAGE = "readingRoom";

export default async function HomePage() {
  const [site, about, areas, publications, types, events, reports, groups] = await Promise.all([
    getSite(),
    getAbout(),
    getResearchAreas(),
    getPublications(),
    getPublicationTypes(),
    getUpcomingEvents({ limit: 3 }),
    getPastEvents({ limit: 2 }),
    getPeopleGroups(),
  ]);

  const areaOptions = areas.map(({ slug, title, shortTitle }) => ({ slug, title, shortTitle }));
  const typeLabel = (slug) => types.find((type) => type.slug === slug)?.singular;
  const leadership = groups.find((group) => group.id === "leadership").members;
  const widerTeam = groups.filter((group) => group.id !== "leadership").flatMap((group) => group.members);

  // The hero panel shows the newest featured brief or report and the next
  // event. That publication is left out of the "Latest" list below it.
  const featured = publications.find((item) => item.featured && item.type === "briefs-reports") ?? publications[0];
  const latest = publications.filter((item) => item.slug !== featured.slug);
  const nextEvent = events[0];
  const heroImage = getImage(HERO_IMAGE);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <figure className="hero__bg" data-slot="hero">
          <Image src={heroImage.src} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: heroImage.position ?? "50% 50%" }} />
        </figure>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__inner">
          <div>
            <hr className="hero__rule" aria-hidden="true" />
            <h1>{about.whoWeAre.title}</h1>
            <p className="lead">An independent policy think tank linking sector research with India&apos;s economic strategy.</p>
            <div className="actions">
              <Link className="btn btn--primary" href="/research">
                Explore our research
              </Link>
              <Link className="btn" href="/work-with-us">
                Work with us
              </Link>
            </div>
          </div>

          <aside className="hero__sheet" aria-label="Featured publication and next event">
            <div className="hero__sheet-item">
              <h2 className="row-title">
                <Link href={`/publications/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <PublicationMeta publication={featured} typeLabel={typeLabel(featured.type)} />
              <p>{featured.summary}</p>
            </div>

            {nextEvent && (
              <div className="hero__sheet-item hero__event">
                <time className="date-block" dateTime={nextEvent.date}>
                  <span className="date-block__day">{dateParts(nextEvent.date).day}</span>
                  <span className="date-block__month">
                    {dateParts(nextEvent.date).month} {dateParts(nextEvent.date).year}
                  </span>
                </time>
                <div>
                  <h2 className="row-title">
                    <Link href={`/events/${nextEvent.slug}`}>{nextEvent.title}</Link>
                  </h2>
                  <ul className="meta">
                    <li className="meta__type">{nextEvent.format}</li>
                    <li>{nextEvent.venue}</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="hero__sheet-foot">
              <Link className="link" href="/publications">
                All publications
              </Link>
              <Link className="link" href="/events">
                All events
              </Link>
            </div>
          </aside>
        </div>

        <nav className="hero__areas" aria-label="Research areas">
          <div className="container">
            <ul>
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/research/${area.slug}`}>{area.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>

      {/* Latest publications: lead story with an overlapping panel, list set lower */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Latest from CEG</h2>
            <Link className="link" href="/publications">
              View all publications
            </Link>
          </div>
          <HomePublications publications={latest} types={types} areas={areaOptions} />
        </div>
      </section>

      {/* Research areas: staggered picture tiles */}
      <section className="band">
        <div className="container">
          <div className="areas-head">
            <h2>Five sectors, one growth agenda</h2>
            <div>
              <p className="lead">{about.focusAreas.text}</p>
              <Link className="link" href="/research">
                All research areas
              </Link>
            </div>
          </div>
          <ul className="area-grid">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link className="area-tile" href={`/research/${area.slug}`}>
                  <Media image={area.image} label={area.shortTitle} sizes="(min-width: 60rem) 55vw, 100vw" />
                  <div className="area-tile__plate">
                    <h3>{area.title}</h3>
                    <p>{area.summary}</p>
                    <p className="area-tile__themes">{area.themes.join(", ")}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement beside the vision */}
      <section className="section">
        <div className="container statement-row">
          <blockquote className="statement">
            <p>Policy conceived in silos cannot serve an economy that is, by its nature, deeply interconnected.</p>
            <footer>
              From our mission.{" "}
              <Link className="text-link" href="/about#vision-mission">
                Read the vision and mission
              </Link>
            </footer>
          </blockquote>
          <div className="statement-row__aside">
            <h3>{about.vision.title}</h3>
            <ul className="points">
              {about.vision.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Events: the next event as a navy card, the rest and recent reports beside it */}
      <section className="section">
        <div className="container home-events">
          {nextEvent && (
            <article className="event-feature on-ink">
              <time className="event-feature__date" dateTime={nextEvent.date}>
                <span>{dateParts(nextEvent.date).day}</span>
                {dateParts(nextEvent.date).month} {dateParts(nextEvent.date).year}
              </time>
              <div>
                <h3>
                  <Link href={`/events/${nextEvent.slug}`}>{nextEvent.title}</Link>
                </h3>
                <ul className="meta">
                  <li className="meta__type">{nextEvent.format}</li>
                  <li>{nextEvent.time}</li>
                  <li>{nextEvent.venue}</li>
                </ul>
                <p>{nextEvent.summary}</p>
                <Link className="btn" href={`/events/${nextEvent.slug}`}>
                  Event details
                </Link>
              </div>
            </article>
          )}

          <div className="home-events__main">
            <div className="section-head">
              <div>
                <h2>Upcoming events</h2>
                <p className="lead">Roundtables, conferences and dialogues that bring research into the room.</p>
              </div>
              <Link className="link" href="/events">
                All events
              </Link>
            </div>
            <EventList events={events.slice(1)} />

            {reports.length > 0 && (
              <div className="home-reports">
                <h3>Recent event reports</h3>
                <ul>
                  {reports.map((report) => (
                    <li key={report.slug}>
                      <Link href={`/events/${report.slug}`}>{report.title}</Link>
                      <time dateTime={report.date}>{formatDate(report.date)}</time>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Guiding principles: the photograph breaks out of the navy band */}
      <section className="band band--ink principles-band">
        <div className="container principles">
          <div>
            <h2>Research, advocacy, impact</h2>
            <dl className="principles__list">
              {about.principles.items.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.short}</dd>
                </div>
              ))}
            </dl>
            <Link className="btn" href="/about">
              About CEG
            </Link>
          </div>
          <div className="principles__photo">
            <Media image="studyHall" shape="tall" sizes="(min-width: 60rem) 40vw, 100vw" />
            <p className="principles__tag">{site.tagline}</p>
          </div>
        </div>
      </section>

      {/* People: head on the left, staggered portraits and the wider team on the right */}
      <section className="section">
        <div className="container home-people">
          <div className="home-people__head">
            <h2>The people behind the work</h2>
            <p className="lead">Academicians, technologists, industry leaders, former officials and policymakers on a common platform.</p>
            <Link className="btn" href="/people">
              Meet the full team
            </Link>
          </div>
          <div>
            <div className="home-people__grid">
              {leadership.map((person) => (
                <PersonCard person={person} key={person.slug} />
              ))}
            </div>
            <div className="home-people__more">
              <h3>Fellows and research team</h3>
              <ul className="chips">
                {widerTeam.map((person) => (
                  <li key={person.slug}>
                    <Link className="chip" href={`/people/${person.slug}`}>
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate: a panel with the ways to work with CEG rising out of it */}
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Work with CEG</h2>
              <p className="lead">We partner with governments, regulators, industry and research institutions.</p>
              <div className="actions">
                <Link className="btn btn--primary" href="/work-with-us">
                  Ways to collaborate
                </Link>
                <Link className="btn" href="/contact">
                  Contact us
                </Link>
              </div>
            </div>
            <ul className="cta-panel__ways">
              {collaborationRoutes.map((route) => (
                <li key={route}>
                  <Link href="/work-with-us">
                    {route}
                    <LuArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
