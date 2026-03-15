import { logoutFn } from "@/routes/_auth";
import { useMutation } from "@tanstack/react-query";
import {
  Link,
  useLocation,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pathname } = useLocation();
  const { user } = useRouteContext({ from: "__root__" });

  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: async () => {
      await router.invalidate();
      router.navigate({ to: "/" });
    },
  });

  const links = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="pt-4 md:pt-8 px-0 md:px-4 bg-card relative">
      {user ? (
        <div className="absolute top-2 right-4 flex items-center gap-2">
          <span className="hidden xs:inline">{user.email}</span>
          <span className="inline xs:hidden">Admin</span>
          <button
            type="button"
            className="hover:text-primary-orange text-dark-blue cursor-pointer"
            onClick={() => logoutMutation.mutate({ data: undefined })}
            title="Logout"
            disabled={logoutMutation.status === "pending"}
          >
            {logoutMutation.status === "pending" ? (
              "..."
            ) : (
              <LogOut className="size-5" />
            )}
          </button>
        </div>
      ) : null}
      <nav className="rounded-2xl flex items-center justify-between mx-4">
        <Link
          to="/"
          className="shrink-0 px-6 hover:rotate-12 transition-transform duration-200"
        >
          <img
            src="/logo-transparent.png"
            alt="Let's Give Back"
            className="size-16 md:size-32"
          />
        </Link>

        <div className="hidden md:flex items-center">
          {links.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className={`text-2xl font-hanneat uppercase font-semibold px-4 hover:text-primary-orange ${
                pathname === link.to ? "text-dark-orange" : "text-dark-blue"
              }`}
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
              className="absolute top-full inset-x-0 w-full bg-card shadow-lg rounded-xl z-11 py-6 flex flex-col items-center md:hidden"
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
              {user ? (
                <button
                  type="button"
                  className="flex leading-none items-center gap-2 text-xl font-hanneat uppercase font-semibold py-3 hover:text-primary-orange"
                  onClick={() => {
                    setOpen(false);
                    logoutMutation.mutate({ data: undefined });
                  }}
                  disabled={logoutMutation.status === "pending"}
                >
                  <LogOut className="size-6 -mt-[0.4rem]" />
                  {logoutMutation.status === "pending" ? "..." : "Logout"}
                </button>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
