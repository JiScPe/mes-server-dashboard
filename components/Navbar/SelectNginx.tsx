"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useServerListContext } from "../contexts/ServerListContext";

type Props = {
  nginxserv: string | string[] | undefined;
};

const SelectNginx = ({ nginxserv }: Props) => {
  const [nginx, setnginx] = useState(nginxserv);
  const {setIsLoading} = useServerListContext()
  const router = useRouter();

  function handleNginxDropdownItemClick(value: string) {
    setIsLoading(true)
    setnginx(value);
    router.push(`/servers-status-prd?nginxserv=${value}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-auto px-2">
        <Button variant="outline" size="icon">
          {nginx ? `${nginx}` : "Select Nginx"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleNginxDropdownItemClick("NGINX_PRD_SERVER_1")}
        >
          Nginx 1
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNginxDropdownItemClick("NGINX_PRD_SERVER_2")}
        >
          Nginx 2
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectNginx;
