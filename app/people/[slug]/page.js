import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { getPeople, getPerson, getResearchAreas } from "@/lib/content";

export async function generateStaticParams() {
  const people = await getPeople();
  return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const person = await getPerson(slug);
  return person ? { title: person.name, description: `${person.name}, ${person.role} at the Centre for Economic Growth.` } : {};
}

export default async function PersonPage({ params }) {
  const { slug } = await params;
  const person = await getPerson(slug);
  if (!person) notFound();

  const areas = (await getResearchAreas()).filter((area) => person.areas.includes(area.slug));
  const role = person.lead ? `${person.role}. Lead, ${person.lead}` : person.role;

  return (
    <>
      <PageHeader title={person.name} lead={role} trail={[{ label: "People", href: "/people" }]} />
      <section className="section section--tight">
        <div className="container profile">
          <Portrait person={person} sizes="(min-width: 60rem) 30vw, 240px" />
          <div>
            <div className="prose">
              <p>{person.bio}</p>
            </div>
            {areas.length > 0 && (
              <ul className="chips" style={{ marginTop: "var(--space-xl)" }} aria-label="Research areas">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link className="chip" href={`/research/${area.slug}`}>
                      {area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
