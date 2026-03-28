import { deleteProjectFn } from "@/api/projects.api";
import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export const DeleteProject = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProjectFn({ data: { id: projectId } });
      await router.invalidate();
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title="Delete Project"
      description="Delete the project"
      trigger="Delete"
    >
      <div className="flex flex-col gap-4 my-4">
        <p>Are you sure you want to delete this project?</p>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
