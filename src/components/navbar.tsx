import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="py-4 md:py-8 px-0 md:px-4 bg-card relative">
      <nav className="text-dark-blue rounded-2xl flex items-center justify-between mx-4">
        <Link
          to="/"
          className="shrink-0 px-6 hover:rotate-12 transition-transform duration-200"
        >
          <img
            src="/logo-transparent.png"
            alt="Let's Give Back"
            className="size-12 md:size-24"
          />
        </Link>

        <div className="hidden md:flex items-center">
          {links.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className="text-2xl font-hanneat uppercase font-semibold px-4 hover:text-primary-orange"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden px-4"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full inset-x-0 w-full bg-card shadow-lg rounded-xl z-11 mt-4 py-6 flex flex-col items-center md:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-xl font-hanneat uppercase font-semibold py-3 hover:text-primary-orange"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
