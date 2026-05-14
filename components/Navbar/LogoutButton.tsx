"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { PowerIcon } from "lucide-react";

export function LogoutButton() {
  return (
    <Button onClick={() => authClient.signOut()} variant={"outline"} size={"sm"} className="text-red-500">
      <PowerIcon />
      Logout
    </Button>
  );
}
