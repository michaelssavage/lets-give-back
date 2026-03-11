import { Footer } from "@/components/footer";
import { Layout } from "@/components/layout";
import { Navbar } from "@/components/navbar";
import { NotFound } from "@/components/not-found";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import appCss from "../styles/root.css?url";

interface RootRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "Let's Give Back" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "Let's Give Back" },
      { property: "og:site_name", content: "Let's Give Back" },
      {
        property: "description",
        content:
          "A community-focused organisation with a primary mission to support key groups",
      },
      {
        property: "og:description",
        content:
          "A community-focused organisation with a primary mission to support key groups",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        <Layout>{children}</Layout>
        <Footer />

        <Toaster />
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
