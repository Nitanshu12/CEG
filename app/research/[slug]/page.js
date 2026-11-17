import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import PublicationCard from "@/components/PublicationCard";
import PersonCard from "@/components/PersonCard";
import { getPeopleByArea, getPublications, getPublicationTypes, getResearchArea, getResearchAreas } from "@/lib/content";

export async function generateStaticParams() {
  const areas = await getResearchAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = await getResearchArea(slug);
  return area ? { title: area.title, description: area.summary } : {};
}

export default async function ResearchAreaPage({ params }) {
  const { slug } = await params;
  const area = await getResearchArea(slug);
  if (!area) notFound();

  const [publications, types, experts] = await Promise.all([getPublications({ area: slug, limit: 3 }), getPublicationTypes(), getPeopleByArea(slug)]);
  const typeLabel = (typeSlug) => types.find((type) => type.slug === typeSlug)?.singular;

  return (
    <>
      <PageHeader title={area.title} lead={area.summary} trail={[{ label: "Research", href: "/research" }]} />

      <section className="section section--tight">
        <div className="container">
          <Media image={area.image} label={area.shortTitle} shape="banner" sizes="100vw" priority />
          <div className="area-intro">
            <div className="prose">
              <p>{area.description}</p>
            </div>
            <aside className="panel">
              <h2 className="panel__title">Themes</h2>
              <ul className="chips">
                {area.themes.map((theme) => (
                  <li className="chip" key={theme}>
                    {theme}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {publications.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Publications in this area</h2>
              <Link className="link" href="/publications">
                View all publications
              </Link>
            </div>
            <div className="card-grid">
              {publications.map((publication) => (
                <PublicationCard publication={publication} typeLabel={typeLabel(publication.type)} areaLabel={area.shortTitle} key={publication.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {experts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Experts</h2>
              <Link className="link" href="/people">
                Meet the full team
              </Link>
            </div>
            <div className="card-grid card-grid--4">
              {experts.map((person) => (
                <PersonCard person={person} key={person.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
