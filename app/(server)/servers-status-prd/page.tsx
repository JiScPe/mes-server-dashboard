import RefreshStatusButton from "@/components/Navbar/RefreshStatusButton";
import ServerCardItem from "@/components/servers/ServerCardItem";
import { ToggleTheme } from "@/components/toggle-theme";
import {
  groupServersByType,
  SERVICE_TYPE_ORDER,
} from "@/lib/helpers/group-by-type";
import { iServersStatusResponse } from "@/types/servers";
import Image from "next/image";
import TpvLogo from './../../../public/icons/tpvlogo.png';
const API_URL = process.env.API_URL

const ServerListPage = async () => {
const data = await fetch(`${API_URL}/api/status-all-prd`, {
    cache: "no-store",
  });

  const { servers }: iServersStatusResponse = await data.json();

  const groupedServers = groupServersByType(servers);

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="flex justify-between w-full bg-tpv-main items-center pr-3">
        {/* left */}
        <div className="flex gap-2 items-center">
          <Image src={TpvLogo} width={120} height={40} alt="tpv-logo"/>
          <h1 className="text-2xl font-semibold text-white">MES Server List</h1>
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
