import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import { useDownloadDocumentStore } from "@/store/DownloadDocumentStore/useDownloadDocumentStore";
import { usePublicBrief } from "@/hooks/brief/useBrief";

export const DrawnCheck = () => {
  const { id } = useParams();
  const { data: brief, isLoading } = usePublicBrief(id);
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

  const getRelativeTime = (isoString: string): string => {
    const diff = Math.floor(
      (Date.now() - new Date(isoString).getTime()) / 1000,
    );

    if (diff < 10) return "Just now";
    if (diff < 60) return `${diff}s ago`;

    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;

    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

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
            <span className={styles.cellval}>{brief?.projectName}</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.celllabel}>Budget</span>
            <span className={styles.cellval}>{brief?.budgetRange}</span>
          </div>

          {brief?.deadline && (
            <div className={styles.cell}>
              <span className={styles.celllabel}>Deadline</span>
              <span className={styles.cellval}>
                {new Date(brief?.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div className={styles.cell}>
            <span className={styles.celllabel}>Sent</span>
            <span className={styles.cellval}>
              {brief?.updatedAt ? getRelativeTime(brief.updatedAt) : "—"}
            </span>
          </div>
        </div>

        <Button onClick={open} className={styles.cta}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save a copy
        </Button>
      </div>
    </div>
  );
};
