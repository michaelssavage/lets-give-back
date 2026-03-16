import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal";

export const DeleteProject = () => {
  return (
    <Modal
      title="Delete Project"
      description="Delete the project"
      trigger={
        <Button size="sm" variant="outline">
          Delete Project
        </Button>
      }
    >
      <div className="flex flex-col gap-4 my-4">
        <p>Are you sure you want to delete this project?</p>
        <Button size="sm" variant="outline">
          Delete Project
        </Button>
      </div>
    </Modal>
  );
};
