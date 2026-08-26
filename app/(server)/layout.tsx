import { requirePageSession } from "@/lib/auth-guard";

export default async function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requirePageSession();
  return children;
}
