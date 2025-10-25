import { useMutation } from "@tanstack/react-query";
import { updateEmployee } from "../employees";
import { EmployeeSubmissionData } from "@/components/EmployeeForm";

export const useUpdateEmployee = (id: number) => {
  return useMutation({
    mutationFn: (payload: EmployeeSubmissionData) =>
      updateEmployee(id, payload),
  });
};
