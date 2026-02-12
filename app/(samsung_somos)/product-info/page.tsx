import DataTableClient from "../../../components/samsung-somos/DataTableClient";
import { productInfoColumns } from "./product-info-column";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

async function getData(page: number, pageSize: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/samsung-somos/product-info?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function ProductInfoPage({ searchParams }: Props) {
  const { page: pageParam, pageSize: pageSizeParam } = await searchParams;
  const page = Number(pageParam ?? 1);
  const pageSize = Number(pageSizeParam ?? 10);

  const { data, pageCount, total } = await getData(page, pageSize);

  return (
    <div className="px-4 py-2 max-w-full">
      <DataTableClient
        title="Product Info"
        data={data}
        columns={productInfoColumns}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalRow={total}
      />
    </div>
  );
}
