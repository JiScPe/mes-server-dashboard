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
  totalRow
}: {
  title: string;
  data: any[];
  columns: any[];
  page: number;
  pageSize: number;
  pageCount: number;
  totalRow: number;
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
    />
  );
}
