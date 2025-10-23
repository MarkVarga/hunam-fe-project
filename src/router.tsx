import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/queryClient";
import { useAuth } from "./contexts/hooks/useAuth";

export const useRouter = () => {
  const auth = useAuth();
  return createRouter({
    routeTree,
    context: {
      auth: auth,
      queryClient,
    },
  });
};
