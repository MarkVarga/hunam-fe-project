import { EmployeeForm } from "@/components/EmployeeForm";
import { useFetchEmployeeById } from "@/services/hooks/useGetEmployeeById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-employee/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: employeeData } = useFetchEmployeeById(id);
  return <EmployeeForm employeeData={employeeData} />;
}
