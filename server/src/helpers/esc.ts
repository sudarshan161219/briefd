export const esc = (s: string | null | undefined) =>
  (s || "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
 
export const fmt = (d: Date | string | null | undefined, style: "long" | "short" = "long") =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: style === "long" ? "long" : "short",
        day: "numeric",
      })
    : null;