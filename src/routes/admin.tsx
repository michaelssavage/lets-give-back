import { ProjectsTab } from "@/components/admin/projects.tab";
import { TabHeader, Tabs, TabsList, TabsPanel } from "@/components/base/tabs";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useRouteContext();

  return (
    <section className="px-6 py-8 md:px-12 mx-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-2">Admin</h1>
        <p className="text-lg mb-6">
          Signed in as <strong>{user?.email}</strong>
        </p>
      </div>
      <Tabs>
        <TabsList>
          <TabHeader value="projects">Projects</TabHeader>
          <TabHeader value="services">Services</TabHeader>
        </TabsList>
        <TabsPanel value="projects">
          <ProjectsTab />
        </TabsPanel>
        <TabsPanel value="services">
          <div>Services</div>
        </TabsPanel>
      </Tabs>
    </section>
  );
}
