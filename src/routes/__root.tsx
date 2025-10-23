import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../contexts/AuthContext";
import { QueryClient } from "@tanstack/react-query";

interface AppRouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: () => <Outlet />,
});
