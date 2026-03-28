import { getProjectsFn } from "@/api/projects.api";
import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { Card } from "@/components/card";
import { FacebookIcon } from "@/components/icons/facebook.icon";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  loader: () => getProjectsFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const projects = Route.useLoaderData();

  return (
    <div className="text-center px-6 py-8 md:px-12 md:pb-16 max-w-5xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
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
