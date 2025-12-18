"use client";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";

const RefreshStatusButton = () => {
  function handleBtnClick() {
    window.location.reload();
  }

  return (
    <Button onClick={handleBtnClick} variant="outline" size="sm">
      <RefreshCwIcon /> Refresh Status
    </Button>
  );
};

export default RefreshStatusButton;
