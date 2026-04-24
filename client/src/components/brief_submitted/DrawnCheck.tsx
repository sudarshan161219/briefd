import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import { useDownloadDocumentStore } from "@/store/DownloadDocumentStore/useDownloadDocumentStore";

export const DrawnCheck = () => {
  const { open } = useDownloadDocumentStore();
  const [confettiPieces, setConfettiPieces] = useState(() => {
    const colors = [
      "#7C6FE0",
      "#1D9E75",
      "#CECBF6",
      "#a5f3d0",
      "#fbbf24",
      "#f472b6",
      "#60a5fa",
    ];

    return Array.from({ length: 44 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${1.1 + Math.random() * 1.3}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      width: `${5 + Math.random() * 7}px`,
      height: `${5 + Math.random() * 7}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    }));
  });

  useEffect(() => {
    if (confettiPieces.length > 0) {
      const timer = setTimeout(() => {
        setConfettiPieces([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confettiPieces]);

  return (
    <div className={styles.panel} id="panel-a">
      <div className={styles.stage} style={{ background: "var(--bg2)" }}>
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className={styles.piece}
            style={{
              left: p.left,
              background: p.background,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              width: p.width,
              height: p.height,
              overflow: "none",
              borderRadius: p.borderRadius,
              opacity: 1,
            }}
          />
        ))}

        <svg
          className={styles.svg}
          width="68"
          height="68"
          viewBox="0 0 68 68"
          style={{ marginBottom: "20px" }}
        >
          <circle
            cx="34"
            cy="34"
            r="27"
            fill="none"
            stroke="var(--purple)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <polyline
            points="21,35 30,44 47,25"
            fill="none"
            stroke="var(--purple)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className={styles.title}>Brief submitted.</h2>
        <p className={styles.sub}>
          The freelancer has received your requirements <br />
          and will be in touch soon.
        </p>
        <div className={styles.receipt}>
          <div className={styles.cell}>
            <span className={styles.celllabel}>Project</span>
            <span className={styles.cellval}>Portal Redesign</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.celllabel}>Budget</span>
            <span className={styles.cellval}>$2k–$5k</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.celllabel}>Sent</span>
            <span className={styles.cellval}>Just now</span>
          </div>
        </div>

        <Button onClick={open} className={styles.cta}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Save a copy
        </Button>
      </div>
    </div>
  );
};
