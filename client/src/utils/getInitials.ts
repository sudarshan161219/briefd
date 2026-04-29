import type { Client } from "@/hooks/client/useClient";

export type { Client };

export const getInitials = (name: string | undefined) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
