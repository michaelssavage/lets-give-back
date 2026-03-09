import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center min-h-[60vh] grid place-items-center">
      <h1 className="font-bold">PROJECTS - COMING SOON</h1>
    </div>
  );
}
