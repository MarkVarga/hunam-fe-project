import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/hooks/useAuth";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div>Hello "/"!</div>
      <button
        onClick={() => {
          logout();
          navigate({ to: "/login" });
        }}
      >
        log out
      </button>
    </>
  );
}
