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
    <section className="px-6 py-8 md:px-12 max-w-5xl mx-auto">
      <h1 className="mb-2">Admin</h1>
      <p className="text-lg mb-6">
        Signed in as <strong>{user?.email}</strong>
      </p>
      <div className="rounded-2xl border border-gray-500/20 p-6 bg-white/60 dark:bg-gray-900/70">
        <h2 className="text-2xl mb-2">Welcome</h2>
        <p>
          This is the protected admin area. Add your admin-only tools and
          content here.
        </p>
      </div>
    </section>
  );
}
