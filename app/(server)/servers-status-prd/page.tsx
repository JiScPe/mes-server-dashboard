import ServerCardItem from "@/components/servers/ServerCardItem";
import MainNavbar from "@/components/Navbar/MainNavbar";
import {
  groupServersByType,
  SERVICE_TYPE_ORDER,
} from "@/lib/helpers/group-by-type";
import { iServersStatusResponse } from "@/types/servers";
import { ServerListProvider } from "@/components/contexts/ServerListContext";


const API_URL = process.env.API_URL;
const PORT = process.env.PORT;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ServerListPage = async ({ searchParams }: Props) => {
  const queryParams = await searchParams;

  const res = await fetch(
    `${API_URL}:${PORT}/api/status-all-prd?nginxserv=${queryParams}`,
    { cache: "no-store" }
  );

  const { servers }: iServersStatusResponse = await res.json();
  const groupedServers = groupServersByType(servers);

  return (
    <ServerListProvider value={{ queryParams }}>
      <div className="min-h-screen">
        <MainNavbar />

        <main className="space-y-8 p-4 dark:bg-secondary">
          {SERVICE_TYPE_ORDER.map((type) => {
            const list = groupedServers[type];
            if (!list?.length) return null;

            return (
              <section key={type} className="space-y-3">
                <header className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold capitalize">
                    {type} services
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    ({list.length})
                  </span>
                </header>

                <div className="grid grid-cols-4 gap-3 w-full">
                  {list.map((serverItem) => (
                    <ServerCardItem
                      key={serverItem.server}
                      serverItem={serverItem}
                      serverType={type}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </ServerListProvider>
  );
};

export default ServerListPage;
