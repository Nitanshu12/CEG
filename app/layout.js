import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { site } from "@/content/site";

// COLOUR PALETTE. One of:
//   navy brand colour:  "navy-teal" (default), "navy-bronze", "navy-saffron", "navy-crimson"
//   other colours:      "deep-teal", "graphite-amber", "forest-gold", "burgundy-teal",
//                       "aubergine-teal", "espresso-teal", "olive-rust"
// The colours themselves are in
// styles/tokens.css (navy-teal) and styles/palettes.css (the others).
const PALETTE = "navy-crimson";

// Fonts are downloaded at build time and served from this site.
// Headings use Hanken Grotesk; body text uses Newsreader.
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-hanken" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-newsreader" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} (${site.shortName})`, template: `%s | ${site.shortName}` },
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-palette={PALETTE} className={`${hanken.variable} ${newsreader.variable}`}>
      <body>
        <PageLoader />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
