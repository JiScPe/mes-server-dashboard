"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function XTermClient({
  server,
  open,
  onClose,
}: {
  server: string;
  open: boolean;
  onClose: () => void;
}) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#0f172a",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-none w-1/2 h-screen p-0 bg-black">
        <DialogHeader className="px-4 py-2 border-b border-white/10">
          <DialogTitle className="text-white text-sm">
            Terminal — {server}
          </DialogTitle>
        </DialogHeader>

        <div ref={terminalRef} className="h-[calc(100vh-48px)] w-full" />
      </DialogContent>
    </Dialog>
  );
}
