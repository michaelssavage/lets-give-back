import { GalleryTab } from "@/components/admin/gallery.tab";
import { ProjectsTab } from "@/components/admin/projects/projects.tab";
import { ServicesTab } from "@/components/admin/services.tab";
import { TabHeader, Tabs, TabsList, TabsPanel } from "@/components/base/tabs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  tab: z.enum(["projects", "services", "gallery"]).default("projects"),
});

export const Route = createFileRoute("/admin/")({
  validateSearch: searchSchema,
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { tab } = Route.useSearch();

  const handleTabChange = (tab: z.infer<typeof searchSchema>["tab"]) => {
    navigate({ search: { tab } });
  };

  return (
    <section className="px-6 py-8 md:px-12 md:mx-12">
      <h1 className="mb-2">Admin</h1>
      <Tabs value={tab}>
        <TabsList>
          <TabHeader
            value="projects"
            onClick={() => handleTabChange("projects")}
            className="flex-1"
          >
            Projects
          </TabHeader>
          <TabHeader
            value="services"
            onClick={() => handleTabChange("services")}
            className="flex-1"
          >
            Services
          </TabHeader>
          <TabHeader
            value="gallery"
            onClick={() => handleTabChange("gallery")}
            className="flex-1"
          >
            Gallery
          </TabHeader>
        </TabsList>
        <TabsPanel value="projects">
          <ProjectsTab />
        </TabsPanel>
        <TabsPanel value="services">
          <ServicesTab />
        </TabsPanel>
        <TabsPanel value="gallery">
          <GalleryTab />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
