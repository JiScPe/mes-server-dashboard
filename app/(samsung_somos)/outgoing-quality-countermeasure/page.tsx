import DataTableClient from "../../../components/samsung-somos/DataTableClient";
import { columns } from "./column";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

async function getData(page: number, pageSize: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/samsung-somos/outgoing-quality-countermeasure?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function OutgoingQualityCounterMeasurePage({
  searchParams,
}: Props) {
  const { page: pageParam, pageSize: pageSizeParam } = await searchParams;
  const page = Number(pageParam ?? 1);
  const pageSize = Number(pageSizeParam ?? 10);

  const { data, pageCount, total } = await getData(page, pageSize);

  return (
    <main className="px-4 py-2">
      <DataTableClient
        title="Outgoing Quality Countermeasure"
        data={data}
        columns={columns}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalRow={total}
      />
    </main>
  );
}
