import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../employees";
import { AllEmployeeResponse } from "@/services/types/employeeService";

export const useFetchAllEmployees = () => {
  return useQuery<AllEmployeeResponse>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
};
