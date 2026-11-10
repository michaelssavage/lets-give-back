import type { Project } from "@/api/projects.api";
import { getProjectByIdFn, updateProjectFn } from "@/api/projects.api";
import { ImageUpload } from "@/components/admin/projects/image-upload";
import { Button } from "@/components/button/button";
import { buttonStyles } from "@/components/button/button.styles";
import { Checkbox } from "@/components/form/checkbox";
import { TextInput } from "@/components/form/text-input";
import { TiptapEditor } from "@/components/tiptap/tiptap-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/admin/projects/$id")({
  loader: async ({ params }) => {
    const project = await getProjectByIdFn({ data: { id: params.id } });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Edit ${loaderData?.title ?? "project"}` }],
  }),
  component: EditProjectPage,
});

function EditProjectPage() {
  const project = Route.useLoaderData();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditField = (
    field: keyof Project,
    value: string | JSONContent | boolean,
  ) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const description = JSON.stringify(editedProject.description);
      return updateProjectFn({ data: { ...editedProject, description } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      router.invalidate();
      toast.success("Project saved");
    },
    onError: () => {
      toast.error("Failed to save project");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const handleSubmit = async () => {
    if (
      !editedProject.isDraft &&
      (!editedProject.title ||
        !editedProject.slug ||
        !editedProject.date ||
        !editedProject.subtitle ||
        !editedProject.description ||
        !editedProject.image)
    ) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    mutation.mutateAsync();
  };

  return (
    <section className="px-6 py-8 md:px-12 md:mx-12">
      <div className="md:max-w-5xl mx-4 md:mx-auto">
        <Link
          to="/admin"
          search={{ tab: "projects" }}
          className="inline-flex items-center gap-2 text-dark-blue hover:text-primary-orange mb-4"
        >
          <ArrowLeftIcon className="size-4" />
          Back to projects
        </Link>
        <h1 className="mb-6">Edit project</h1>
        <div className="space-y-4">
          <Checkbox
            id={`is-draft-${project.id}`}
            label="Is Draft (If toggled, it will be hidden from the projects list)"
            name="isDraft"
            value={editedProject.isDraft}
            onChange={(e) => handleEditField("isDraft", e.target.checked)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <TextInput
              id="title"
              label="Title"
              name="title"
              placeholder="Title"
              value={editedProject.title}
              onChange={(e) => handleEditField("title", e.target.value)}
              required
            />

            <TextInput
              id="slug"
              label="Slug URL e.g. 'my-project-name'"
              name="slug"
              placeholder="Slug"
              value={editedProject.slug}
              onChange={(e) => handleEditField("slug", e.target.value)}
              required
            />

            <TextInput
              id="facebook"
              label="Facebook Post URL"
              name="facebook"
              placeholder="Enter Facebook Post URL"
              value={editedProject.facebook}
              onChange={(e) => handleEditField("facebook", e.target.value)}
            />

            <TextInput
              id="date"
              label="Date"
              name="date"
              placeholder="Date"
              value={editedProject.date}
              onChange={(e) => handleEditField("date", e.target.value)}
              required
            />
          </div>

          <ImageUpload
            currentUrl={editedProject.image}
            folder="projects"
            onUpload={(url) => handleEditField("image", url)}
          />

          <TextInput
            id="subtitle"
            label="Subtitle"
            name="subtitle"
            placeholder="Subtitle"
            type="textarea"
            className="min-h-20"
            value={editedProject.subtitle}
            onChange={(e) => handleEditField("subtitle", e.target.value)}
            required
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor={`description-${project.id}`}
              className="text-sm font-medium text-secondary"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <TiptapEditor
              id={`description-${project.id}`}
              content={editedProject.description}
              onChange={(content) => handleEditField("description", content)}
            />
          </div>

          <div className="flex flex-row flex-wrap items-center justify-end gap-2">
            <Link
              to="/admin"
              search={{ tab: "projects" }}
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              Back
            </Link>

            <Button size="sm" disabled={isSaving} onClick={handleSubmit}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
