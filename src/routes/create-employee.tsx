import { createFileRoute } from "@tanstack/react-router";
import { EmployeeForm } from "../components/EmployeeForm";

export const Route = createFileRoute("/create-employee")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmployeeForm />;
}
