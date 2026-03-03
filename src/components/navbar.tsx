import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  return (
    <header className="py-8 px-4 bg-card">
      <nav className="text-dark-blue rounded-2xl flex items-center justify-between mx-4">
        <Link
          to="/"
          className="shrink-0 px-6 hover:rotate-12 transition-transform duration-200"
        >
          <img
            src="/logo-transparent.png"
            alt="Let's Give Back"
            className="size-24"
          />
        </Link>

        <div className="flex items-center">
          {links.map((link) => (
            <Link
              to={link.label}
              key={link.to}
              className="text-2xl font-hanneat uppercase font-semibold px-4 hover:text-primary-orange"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
