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

  /** AUTH FLOW STATE */
  const authRequiredRef = useRef(false);
  const isAuthenticatedRef = useRef(false);
  const passwordBufferRef = useRef("");

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
      if (!terminalRef.current) return;

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
      term.open(terminalRef.current);
      fitAddon.fit();
      term.focus();

      const ws = new WebSocket(
        `ws://localhost:${WS_PORT}?server=${server}`
      );

      ws.onopen = () => {
        socketReadyRef.current = true;
        term.writeln("\r\nConnected.");
      };

      ws.onerror = () => {
        term.writeln("\r\nWebSocket error.");
      };

      ws.onmessage = (e) => {
        const msg = e.data as string;

        /** AUTH REQUEST FROM SERVER */
        if (msg === "AUTH_REQUIRED") {
          authRequiredRef.current = true;
          term.writeln("\r\nPassword:");
          return;
        }

        term.write(msg);
      };

      /** TERMINAL INPUT HANDLER */
      term.onData((data) => {
        if (!socketReadyRef.current || !wsRef.current) return;

        /** PASSWORD MODE */
        if (authRequiredRef.current && !isAuthenticatedRef.current) {
          const char = data.charCodeAt(0);

          // ENTER
          if (char === 13) {
            ws.send(
              JSON.stringify({
                type: "AUTH",
                password: passwordBufferRef.current,
              })
            );

            passwordBufferRef.current = "";
            authRequiredRef.current = false;
            isAuthenticatedRef.current = true;

            term.write("\r\n");
            return;
          }

          // BACKSPACE
          if (char === 127) {
            if (passwordBufferRef.current.length > 0) {
              passwordBufferRef.current =
                passwordBufferRef.current.slice(0, -1);
              term.write("\b \b");
            }
            return;
          }

          // NORMAL CHAR → MASK
          passwordBufferRef.current += data;
          term.write("*");
          return;
        }

        /** NORMAL TERMINAL MODE */
        ws.send(data);
      });

      const onResize = () => fitAddon.fit();
      window.addEventListener("resize", onResize);

      termRef.current = term;
      wsRef.current = ws;

      return () => {
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);

      socketReadyRef.current = false;
      authRequiredRef.current = false;
      isAuthenticatedRef.current = false;
      passwordBufferRef.current = "";

      wsRef.current?.close();
      wsRef.current = null;

      termRef.current?.dispose();
      termRef.current = null;
    };
  }, [open, server]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="
          w-full max-w-none p-0 bg-slate-900
          [&>button]:text-white
        "
      >
        <DialogHeader className="px-4 py-2 border-b border-white/10">
          <DialogTitle className="text-white text-sm">
            Terminal — {server}
          </DialogTitle>
        </DialogHeader>

        <div
          ref={terminalRef}
          className="w-full h-[calc(100vh-100px)] bg-slate-900"
        />
      </DialogContent>
    </Dialog>
  );
}
