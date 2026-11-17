import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import { getAbout, getResearchAreas } from "@/lib/content";

export const metadata = {
  title: "About us",
  description: "Who we are, our vision and mission, core idea, focus areas and guiding principles.",
};

// The links in the side menu; each `id` matches a section below.
const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "vision-mission", label: "Vision and mission" },
  { id: "core-idea", label: "Core idea" },
  { id: "focus-areas", label: "Our focus areas" },
  { id: "guiding-principles", label: "Guiding principles" },
];

function Points({ items }) {
  return (
    <ul className="points">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function AboutPage() {
  const about = await getAbout();
  const areas = await getResearchAreas();

  return (
    <>
      <PageHeader title="About CEG" lead="An independent policy think tank committed to advancing India's national interest." />

      <section className="section section--tight">
        <div className="container about">
          <ul className="about__nav" aria-label="On this page">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
            <li>
              <Link href="/work-with-us">Work with us</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>

          <div>
            <section className="about__section" id="who-we-are">
              <h2>{about.whoWeAre.title}</h2>
              <div className="prose">
                {about.whoWeAre.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Media image="readingRoom" shape="banner" sizes="(min-width: 60rem) 70vw, 100vw" priority />
            </section>

            <section className="about__section" id="vision-mission">
              <div className="about__pair">
                <div>
                  <h2>{about.vision.title}</h2>
                  <p>{about.vision.text}</p>
                  <Points items={about.vision.points} />
                </div>
                <div>
                  <h2>{about.mission.title}</h2>
                  <p>{about.mission.text}</p>
                  <Points items={about.mission.points} />
                </div>
              </div>
            </section>

            <section className="about__section" id="core-idea">
              <h2>{about.coreIdea.title}</h2>
              <div className="prose">
                <p>{about.coreIdea.text}</p>
              </div>
              <Points items={about.coreIdea.points} />
            </section>

            <section className="about__section" id="focus-areas">
              <h2>{about.focusAreas.title}</h2>
              <p className="lead">{about.focusAreas.text}</p>
              <ul className="focus-list">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <h3 className="row-title">
                      <Link href={`/research/${area.slug}`}>{area.title}</Link>
                    </h3>
                    <p>{area.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="about__section" id="guiding-principles">
              <h2>{about.principles.title}</h2>
              <div className="prose">
                <p>{about.principles.text}</p>
              </div>
              <div className="principle-grid">
                {about.principles.items.map((item) => (
                  <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
