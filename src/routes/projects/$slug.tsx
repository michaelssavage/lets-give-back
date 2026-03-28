import { getProjectBySlugFn } from "@/api/projects.api";
import { Anchor } from "@/components/anchor";
import { buttonStyles } from "@/components/button/button.styles";
import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { env } from "process";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const project = await getProjectBySlugFn({ data: { slug: params.slug } });
    if (!project) throw notFound();
    return project;
  },
  component: RouteComponent,
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return {
      meta: [
        { title: loaderData.title },
        { property: "og:title", content: loaderData.title },
        { name: "description", content: loaderData.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:description", content: loaderData.subtitle },
        { property: "og:image", content: loaderData.image },
        { property: "twitter:image", content: loaderData.image },
        {
          property: "og:url",
          content: `${env.SITE_URL}/projects/${loaderData.slug}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const project = Route.useLoaderData();

  return (
    <article className="px-6 py-8 md:px-12 md:pb-16 max-w-3xl mx-auto">
      <Link
        to="/projects"
        className={buttonStyles({
          variant: "outline",
          size: "sm",
          className: "inline-flex items-center gap-1 text-sm mb-6",
        })}
      >
        <ArrowLeftIcon /> Back to Projects
      </Link>

      <div className="rounded-2xl overflow-hidden card-shadow aspect-4/3 w-full mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm mb-4">{project.date}</p>
      <h1 className="mb-2">{project.title}</h1>

      <div className="space-y-4 text-justify text-lg md:text-xl">
        <TiptapViewer content={project.description} />
      </div>

      {project.facebook && (
        <Anchor
          href={project.facebook}
          className={buttonStyles({
            variant: "outline",
            size: "sm",
            className: "inline-flex items-center gap-1 text-sm my-6",
          })}
          isExternal
        >
          View More on Facebook
        </Anchor>
      )}
    </article>
  );
}
