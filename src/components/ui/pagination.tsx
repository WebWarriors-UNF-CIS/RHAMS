import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="px-2">
      <div className="flex items-center justify-between">
        <div className="flex text-sm px-4 text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            className="px-6"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Previous
          </Button>

          {Array.from({ length: Math.min(3, table.getPageCount()) }, (_, i) => {
            const currentIndex = table.getState().pagination.pageIndex;
            const pageCount = table.getPageCount();
            const buttonPage = Math.max(0, Math.min(pageCount - 1, currentIndex - 1 + i));

            const isCurrent = buttonPage === currentIndex;
            const buttonVariant = isCurrent ? "outline" : "ghost";

            return (
              <Button
                key={buttonPage}
                variant={buttonVariant}
                className="px-10"
                onClick={() => table.setPageIndex(buttonPage)}
              >
                {buttonPage + 1}
              </Button>
            );
          })}

          {(() => {
            const currentIndex = table.getState().pagination.pageIndex;
            const pageCount = table.getPageCount();

            if (pageCount > 3 && currentIndex < pageCount - 1) {
              return <DotsHorizontalIcon className="h-4 w-4" />;
            } else if (pageCount == 2 && currentIndex < pageCount - 1) {
              return <DotsHorizontalIcon className="h-4 w-4" />;
            }

            return null;
          })()}

          <Button
            variant="ghost"
            className="px-6"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRightIcon className="inline h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

  )
}