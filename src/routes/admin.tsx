import { ProjectsTab } from "@/components/admin/projects/projects.tab";
import { ServicesTab } from "@/components/admin/services/services.tab";
import { TabHeader, Tabs, TabsList, TabsPanel } from "@/components/base/tabs";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  tab: z.enum(["projects", "services"]).default("projects"),
});

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  validateSearch: searchSchema,
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate({ from: Route.fullPath });
  const { tab } = Route.useSearch();

  const handleTabChange = (tab: "projects" | "services") => {
    navigate({ search: { tab } });
  };

  return (
    <section className="px-6 py-8 md:px-12 mx-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-2">Admin</h1>
        <p className="text-lg mb-6">
          Signed in as <strong>{user?.email}</strong>
        </p>
      </div>
      <Tabs value={tab}>
        <TabsList>
          <TabHeader
            value="projects"
            onClick={() => handleTabChange("projects")}
          >
            Projects
          </TabHeader>
          <TabHeader
            value="services"
            onClick={() => handleTabChange("services")}
          >
            Services
          </TabHeader>
        </TabsList>
        <TabsPanel value="projects">
          <ProjectsTab />
        </TabsPanel>
        <TabsPanel value="services">
          <ServicesTab />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
