import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../employees";

export const useFetchAllEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
};
