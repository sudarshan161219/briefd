import { useState, useEffect, useRef } from "react";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import { useBriefStore } from "@/store/brief/useBriefStore";

// ─── Types ───────────────────────────────────────────────────
type Format = "pdf" | "doc" | "txt";

// ─── Format definitions ───────────────────────────────────────
const FORMATS: {
  id: Format;
  label: string;
  ext: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "pdf",
    label: "PDF",
    ext: ".pdf",
    description: "Best for sharing. Styled, print-ready.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    id: "doc",
    label: "Word",
    ext: ".doc",
    description: "Editable in Microsoft Word.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13l1.5 4 1.5-3 1.5 3L15 13" />
      </svg>
    ),
  },
  {
    id: "txt",
    label: "Plain Text",
    ext: ".txt",
    description: "Universal. Works anywhere.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────
export const DownloadModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { briefId, projectName } = useBriefStore();
  const [selected, setSelected] = useState<Format>("pdf");
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset state when reopened
  useEffect(() => {
    if (isOpen) {
      setSelected("pdf");
      setDone(false);
      setDownloading(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  const handleDownload = async () => {
    if (downloading || done) return;
    setDownloading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/brief/${briefId}/download?format=${selected}`,
      );
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeProject =
        projectName?.replace(/\s+/g, "-").toLowerCase() || "project";
      a.href = url;
      a.download = `${safeProject}-brief.${selected}`;
      a.click();
      URL.revokeObjectURL(url);

      setDone(true);
      setTimeout(() => {
        setDone(false);
        setDownloading(false);
      }, 2200);
    } catch (err) {
      console.error(err);
      setDownloading(false);
    }
  };

  if (!isOpen) return null;

  const activeFormat = FORMATS.find((f) => f.id === selected)!;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closeModal()}
      aria-modal="true"
      role="dialog"
      aria-label="Download brief"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Export</p>
            <h2 className={styles.title}>Download brief</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Format selector */}
        <div className={styles.formatGrid}>
          {FORMATS.map((f) => (
            <button
              key={f.id}
              className={`${styles.formatCard} ${selected === f.id ? styles.formatCardActive : ""}`}
              onClick={() => setSelected(f.id)}
              aria-pressed={selected === f.id}
            >
              <div className={styles.formatIcon}>{f.icon}</div>
              <span className={styles.formatLabel}>{f.label}</span>
              <span className={styles.formatExt}>{f.ext}</span>
            </button>
          ))}
        </div>

        {/* Description strip */}
        <div className={styles.descStrip}>
          <div className={styles.descDot} />
          <p className={styles.descText}>{activeFormat.description}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="ghost"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className={`${styles.downloadBtn} ${downloading && !done ? styles.downloadBtnLoading : ""} ${done ? styles.downloadBtnDone : ""}`}
            onClick={handleDownload}
            disabled={downloading}
          >
            {done ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.btnIcon}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved
              </>
            ) : downloading ? (
              <>
                <span className={styles.spinner} />
                Generating…
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.btnIcon}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download {activeFormat.label}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
