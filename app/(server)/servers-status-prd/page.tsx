import RefreshStatusButton from "@/components/Navbar/RefreshStatusButton";
import ServerCardItem from "@/components/servers/ServerCardItem";
import { iServersStatusResponse, Server } from "@/types/servers";

const ServerListPage = async () => {
  const data = await fetch("http://localhost:3000/api/status-all-prd");
  const { servers }: iServersStatusResponse = await data.json();

  return (
    <div>
      <nav className="flex justify-between w-full p-3 bg-blue-300 items-center">
        <h1 className="text-2xl">ServerListPage</h1>
        <RefreshStatusButton />
      </nav>

      <section className="grid grid-cols-4 gap-3 p-3 h-screen">
        {servers.map((serverItem: Server) => (
          <ServerCardItem key={serverItem.server} serverItem={serverItem} />
        ))}
      </section>
    </div>
  );
};

export default ServerListPage;
