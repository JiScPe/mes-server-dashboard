"use client";

import { Result, Server, Service } from "@/types/servers";
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

type ServerCardItemProps = {
  serverItem: Server;
};

const ServerCardItem = ({serverItem}: ServerCardItemProps) => {
  const [selectedService, setSelectedService] = useState<{
    server: string;
    service: string;
  } | null>(null);

  function handleRestartBtnClick(server: string, service: string) {
    toast(`Restarting server: ${server} / ${service}`);
    const restartServer = async () => {
      try {
        const response = await fetch(
          `/api/restart-server?server=${server}&service=${service}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(`Successfully restarted: ${server} / ${service}`);
        } else {
          toast.error(
            `Failed to restart: ${server} / ${service} - ${data.error}`
          );
        }
      } catch (error) {
        toast.error(`Error restarting: ${server} / ${service} - ${error}`);
      }
    };
    restartServer();
    // Implement restart logic here
  }

  return (
    <Card className="m-2 p-2 border border-gray-300 rounded w-full h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>{serverItem.server}</CardTitle>
        <CardDescription className="text-black">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div>
                {serverItem.services.map((service) => (
                  service.result.map(({service, status, pid}) => (
                  <div
                    key={service}
                    className="hover:bg-gray-200 py-1 px-2 rounded cursor-pointer"
                  >
                      <span
                        key={service}
                        onClick={() =>
                          setSelectedService({
                            server: serverItem.server,
                            service: service,
                          })
                        }
                      >
                        {service}:
                      </span>
                    <strong
                      className={`px-1 rounded-sm ${
                        status === "RUNNING"
                          ? "text-white bg-emerald-600"
                          : "text-black bg-red-500"
                      }`}
                    >
                      {status}
                    </strong>{" "}
                    {pid ? `(PID: ${pid})` : ""}
                  </div>
                  ))
                
                ))}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="flex items-center">
              <ContextMenuItem
                onClick={() => {
                  if (!selectedService) return;
                  handleRestartBtnClick(
                    selectedService.server,
                    selectedService.service
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
