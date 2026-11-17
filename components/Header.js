import Link from "next/link";
import Logo from "./Logo";
import MainNav from "./MainNav";
import SocialLinks from "./SocialLinks";
import { getNavigation, getSite } from "@/lib/content";

// Two rows, as in the brief: a top bar (social links, contact, language)
// above the logo and the main menu.
export default async function Header() {
  const site = await getSite();
  const { mainNav } = await getNavigation();

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <SocialLinks links={site.social} />
          <div className="topbar__group">
            <Link href="/contact">Contact us</Link>
            <div className="language">
              <label htmlFor="language">Language</label>
              <select id="language" name="language" defaultValue="en">
                {site.languages.map((language) => (
                  <option key={language.code} value={language.code} disabled={!language.available}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <MainNav items={mainNav} />
        </div>
      </header>
    </>
  );
}
