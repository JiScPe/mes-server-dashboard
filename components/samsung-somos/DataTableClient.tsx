"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "@/app/(samsung_somos)/outgoing-quality-countermeasure/column";

export default function DataTableClient({
  data,
  page,
  pageSize,
  pageCount,
}: {
  data: any[];
  page: number;
  pageSize: number;
  pageCount: number;
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
      columns={columns}
      data={data}
      pageIndex={page - 1}
      pageSize={pageSize}
      pageCount={pageCount}
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
