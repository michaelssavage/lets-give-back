import { Link } from "@tanstack/react-router";
import { SITE_NAME } from "../utils/constants";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-60 transition-all">
      <nav className="text-dark-blue rounded-2xl flex items-center justify-between gap-16 px-8 py-4 transition-all duration-200 w-full">
        <h1 className="text-xl font-bold text-nowrap hover:text-primary-blue uppercase">
          <Link to="/">{SITE_NAME}</Link>
        </h1>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.to} className="text-lg uppercase font-semibold">
              <Link to={link.to} className="hover:text-primary-blue">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
