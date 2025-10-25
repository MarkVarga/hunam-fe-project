import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-employee/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "/edit-employee" ID: {id} !</div>;
}
