import Link from "next/link";
import { notFound } from "next/navigation";
import { LuDownload } from "react-icons/lu";
import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import PublicationCard from "@/components/PublicationCard";
import PublicationMeta from "@/components/PublicationMeta";
import { getPublication, getPublications, getPublicationTypes, getResearchArea } from "@/lib/content";

export async function generateStaticParams() {
  const publications = await getPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  return publication ? { title: publication.title, description: publication.summary } : {};
}

export default async function PublicationPage({ params }) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  if (!publication) notFound();

  const [types, area, sameArea] = await Promise.all([getPublicationTypes(), getResearchArea(publication.area), getPublications({ area: publication.area })]);
  const typeLabel = (typeSlug) => types.find((type) => type.slug === typeSlug)?.singular;
  const related = sameArea.filter((item) => item.slug !== publication.slug).slice(0, 3);

  return (
    <>
      <PageHeader title={publication.title} lead={publication.summary} trail={[{ label: "Publications", href: "/publications" }]}>
        <PublicationMeta publication={publication} typeLabel={typeLabel(publication.type)} />
      </PageHeader>

      <section className="section section--tight">
        <div className="container article">
          <div>
            {publication.image && <Media image={publication.image} shape="wide" sizes="(min-width: 60rem) 60vw, 100vw" priority />}
            <div className="prose" style={publication.image ? { marginTop: "var(--space-xl)" } : undefined}>
              {publication.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="panel">
            <h2 className="panel__title">About this publication</h2>
            <dl className="facts">
              <div>
                <dt>Authors</dt>
                <dd>{publication.authors.join(", ")}</dd>
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
            {publication.pdf ? (
              <a className="btn btn--primary" href={publication.pdf} download>
                <LuDownload aria-hidden="true" />
                Download PDF
              </a>
            ) : (
              <>
                <span className="btn" aria-disabled="true">
                  <LuDownload aria-hidden="true" />
                  Download PDF
                </span>
                <p className="panel__note">The PDF has not been added yet.</p>
              </>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Related publications</h2>
              <Link className="link" href="/publications">
                View all publications
              </Link>
            </div>
            <div className="card-grid">
              {related.map((item) => (
                <PublicationCard publication={item} typeLabel={typeLabel(item.type)} areaLabel={area?.shortTitle} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
