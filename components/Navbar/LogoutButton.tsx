"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { PowerIcon } from "lucide-react";

export function LogoutButton() {
  return (
    <Button onClick={() => signOut()} variant={"outline"} size={"sm"} className="text-red-500">
      <PowerIcon />
      Logout
    </Button>
  );
}
