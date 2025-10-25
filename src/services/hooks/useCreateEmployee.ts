import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "../employees";

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
  });
};
