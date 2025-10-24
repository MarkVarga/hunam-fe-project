import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnSizingInfoState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const Table = <T extends object>({ data, columns }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});

  const [columnSizingInfo, setColumnSizingInfo] =
    useState<ColumnSizingInfoState>({
      columnSizingStart: [],
      deltaOffset: 0,
      deltaPercentage: 0,
      isResizingColumn: false,
      startOffset: 0,
      startSize: 0,
    });
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnSizing, columnSizingInfo },
    onSortingChange: setSorting,
    enableSortingRemoval: true,
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
      <table className="table-auto min-w-[1500px] divide-y divide-gray-300 bg-white">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  style={{ minWidth: header.getSize() }}
                  className="relative px-4 py-3 text-left text-sm font-semibold text-gray-700 select-none"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      // Prevent sorting if resizing is active
                      if (!table.getState().columnSizingInfo.isResizingColumn) {
                        header.column.getToggleSortingHandler()?.(e);
                      }
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </div>

                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-[6px] cursor-col-resize z-10"
                    >
                      <div className="h-full w-[2px] bg-gray-400 mx-auto" />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="whitespace-nowrap px-4 py-3 text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
