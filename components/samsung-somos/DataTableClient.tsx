"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./data-table";

export default function DataTableClient({
  title,
  data,
  columns,
  page,
  pageSize,
  pageCount,
  totalRow,
  searchText,
}: {
  title: string;
  data: any[];
  columns: any[];
  page: number;
  pageSize: number;
  pageCount: number;
  totalRow: number;
  searchText?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (params: Record<string, string>) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
    router.push(`?${sp.toString()}`, { scroll: false });
  };

  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pageIndex={page - 1}
      pageSize={pageSize}
      pageCount={pageCount}
      totalRow={totalRow}
      searchTextParam={searchText}
      onPageChange={(pageIndex) => {
        updateParams({ page: String(pageIndex + 1) });
      }}
      onPageSizeChange={(size) => {
        console.log("page size change to:", size);
        updateParams({
          pageSize: String(size),
          page: "1", // reset page
        });
      }}
      onSearchClick={(text) => {
        updateParams({
          pageSize: "10", // reset page size
          page: "1", // reset page
          searchText: text || "",
        });
      }}
      onSearchReset={() => {
        updateParams({
          pageSize: "10", // reset page size
          page: "1", // reset page
          searchText: "",
        });
      }}
    />
  );
}
