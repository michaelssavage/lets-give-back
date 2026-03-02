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
      <nav className="bg-secondary rounded-2xl flex items-center justify-between gap-16 px-8 py-4 transition-all duration-200 w-full">
        <h1 className="text-xl font-semibold text-white hover:text-silver text-nowrap">
          <Link to="/">{SITE_NAME}</Link>
        </h1>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.to} className="text-lg">
              <Link to={link.to} className="text-white hover:text-silver">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
