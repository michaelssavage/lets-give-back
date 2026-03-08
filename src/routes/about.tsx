import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center text-2xl font-bold">ABOUT - In Development</div>
  );
}
