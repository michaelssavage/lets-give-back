import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal";

export const DeleteProject = () => {
  return (
    <Modal
      title="Delete Project"
      description="Delete the project"
      trigger="Delete"
    >
      <div className="flex flex-col gap-4 my-4">
        <p>Are you sure you want to delete this project?</p>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm" variant="primary">
            Delete Project
          </Button>
        </div>
      </div>
    </Modal>
  );
};
