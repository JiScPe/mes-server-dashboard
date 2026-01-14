"use client";

import { Server, ServiceType } from "@/types/servers";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useState } from "react";
import { TerminalIcon } from "lucide-react";
import TerminalModal from "../terminal/TerminalModal";

type ServerCardItemProps = {
  serverItem: Server;
  serverType: ServiceType;
};

const ServerCardItem = ({ serverItem, serverType }: ServerCardItemProps) => {
  const [open, setOpen] = useState(false);

  function setCardBgColor(type: ServiceType): string {
    switch (type) {
      case "ZOOKEEPER":
        return "bg-service-zoo";
      case "DB":
        return "bg-service-db";
      case "MONGO":
        return "bg-service-mongo";
      case "NGINX":
        return "bg-service-nginx";
      case "REDIS":
        return "bg-service-redis";
      case "MES_PRD_APP":
        return "bg-service-appserv";
      case "MES_QAS_APP":
        return "bg-service-appserv";
      case "WPCL":
        return "bg-service-wpcl";
      case "IOT":
        return "bg-service-iot";
      default:
        return "bg-muted";
    }
  }

  function checkNginxUpstreamStatus(
    serverName: string,
    serviceName: string,
    nginxUpstream: any[] | undefined
  ): boolean {
    if (!nginxUpstream) return true;
    const upstream = nginxUpstream.find(
      (up) => up.server_name === serverName && up.service_name === serviceName
    );
    return upstream ? upstream.isUpstream : true;
  }

  return (
    <>
      <Card
        className={`m-2 p-2 border border-gray-300 rounded w-full h-full overflow-y-auto bg-chart bg-transparent ${setCardBgColor(
          serverType
        )}`}
      >
        <CardHeader>
          <CardTitle>{serverItem.server}</CardTitle>
          <CardDescription className="text-black">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div>
                  {serverItem.services.map((service) =>
                    service.result.map(
                      ({ service, status, pid, nginx_upstream }) => (
                        <div
                          key={service}
                          className={`hover:bg-secondary py-1 px-2 rounded cursor-pointer text-card-foreground ${
                            checkNginxUpstreamStatus(
                              serverItem.server,
                              service,
                              nginx_upstream
                            )
                              ? ""
                              : "bg-gray-400 text-black"
                          }`}
                        >
                          <span>{service}: </span>
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
                      )
                    )
                  )}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="flex items-center">
                <ContextMenuItem onClick={() => setOpen(true)}>
                  Open Terminal
                </ContextMenuItem>
                <ContextMenuShortcut>
                  <TerminalIcon size={20} />
                </ContextMenuShortcut>
              </ContextMenuContent>
            </ContextMenu>
          </CardDescription>
        </CardHeader>
      </Card>

      {open && (
        <TerminalModal
          server={serverItem.server}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ServerCardItem;
