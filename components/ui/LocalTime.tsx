"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

/** Current time in the given zone. Renders a neutral placeholder on the server. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-CA", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).format(
        new Date(),
      ),
    () => "--:--",
  );

  return <time suppressHydrationWarning>{time}</time>;
}
