import DataTableClient from "../../../components/samsung-somos/DataTableClient";
import { processQualityColumns } from "./process-quality-column";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

async function getData(page: number, pageSize: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/samsung-somos/process-quality?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function ProcessQualityPage({ searchParams }: Props) {
  const { page: pageParam, pageSize: pageSizeParam } = await searchParams;
  const page = Number(pageParam ?? 1);
  const pageSize = Number(pageSizeParam ?? 10);

  const { data, pageCount } = await getData(page, pageSize);

  return (
    <div className="px-4 py-2 max-w-full">
      <DataTableClient
        title="Process Quality"
        data={data}
        columns={processQualityColumns}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
      />
    </div>
  );
}
