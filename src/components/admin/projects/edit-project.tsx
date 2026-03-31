import type { Project } from "@/api/projects.api";
import { updateProjectFn } from "@/api/projects.api";
import { ImageUpload } from "@/components/admin/projects/image-upload";
import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/text-input";
import { Modal } from "@/components/modal";
import { TiptapEditor } from "@/components/tiptap/tiptap-editor";
import { useRouter } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { useState } from "react";
import toast from "react-hot-toast";

export const EditProject = ({ project }: { project: Project }) => {
  const router = useRouter();
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen(false);
  };

  const handleEditField = (
    field: keyof Project,
    value: string | JSONContent,
  ) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !editedProject.title ||
      !editedProject.slug ||
      !editedProject.date ||
      !editedProject.subtitle ||
      !editedProject.description ||
      !editedProject.image
    ) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSaving(true);
    try {
      const description = JSON.stringify(editedProject.description);

      await updateProjectFn({ data: { ...editedProject, description } });
      await router.invalidate();
      toast.success("Project saved");
    } catch {
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[94vw] max-w-[96vw] sm:max-w-[calc(100vw-3rem)] sm:w-2/3 max-h-[94vh] sm:max-h-[90vh]"
      title="Edit Project"
      description="Edit the project"
      trigger="Edit"
    >
      <div className="mt-4 space-y-4">
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
          className="min-h-[80px]"
          value={editedProject.subtitle}
          onChange={(e) => handleEditField("subtitle", e.target.value)}
          required
        />

        <TiptapEditor
          id={`description-${project.id}`}
          content={editedProject.description}
          onChange={(content) => handleEditField("description", content)}
        />

        <div className="flex flex-row flex-wrap items-center justify-end gap-2">
          <Button size="sm" variant="outline" onClick={handleOpenChange}>
            Cancel
          </Button>

          <Button size="sm" disabled={isSaving} onClick={handleSubmit}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
