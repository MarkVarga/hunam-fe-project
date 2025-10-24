// components/Layout.tsx
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useLogout } from "../../services/hooks/useLogout";
import { useAuth } from "../../contexts/hooks/useAuth";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/create-employee", label: "Create Employee" },
];

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        console.log("logout! ", data);
        logout();
        navigate({ to: "/login" });
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 text-lg font-bold text-gray-800 border-b">
          Employee Portal
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2 rounded hover:bg-gray-200 ${
                location.pathname === item.to
                  ? "bg-gray-200 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col px-6 py-4 border-t text-sm text-gray-500">
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
};

export default MainLayout;
