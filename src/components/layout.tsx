import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen p-4 mt-[15vh] mb-8">{children}</div>;
};
