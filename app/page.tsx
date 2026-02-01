import HomePageComponent from "@/components/HomePage/HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <HomePageComponent />;
}
