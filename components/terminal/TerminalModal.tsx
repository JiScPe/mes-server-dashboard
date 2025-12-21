"use client";

import dynamic from "next/dynamic";

const XTerm = dynamic(
  () => import("./XTermClient"),
  { ssr: false }
);

export default function TerminalModal({
  server,
  open,
  onClose,
}: {
  server: string;
  open: boolean;
  onClose: () => void;
}) {
  return <XTerm server={server} open={open} onClose={onClose} />;
}
