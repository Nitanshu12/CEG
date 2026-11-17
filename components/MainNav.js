"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronDown, LuMenu, LuSearch, LuX } from "react-icons/lu";

// The main menu. On wide screens the dropdown panels open on hover and on
// keyboard focus (CSS only, see styles/layout.css). On narrow screens the
// menu button opens the whole menu as one list.
export default function MainNav({ items }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCurrent = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close the mobile menu and any open dropdown after a link is chosen.
  const close = () => {
    setOpen(false);
    document.activeElement?.blur();
  };

  return (
    <>
      <nav className="nav" id="main-nav" aria-label="Main" data-open={open}>
        <ul className="nav__list">
          {items.map((item) => (
            <li className="nav__item" key={item.href}>
              <Link className="nav__link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={close}>
                {item.label}
                {item.children && <LuChevronDown aria-hidden="true" />}
              </Link>

              {item.children && (
                <div className="nav__panel">
                  <ul className="nav__sublist">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link className="nav__sublink" href={child.href} onClick={close}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="nav__blurb">
                    <p>{item.blurb}</p>
                    <Link className="link" href={item.href} onClick={close}>
                      Go to {item.label.toLowerCase()}
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-tools">
        <Link className="icon-button" href="/publications" aria-label="Search publications">
          <LuSearch aria-hidden="true" />
        </Link>
        <button className="icon-button menu-button" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}
