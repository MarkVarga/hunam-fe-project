import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnSizingInfoState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  pinning?: {
    left?: string[];
    right?: string[];
  };
}

export const Table = <T extends object>({
  data,
  columns,
  pinning,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // You can adjust this
  });

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
    state: {
      sorting,
      columnSizing,
      columnSizingInfo,
      pagination,
      columnPinning: pinning || {},
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableSortingRemoval: true,
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnPinning: true,
  });

  return (
    <div className="w-full overflow-x-auto relative rounded-lg shadow ring-1 ring-black ring-opacity-5">
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
          {table.getPaginationRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={
                    "whitespace-nowrap px-4 py-3 text-sm text-gray-600 " +
                    (cell.column.getIsPinned() === "left"
                      ? "sticky left-0 bg-white z-10 shadow-md "
                      : cell.column.getIsPinned() === "right"
                        ? "sticky right-0 bg-white z-10 shadow-md "
                        : "")
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sticky left-0 bottom-0 z-10 bg-white border-t px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
          <div className="flex items-center space-x-4">
            <label htmlFor="pageSize" className="text-sm text-gray-600">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-2 py-1 border rounded text-sm"
            >
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>{" "}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            ⏮ First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next ▶
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Last ⏭
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
