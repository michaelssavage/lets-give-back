import { type Project } from "@/api/projects.api";
import { CreateProject } from "@/components/admin/create-project";
import { DeleteProject } from "@/components/admin/delete-project";
import { EditProject } from "@/components/admin/edit-project";
import {
  DragHandle,
  SortableItem,
  SortableList,
} from "@/components/drag-and-drop/sortable";
import { useEffect, useState } from "react";

interface ProjectsTabProps {
  initialProjects: Array<Project>;
}

export const ProjectsTab = ({ initialProjects }: ProjectsTabProps) => {
  const [projects, setProjects] = useState<Array<Project>>(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  return (
    <section className="w-full mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2>Projects</h2>

        <div className="flex items-center gap-2">
          <CreateProject />
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4">
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
      </div>
    </section>
  );
};
