"use client";

import { createContext, useContext, useState } from "react";

type ServerListContextValue = {
  queryParams: { [key: string]: string | string[] | undefined };
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const ServerListContext = createContext<ServerListContextValue | null>(null);

export const ServerListProvider = ({
  value,
  children,
}: {
  value: {
    queryParams: { [key: string]: string | string[] | undefined };
  };
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ServerListContext.Provider
      value={{
        queryParams: value.queryParams,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ServerListContext.Provider>
  );
};

export const useServerListContext = () => {
  const ctx = useContext(ServerListContext);
  if (!ctx) {
    throw new Error(
      "useServerListContext must be used inside ServerListProvider"
    );
  }
  return ctx;
};
