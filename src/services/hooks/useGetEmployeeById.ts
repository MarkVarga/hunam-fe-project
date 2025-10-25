import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../employees";
import { Employee } from "@/types/employee";

export const useFetchEmployeeById = (id: number) => {
  return useQuery<Employee>({
    queryKey: ["employee"],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
};
