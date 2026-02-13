"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  SearchIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MenuTitle from "./MenuTitle";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";

interface DataTableProps<TData> {
  title: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  searchTextParam?: string;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchClick?: (searchText: string) => void;
  onSearchReset?: () => void;
}

export function DataTable<TData>({
  title,
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  totalRow,
  searchTextParam,
  onPageChange,
  onPageSizeChange,
  onSearchClick,
  onSearchReset,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize, // ✅ ใช้จาก props
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const [searchText, setSearchText] = useState<string>(searchTextParam || "");

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ===== Top Action Bar ===== */}
      <div className="flex justify-between items-center">
        <MenuTitle title={title} />

        <div className="flex items-center gap-3">
          {/* Search Filter */}
          <div className="flex items-center py-4 gap-2">
            <Input
              placeholder="Filter SN..."
              className="max-w-sm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              value={searchText}
            />
            <Button
              variant="outline"
              size="sm"
              className="bg-black text-white"
              onClick={() => {
                if (onSearchClick) {
                  onSearchClick(searchText);
                }
              }}
            >
              <SearchIcon className="ml-2 size-5 text-muted-foreground" />
              Search
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                onSearchReset;
                setSearchText("");
              }}
            >
              <RefreshCcw className="hover:rotate-90 transition-all duration-300" />
            </Button>
          </div>

          {/* Page size */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>

            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                onPageSizeChange(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-18">
                <SelectValue />
              </SelectTrigger>

              <SelectContent align="end">
                {[10, 20, 25, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Total: {totalRow} rows
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {pageIndex + 1} / {pageCount}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex + 1 >= pageCount}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <Table className="overflow-hidden rounded-md border">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
