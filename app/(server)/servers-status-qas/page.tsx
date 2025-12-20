import RefreshStatusButton from "@/components/Navbar/RefreshStatusButton";
import ServerCardItem from "@/components/servers/ServerCardItem";
import { ToggleTheme } from "@/components/toggle-theme";
import {
  groupServersByType,
  SERVICE_TYPE_ORDER,
} from "@/lib/helpers/group-by-type";
import { iServersStatusResponse } from "@/types/servers";

const ServerListPage = async () => {
  const data = await fetch("http://localhost:3000/api/status-all-qas", {
    cache: "no-store",
  });

  const { servers }: iServersStatusResponse = await data.json();

  const groupedServers = groupServersByType(servers);

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between w-full p-3 bg-blue-300 items-center">
        {/* left */}
        <div>
          <h1 className="text-2xl font-semibold">MES Server List</h1>
        </div>

        {/* right */}
        <div className="flex gap-2">
          <ToggleTheme />
          <RefreshStatusButton />
        </div>
      </nav>

      <main className="space-y-8 p-4">
        {SERVICE_TYPE_ORDER.map((type) => {
          const list = groupedServers[type];
          if (!list || list.length === 0) return null;

          return (
            <section key={type} className="space-y-3">
              {/* Section Header */}
              <header className="flex items-center gap-2">
                <h2 className="text-lg font-semibold capitalize">
                  {type} services
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({list.length})
                </span>
              </header>

              {/* Cards */}
              <div className="grid grid-cols-4 gap-3">
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
  );
};

export default ServerListPage;
