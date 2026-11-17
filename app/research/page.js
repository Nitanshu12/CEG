import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import { getAbout, getResearchAreas } from "@/lib/content";

export const metadata = {
  title: "Research",
  description: "CEG's research is organised around five sectors foundational to India's next phase of growth.",
};

export default async function ResearchPage() {
  const about = await getAbout();
  const areas = await getResearchAreas();

  return (
    <>
      <PageHeader title="Research" lead={about.focusAreas.text} />

      <section className="section section--tight">
        <div className="container">
          {areas.map((area, index) => (
            <article className="area-card" key={area.slug}>
              <Media image={area.image} label={area.shortTitle} sizes="(min-width: 60rem) 40vw, 100vw" priority={index === 0} />
              <div>
                <h2>
                  <Link href={`/research/${area.slug}`}>{area.title}</Link>
                </h2>
                <p>{area.summary}</p>
                <ul className="chips">
                  {area.themes.map((theme) => (
                    <li className="chip" key={theme}>
                      {theme}
                    </li>
                  ))}
                </ul>
                <Link className="link" href={`/research/${area.slug}`} aria-label={`Explore ${area.title}`}>
                  Explore this area
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
