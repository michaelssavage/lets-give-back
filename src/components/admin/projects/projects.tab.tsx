import {
  getProjectsFn,
  type Project,
  saveProjectOrderFn,
} from "@/api/projects.api";
import { CreateProject } from "@/components/admin/projects/create-project";
import { DeleteProject } from "@/components/admin/projects/delete-project";
import { EditProject } from "@/components/admin/projects/edit-project";
import { Button } from "@/components/button/button";
import {
  DragHandle,
  SortableItem,
  SortableList,
} from "@/components/drag-and-drop/sortable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ProjectsTab = () => {
  const { data: initialProjects = [] } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: getProjectsFn,
  });

  const [projects, setProjects] = useState<Array<Project>>(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleSaveOrder = async () => {
    try {
      await saveProjectOrderFn({ data: { projects } });
      toast.success("Project order saved");
    } catch {
      toast.error("Failed to save project order");
    }
  };

  return (
    <section className="w-full mt-4 md:mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2>Projects</h2>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleSaveOrder}>
            Save Order
          </Button>

          <CreateProject />
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No projects found</p>
          </div>
        ) : (
          <SortableList
            items={projects}
            onReorder={setProjects}
            getItemId={(project) => project.id}
          >
            {projects.map((project) => (
              <SortableItem key={project.id} id={project.id}>
                {({ ref, style, dragHandleProps }) => (
                  <div
                    ref={ref}
                    style={style}
                    className="flex items-center gap-2"
                  >
                    <DragHandle {...dragHandleProps} />
                    <div className="border bg-white border-secondary p-4 rounded-lg flex-1 flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-bold">{project.title}</p>
                        <p>{project.subtitle}</p>
                      </div>

                      <div className="flex sm:items-center gap-2 w-full sm:w-fit justify-between sm:justify-end mt-2 sm:mt-0">
                        <EditProject project={project} />
                        <DeleteProject projectId={project.id} />
                      </div>
                    </div>
                  </div>
                )}
              </SortableItem>
            ))}
          </SortableList>
        )}
      </div>
    </section>
  );
};
