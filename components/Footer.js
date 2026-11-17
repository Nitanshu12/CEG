import Link from "next/link";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { getNavigation, getSite } from "@/lib/content";
import { getToday } from "@/lib/today";

export default async function Footer() {
  const site = await getSite();
  const { footerNav } = await getNavigation();
  const year = (await getToday()).slice(0, 4);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo onInk />
            <p className="footer__tagline">{site.tagline}</p>
            <address className="footer__address">
              {site.contact.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </address>
          </div>

          <nav className="footer__columns" aria-label="Footer">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h2 className="footer__title">{column.title}</h2>
                <ul className="footer__links">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}
          </p>
          <SocialLinks links={site.social} />
        </div>
      </div>
    </footer>
  );
}
