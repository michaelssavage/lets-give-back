import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/TextInput";
import { Modal } from "@/components/modal";
import { useState } from "react";

export const CreateProject = () => {
  const [newProject, setNewProject] = useState<string>("");

  const handleSubmit = () => {
    console.log(newProject);
  };

  return (
    <Modal
      title="Create Project"
      description="Create a new project"
      trigger={
        <Button size="sm" variant="outline">
          Create Project
        </Button>
      }
    >
      <div className="flex flex-col gap-4 my-4">
        <TextInput
          id="title"
          label="Enter Project Title"
          name="title"
          placeholder="Title"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />

        <Button
          size="sm"
          disabled={!newProject}
          className="w-fit self-end"
          onClick={handleSubmit}
        >
          Create Project
        </Button>
      </div>
    </Modal>
  );
};
