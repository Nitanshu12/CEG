import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PublicationsExplorer from "@/components/PublicationsExplorer";
import { getPublications, getPublicationTypes, getResearchAreas } from "@/lib/content";

export const metadata = {
  title: "Publications",
  description: "Analysis, briefs, reports, journal articles and podcasts from CEG researchers.",
};

export default async function PublicationsPage() {
  const [publications, types, areas] = await Promise.all([getPublications(), getPublicationTypes(), getResearchAreas()]);

  // The explorer runs in the browser, so pass it only the fields it shows.
  const list = publications.map(({ body, ...rest }) => rest);
  const areaOptions = areas.map(({ slug, title, shortTitle }) => ({ slug, title, shortTitle }));

  return (
    <>
      <PageHeader title="Publications" lead="Analysis, briefs, reports, journal articles and podcasts from CEG researchers." />
      <section className="section section--tight">
        <div className="container">
          {/* Suspense is required because the explorer reads the page URL */}
          <Suspense>
            <PublicationsExplorer publications={list} types={types} areas={areaOptions} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
