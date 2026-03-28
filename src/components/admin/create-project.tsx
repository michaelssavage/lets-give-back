import { createProjectFn } from "@/api/projects.api";
import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/text-input";
import { Modal } from "@/components/modal";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateProject = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsCreating(true);
    try {
      await createProjectFn({ data: { title: title.trim() } });
      await router.invalidate();
      setTitle("");
      toast.success("Project created");
    } catch {
      toast.error("Failed to create project");
    } finally {
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title="Create Project"
      description="Create a new project"
      trigger="Create"
      triggerStyle="bg-primary-orange hover:bg-dark-orange text-white border border-dark-blue"
    >
      <div className="flex flex-col gap-4 my-4">
        <TextInput
          id="title"
          label="Enter Project Title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button
          size="sm"
          disabled={!title.trim() || isCreating}
          className="w-fit self-end"
          onClick={handleSubmit}
        >
          {isCreating ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </Modal>
  );
};
