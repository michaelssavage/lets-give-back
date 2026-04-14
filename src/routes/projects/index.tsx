import { getProjectsFn } from "@/api/projects.api";
import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { Card } from "@/components/card";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { SITE_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Projects" },
      { property: "og:title", content: "Projects" },
      { name: "description", content: "Projects" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Projects" },
      { property: "og:image", content: "/services/earth.jpg" },
      { property: "twitter:image", content: "/services/earth.jpg" },
      { property: "og:url", content: `${SITE_URL}/projects` },
    ],
  }),
});

function RouteComponent() {
  const {
    data: projects = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsFn,
    select: (data) => data.filter((project) => !project.isDraft),
  });

  if (!isLoading && error) {
    return <div>Error loading projects</div>;
  }

  return (
    <div className="min-h-screen text-center px-6 py-8 md:px-12 md:pb-16 max-w-5xl mx-auto">
      <h1>PROJECTS</h1>

      <p className="mt-4 mb-8 text-center text-base md:text-lg">
        Follow us on our socials for more updates:
        <Anchor
          href="https://www.facebook.com/people/Lets-Give-Back/61573558281380/"
          className={buttonStyles({
            variant: "secondary",
            size: "sm",
            className: "inline-flex items-center gap-2 w-fit ml-2",
          })}
          isExternal
        >
          <FacebookIcon className="fill-white shrink-0" />
          Facebook
        </Anchor>
      </p>

      {isLoading && (
        <span className="sr-only" aria-live="polite">
          Loading projects
        </span>
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        aria-busy={isLoading}
      >
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl card-shadow aspect-4/3 animate-pulse bg-secondary/15"
                aria-hidden
              >
                <div className="absolute inset-0 bg-linear-to-t from-secondary/25 via-secondary/10 to-secondary/5" />
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                  <div className="h-7 max-w-[72%] rounded-md bg-secondary/35" />
                  <div className="h-5 max-w-[95%] rounded-md bg-secondary/25" />
                </div>
              </div>
            ))
          : projects.map((project) => (
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                key={project.id}
              >
                <Card
                  title={project.title}
                  subtitle={project.subtitle}
                  image={project.image}
                />
              </Link>
            ))}
      </div>
    </div>
  );
}
