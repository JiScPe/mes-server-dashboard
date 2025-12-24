"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const WS_PORT = process.env.NEXT_PUBLIC_WS_PORT;

export default function XTermClient({
  server,
  open,
  onClose,
}: {
  server: string;
  open: boolean;
  onClose: () => void;
}) {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const socketReadyRef = useRef(false);
  const fitAddon = new FitAddon();

  useLayoutEffect(() => {
    if (open) {
      setTimeout(() => fitAddon.fit(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let rafId: number;

    rafId = requestAnimationFrame(() => {
      if (!terminalRef.current) {
        console.warn("[XTERM] terminalRef not ready");
        return;
      }

      console.log("[XTERM] Initializing terminal");

      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        scrollback: 5000,
        theme: {
          background: "#0f172a",
          cursor: "#ffffff",
        },
      });

      term.loadAddon(fitAddon);
      requestAnimationFrame(() => fitAddon.fit());

      term.open(terminalRef.current);
      fitAddon.fit();
      term.focus();

      const ws = new WebSocket(`ws://localhost:${WS_PORT}?server=${server}`);

      ws.onopen = () => {
        socketReadyRef.current = true;
        console.log("[WS] Connected");
        term.write("\r\n\x1b[32mConnected to server\x1b[0m\r\n");
      };

      ws.onerror = (err) => {
        console.error("[WS] Error", err);
        term.write("\r\n\x1b[31mWebSocket error\x1b[0m\r\n");
      };

      ws.onmessage = (e) => term.write(e.data);

      term.onData((data) => {
        if (socketReadyRef.current) {
          ws.send(data);
        }
      });

      const onResize = () => fitAddon.fit();
      window.addEventListener("resize", onResize);

      termRef.current = term;
      wsRef.current = ws;

      // cleanup
      return () => {
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);

      socketReadyRef.current = false;

      wsRef.current?.close();
      wsRef.current = null;

      termRef.current?.dispose();
      termRef.current = null;

      console.log("[XTERM] Disposed");
    };
  }, [open, server]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="
          w-full max-w-none p-0 bg-slate-900
          [&>button]:text-white
          [&>button]:hover:text-gray-300
          [&>button]:focus:ring-white
        "
      >
        <DialogHeader className="px-4 py-2 border-b border-white/10">
          <DialogTitle className="text-white text-sm">
            Terminal — {server}
          </DialogTitle>
        </DialogHeader>

        <div
          ref={terminalRef}
          className="w-full h-[calc(100vh-100px)] bg-slate-900 rounded-md overflow-hidden"
        />
      </DialogContent>
    </Dialog>
  );
}
