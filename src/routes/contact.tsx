import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center text-2xl font-bold">
      CONTACT - In Development
    </div>
  );
}
