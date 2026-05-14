import { createProjectFn } from "@/api/projects.api";
import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/text-input";
import { Modal } from "@/components/modal";
import { useFocus } from "@/hooks/use-focus.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateProject = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useFocus({ isOpen });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const mutation = useMutation({
    mutationFn: createProjectFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast.success("Project created");
      setTitle("");
    },
    onError: () => {
      toast.error("Failed to create project");
    },
    onSettled: () => {
      setIsCreating(false);
      setIsOpen(false);
    },
  });

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsCreating(true);
    mutation.mutateAsync({ data: { title: title.trim() } });
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
          ref={inputRef}
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
