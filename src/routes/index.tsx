import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/hooks/useAuth";
import { useFetchAllEmployees } from "../services/hooks/useFetchAllEmployees";
import { useLogout } from "../services/hooks/useLogout";
import Table from "../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Education, Employee, PaymentMethod, Sex } from "../types/employee";

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

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 60,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 120,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 120,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
      size: 120,
    },
    {
      accessorKey: "placeOfBirth",
      header: "Place of Birth",
      size: 150,
    },
    {
      accessorKey: "mothersFirstName",
      header: "Mother's First Name",
      size: 150,
    },
    {
      accessorKey: "mothersLastName",
      header: "Mother's Last Name",
      size: 150,
    },
    {
      accessorKey: "country",
      header: "Country",
      size: 100,
    },
    {
      accessorKey: "zipCode",
      header: "ZIP Code",
      size: 80,
    },
    {
      accessorKey: "parcelNumber",
      header: "Parcel No.",
      size: 100,
    },
    {
      accessorKey: "city",
      header: "City",
      size: 120,
    },
    {
      accessorKey: "administrativeArea",
      header: "Admin Area",
      size: 120,
    },
    {
      accessorKey: "administrativeAreaType",
      header: "Area Type",
      size: 120,
    },
    {
      accessorKey: "houseNumber",
      header: "House No.",
      size: 80,
    },
    {
      accessorKey: "building",
      header: "Building",
      size: 80,
    },
    {
      accessorKey: "staircase",
      header: "Staircase",
      size: 80,
    },
    {
      accessorKey: "floor",
      header: "Floor",
      size: 80,
    },
    {
      accessorKey: "door",
      header: "Door",
      size: 80,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 140,
    },
    {
      accessorKey: "sex",
      header: "Sex",
      cell: ({ getValue }) => {
        const value = getValue<Sex>();
        return Sex[value];
      },
      size: 80,
    },
    {
      accessorKey: "education",
      header: "Education",
      cell: ({ getValue }) => {
        const value = getValue<Education>();
        return Education[value];
      },
      size: 180,
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ getValue }) => {
        const value = getValue<PaymentMethod>();
        return PaymentMethod[value];
      },
      size: 140,
    },
    {
      accessorKey: "bankAccountNumber",
      header: "Bank Account",
      cell: ({ row }) =>
        row.original.paymentMethod === PaymentMethod.Transfer
          ? row.original.bankAccountNumber
          : "—",
      size: 180,
    },
    {
      accessorKey: "moneyDispatchAddress",
      header: "Dispatch Address",
      cell: ({ row }) =>
        row.original.paymentMethod === PaymentMethod.Dispatch
          ? row.original.moneyDispatchAddress
          : "—",
      size: 180,
    },
    {
      accessorKey: "cashPaymentDay",
      header: "Cash Day",
      cell: ({ row }) =>
        row.original.paymentMethod === PaymentMethod.Cash
          ? row.original.cashPaymentDay
          : "—",
      size: 100,
    },
    {
      accessorKey: "salary",
      header: "Salary (HUF)",
      cell: ({ getValue }) =>
        getValue<number>().toLocaleString("hu-HU", {
          style: "currency",
          currency: "HUF",
          minimumFractionDigits: 0,
        }),
      size: 140,
    },
  ];
  return (
    <>
      {employees && <Table data={employees.data} columns={columns} />}
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
