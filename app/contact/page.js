import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getSite } from "@/lib/content";

export const metadata = {
  title: "Contact us",
  description: "Get in touch with the Centre for Economic Growth.",
};

export default async function ContactPage() {
  const site = await getSite();

  return (
    <>
      <PageHeader title="Contact us" lead="For research collaboration, events, media or general questions, write to us." />
      <section className="section section--tight">
        <div className="container contact">
          <ContactForm />
          <aside className="panel">
            <h2 className="panel__title">Reach us directly</h2>
            <dl className="facts">
              <div>
                <dt>Email</dt>
                <dd>
                  <a className="text-link" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{site.contact.phone}</dd>
                </div>
              )}
              <div>
                <dt>Office</dt>
                <dd>
                  {site.contact.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
