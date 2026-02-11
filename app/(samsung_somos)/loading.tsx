import { TableLoadingSkeleton } from "@/components/samsung-somos/TableLoadingSkeleton";
import React from "react";

export default function loading() {
  return <TableLoadingSkeleton rows={10} columns={15} />;
}
