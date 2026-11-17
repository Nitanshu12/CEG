import { FaLinkedinIn, FaXTwitter, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";

// Maps the `icon` key used in content/site.js to an icon.
const icons = {
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  youtube: FaYoutube,
  facebook: FaFacebookF,
  instagram: FaInstagram,
};

export default function SocialLinks({ links }) {
  return (
    <ul className="social">
      {links.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.label}>
            <a href={link.href} aria-label={`CEG on ${link.label}`}>
              {Icon ? <Icon aria-hidden="true" /> : link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
