import type { Project } from "@/api/projects.static";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/text-input";
import { Modal } from "@/components/modal";
import { TiptapEditor } from "@/components/tiptap/tiptap-editor";
import type { JSONContent } from "@tiptap/core";
import { useState } from "react";

export const EditProject = ({ project }: { project: Project }) => {
  const [editedProject, setEditedProject] = useState<Project>(project);

  const handleEditField = (
    field: keyof Project,
    value: string | JSONContent,
  ) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(editedProject);
  };

  return (
    <Modal
      className="w-[94vw] sm:w-2/3"
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
            value={project.title}
            onChange={(e) => handleEditField("title", e.target.value)}
          />

          <TextInput
            id="slug"
            label="Slug URL e.g. 'my-project-name'"
            name="slug"
            placeholder="Slug"
            value={project.slug}
            onChange={(e) => handleEditField("slug", e.target.value)}
          />

          <TextInput
            id="facebook"
            label="Facebook Post URL"
            name="facebook"
            placeholder="Enter Facebook Post URL"
            value={project.facebook}
            onChange={(e) => handleEditField("facebook", e.target.value)}
          />

          <TextInput
            id="date"
            label="Date"
            name="date"
            placeholder="Date"
            value={project.date}
            onChange={(e) => handleEditField("date", e.target.value)}
          />
        </div>

        <ImageUpload
          currentUrl={editedProject.image}
          folder="projects"
          onUpload={(url) => handleEditField("image", url)}
        />

        {/* <TextInput
          id="gallery"
          label="Gallery"
          name="gallery"
          placeholder="Gallery"
          value={project.gallery}
          onChange={(e) => handleEditField("gallery", e.target.value)}
        /> */}

        <TextInput
          id="subtitle"
          label="Subtitle"
          name="subtitle"
          placeholder="Subtitle"
          value={project.subtitle}
          onChange={(e) => handleEditField("subtitle", e.target.value)}
        />

        <TiptapEditor
          id={`description-${project.id}`}
          content={project.description}
          onChange={(content) => handleEditField("description", content)}
        />

        <Button size="sm" disabled={!editedProject} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
