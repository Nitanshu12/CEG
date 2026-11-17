import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Work with us",
  description: "Ways to collaborate with the Centre for Economic Growth.",
};

// PLACEHOLDER copy: replace with CEG's final text for each route.
const ways = [
  {
    title: "Research partnerships",
    text: "Governments, regulators, industry bodies and research institutions can commission or co-author sector studies with CEG's fellows.",
  },
  {
    title: "Events and dialogue",
    text: "Co-host a roundtable, conference or closed-door consultation, or invite a CEG researcher to speak.",
  },
  {
    title: "Fellowships and careers",
    text: "Openings for fellows, researchers and staff will be listed here as they arise.",
  },
  {
    title: "Internships",
    text: "Details of the internship programme and how to apply will be added here.",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHeader title="Work with us" lead="We partner with governments, regulators, industry and research institutions." trail={[{ label: "About us", href: "/about" }]} />

      <section className="section section--tight">
        <div className="container">
          <ul className="ways">
            {ways.map((way) => (
              <li key={way.title}>
                <h2 className="row-title" style={{ fontSize: "var(--text-2xl)" }}>
                  {way.title}
                </h2>
                <p>{way.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="container cta">
          <div>
            <h2>Start a conversation</h2>
            <p className="lead">Tell us what you are working on and where CEG could help.</p>
          </div>
          <Link className="btn btn--primary" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
