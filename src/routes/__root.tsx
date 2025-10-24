import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { AuthContextType } from "../contexts/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";

interface AppRouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { location } = useRouterState();

  const isLoginRoute = location.pathname === "/login";

  return isLoginRoute ? (
    <Outlet />
  ) : (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
