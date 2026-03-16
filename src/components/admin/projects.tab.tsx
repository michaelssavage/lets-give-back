import { PROJECTS, type Project } from "@/api/projects.static";
import { CreateProject } from "@/components/admin/create-project";
import { DeleteProject } from "@/components/admin/delete-project";
import { EditProject } from "@/components/admin/edit-project";
import { Button } from "@/components/button/button";
import {
  DragHandle,
  SortableItem,
  SortableList,
} from "@/components/drag-and-drop/sortable";
import { useState } from "react";

export const ProjectsTab = () => {
  const [projects, setProjects] = useState<Array<Project>>(PROJECTS);

  return (
    <section className="w-full mt-8">
      <div className="flex items-center justify-between">
        <h2>Projects</h2>

        <div className="flex items-center gap-2">
          <CreateProject />
          <Button size="sm">Save</Button>
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
                  <div className="border bg-white border-secondary p-4 rounded-lg flex-1 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-bold">{project.title}</p>
                      <p>{project.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary-blue"
                      >
                        Edit
                      </Button>

                      <EditProject project={project} />

                      <DeleteProject />
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
