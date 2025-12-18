"use client";

import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Loader2 className="animate-spin" />
      <div className="text-xl">Loading page content...</div>
    </div>
  );
};

export default loading;