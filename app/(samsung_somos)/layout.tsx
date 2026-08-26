import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { requirePageSession } from "@/lib/auth-guard";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePageSession();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
