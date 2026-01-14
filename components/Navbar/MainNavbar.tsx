"use client";
import Image from "next/image";
import React from "react";
import { ToggleTheme } from "../toggle-theme";
import SelectNginx from "./SelectNginx";
import RefreshStatusButton from "./RefreshStatusButton";
import TpvLogo from "./../../public/icons/tpvlogo.png";
import { useServerListContext } from "../contexts/ServerListContext";

const MainNavbar = () => {
  const { queryParams } = useServerListContext();
  return (
    <nav className="flex justify-between w-full bg-tpv-main items-center pr-3">
      {/* left */}
      <div className="flex gap-2 items-center">
        <Image src={TpvLogo} width={120} height={40} alt="tpv-logo" />
        <h1 className="text-2xl font-semibold text-white">MES Server List</h1>
      </div>

      {/* right */}
      <div className="flex gap-2">
        <ToggleTheme />
        {/* <SelectNginx nginxserv={queryParams.nginxserv} /> */}
        <RefreshStatusButton />
      </div>
    </nav>
  );
};

export default MainNavbar;
