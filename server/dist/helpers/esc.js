export const esc = (s) => (s || "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
export const fmt = (d, style = "long") => d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: style === "long" ? "long" : "short",
        day: "numeric",
    })
    : null;
//# sourceMappingURL=esc.js.map