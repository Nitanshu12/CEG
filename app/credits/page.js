import PageHeader from "@/components/PageHeader";
import { getImageCredits } from "@/lib/content";

export const metadata = { title: "Photo credits" };

// Lists the credit for every stand-in photo in content/images.js.
// The licences require this page while those photos are in use.
export default async function CreditsPage() {
  const credits = await getImageCredits();

  return (
    <>
      <PageHeader title="Photo credits" lead="Photographs on this site that are used under an open licence." />
      <section className="section section--tight">
        <div className="container">
          <ul className="credits">
            {credits.map((image) => (
              <li key={image.src}>
                {image.alt}.{" "}
                <a className="text-link" href={image.credit.href}>
                  {image.credit.author}
                </a>
                , {image.credit.licence}, via Wikimedia Commons.
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
