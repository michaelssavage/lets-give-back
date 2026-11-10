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
      <div className="flex flex-col gap-4" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 sm:gap-6 rounded-sm border border-secondary/20 p-3 animate-pulse"
                aria-hidden
              >
                <div className="w-24 sm:w-36 aspect-4/3 shrink-0 rounded-sm bg-secondary/15" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 rounded-sm bg-secondary/15" />
                  <div className="h-6 max-w-[60%] rounded-sm bg-secondary/25" />
                  <div className="h-4 max-w-[85%] rounded-sm bg-secondary/15" />
                </div>
              </div>
            ))
          : projects.map((project) => (
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                key={project.id}
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
              >
                <Card
                  variant="row"
                  title={project.title}
                  subtitle={project.subtitle}
                  image={project.image}
                  meta={project.date}
                />
              </Link>
            ))}
      </div>
    </div>
  );
}
