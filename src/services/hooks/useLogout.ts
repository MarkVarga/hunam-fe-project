import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../authService";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
