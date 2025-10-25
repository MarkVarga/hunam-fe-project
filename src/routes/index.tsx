import { createFileRoute, redirect } from "@tanstack/react-router";
import { useFetchAllEmployees } from "@/services/hooks/useFetchAllEmployees";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Education, Employee, PaymentMethod, Sex } from "@/types/employee";
import { useMemo } from "react";
import { Button } from "@headlessui/react";

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
  const { data: employees } = useFetchAllEmployees();

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableResizing: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableResizing: true,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        enableResizing: true,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        enableResizing: true,
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        enableResizing: true,
        cell: ({ getValue }) =>
          new Date(getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: "placeOfBirth",
        header: "Place of Birth",
        enableResizing: true,
      },
      {
        accessorKey: "mothersFirstName",
        header: "Mother's First Name",
        enableResizing: true,
      },
      {
        accessorKey: "mothersLastName",
        header: "Mother's Last Name",
        enableResizing: true,
      },
      {
        accessorKey: "country",
        header: "Country",
        enableResizing: true,
      },
      {
        accessorKey: "zipCode",
        header: "ZIP Code",
        enableResizing: true,
      },
      {
        accessorKey: "parcelNumber",
        header: "Parcel No.",
        enableResizing: true,
      },
      {
        accessorKey: "city",
        header: "City",
        enableResizing: true,
      },
      {
        accessorKey: "administrativeArea",
        header: "Admin Area",
        enableResizing: true,
      },
      {
        accessorKey: "administrativeAreaType",
        header: "Area Type",
        enableResizing: true,
      },
      {
        accessorKey: "houseNumber",
        header: "House No.",
        enableResizing: true,
      },
      {
        accessorKey: "building",
        header: "Building",
        enableResizing: true,
      },
      {
        accessorKey: "staircase",
        header: "Staircase",
        enableResizing: true,
      },
      {
        accessorKey: "floor",
        header: "Floor",
        enableResizing: true,
      },
      {
        accessorKey: "door",
        header: "Door",
        enableResizing: true,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableResizing: true,
      },
      {
        accessorKey: "sex",
        header: "Sex",
        enableResizing: true,
        cell: ({ getValue }) => Sex[getValue<Sex>()],
      },
      {
        accessorKey: "education",
        header: "Education",
        enableResizing: true,
        cell: ({ getValue }) => Education[getValue<Education>()],
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        enableResizing: true,
        cell: ({ getValue }) => PaymentMethod[getValue<PaymentMethod>()],
      },
      {
        accessorKey: "bankAccountNumber",
        header: "Bank Account",
        enableResizing: true,
        cell: ({ row }) =>
          row.original.paymentMethod === PaymentMethod.Transfer
            ? row.original.bankAccountNumber
            : "—",
      },
      {
        accessorKey: "moneyDispatchAddress",
        header: "Dispatch Address",
        enableResizing: true,
        cell: ({ row }) =>
          row.original.paymentMethod === PaymentMethod.Dispatch
            ? row.original.moneyDispatchAddress
            : "—",
      },
      {
        accessorKey: "cashPaymentDay",
        header: "Cash Day",
        enableResizing: true,
        cell: ({ row }) =>
          row.original.paymentMethod === PaymentMethod.Cash
            ? row.original.cashPaymentDay
            : "—",
      },
      {
        accessorKey: "salary",
        header: "Salary (HUF)",
        enableResizing: true,
        cell: ({ getValue }) =>
          getValue<number>().toLocaleString("hu-HU", {
            style: "currency",
            currency: "HUF",
            minimumFractionDigits: 0,
          }),
      },
      {
        id: "edit",
        header: "",
        enableResizing: false,
        maxSize: 10,
        cell: ({ row }) => {
          return (
            <Button onClick={() => console.log(row.original)}>Edit</Button>
          );
        },
      },
    ],
    [],
  );
  return (
    <>
      {employees && (
        <div className="w-full overflow-x-auto">
          <Table
            data={employees.data}
            columns={columns}
            pinning={{ right: ["edit"] }}
          />
        </div>
      )}
    </>
  );
}
