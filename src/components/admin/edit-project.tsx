import type { Project } from "@/api/projects.static";
import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/TextInput";
import { Modal } from "@/components/modal";
import { useState } from "react";

export const EditProject = ({ project }: { project: Project }) => {
  const [editedProject, setEditedProject] = useState<Project>(project);

  const handleEditField = (field: keyof Project, value: string) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(editedProject);
  };

  return (
    <Modal
      title="Edit Project"
      description="Edit the project"
      trigger={
        <Button size="sm" variant="outline">
          Edit Project
        </Button>
      }
    >
      <div>
        <TextInput
          id="title"
          label="Enter Project Title"
          name="title"
          placeholder="Title"
          value={project.title}
          onChange={(e) => handleEditField("title", e.target.value)}
        />

        <Button size="sm" disabled={!editedProject} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
