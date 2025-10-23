import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/hooks/useAuth";
import { useFetchAllEmployees } from "../services/hooks/useFetchAllEmployees";
import { useLogout } from "../services/hooks/useLogout";

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
  const { data: employees } = useFetchAllEmployees();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        console.log("logout! ", data);
        logout();
      },
    });
  };

  console.log(employees);

  return (
    <>
      <div></div>
      <button
        onClick={() => {
          handleLogout();
          navigate({ to: "/login" });
        }}
      >
        log out
      </button>
    </>
  );
}
