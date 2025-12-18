"use client";

import { iServerItem } from "@/types/servers";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ArrowCounterClockwiseIcon } from "../ui/icons/akar-icons-arrow-counter-clockwise";
import { useState } from "react";
import { toast } from "sonner";

interface ServerCardItemProps {
  serverItem: iServerItem;
}

const ServerCardItem = ({ serverItem }: ServerCardItemProps) => {
  const [selectedModule, setSelectedModule] = useState<{
    server: string;
    module: string;
  } | null>(null);

  function handleRestartBtnClick(server: string, module: string) {
    toast(`Restarting server: ${server} / ${module}`);
    const restartServer = async () => {
      try {
        const response = await fetch(
          `/api/restart-server?server=${server}&module=${module}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(`Successfully restarted: ${server} / ${module}`);
        } else {
          toast.error(
            `Failed to restart: ${server} / ${module} - ${data.error}`
          );
        }
      } catch (error) {
        toast.error(`Error restarting: ${server} / ${module} - ${error}`);
      }
    };
    restartServer();
    // Implement restart logic here
  }

  return (
    <Card className="m-2 p-2 border border-gray-300 rounded w-1/2">
      <CardHeader>
        <CardTitle>{serverItem.server}</CardTitle>
        <CardDescription className="text-black">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div>
                {serverItem.modules.map((module) => (
                  <div
                    key={module.module}
                    onContextMenu={() =>
                      setSelectedModule({
                        server: serverItem.server,
                        module: module.module,
                      })
                    }
                    className="hover:bg-gray-200 py-1 px-2 rounded cursor-pointer"
                  >
                    {module.module} -{" "}
                    <strong
                      className={`px-1 rounded-sm ${
                        module.status === "RUNNING"
                          ? "text-white bg-emerald-600"
                          : "text-black bg-red-500"
                      }`}
                    >
                      {module.status}
                    </strong>{" "}
                    {module.pid ? `(PID: ${module.pid})` : ""}
                  </div>
                ))}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="flex items-center">
              <ContextMenuItem
                onClick={() => {
                  if (!selectedModule) return;
                  handleRestartBtnClick(
                    selectedModule.server,
                    selectedModule.module
                  );
                }}
              >
                Restart
              </ContextMenuItem>
              <ContextMenuShortcut>
                <ArrowCounterClockwiseIcon size={20} />
              </ContextMenuShortcut>
            </ContextMenuContent>
          </ContextMenu>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ServerCardItem;
