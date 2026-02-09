import React from "react";
import prisma from "@/lib/prisma";


export default async function iPaasPage() {
  const ipaas = await prisma.ipaas.findMany();
  return (
    <ul>
      {ipaas.map((item) => (
        <li key={item.client_id}>{item.client_id}</li>
      ))}
    </ul>
  );
}
