import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center text-2xl font-bold min-h-[70vh] grid place-items-center">
      SERVICES - In Development
    </div>
  );
}
