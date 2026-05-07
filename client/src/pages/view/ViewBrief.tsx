import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { socket } from "@/lib/socket/socket";
import { ArrowLeft } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { SonarPing } from "@/components/sonar_ping/SonarPing";
import { useModalStore } from "@/store/useModalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useBriefStore } from "@/store/brief/useBriefStore";
import { useBrief } from "@/hooks/brief/useBrief";
import styles from "./index.module.css";

const fieldLabels: Record<string, string> = {
  clientName: "Name",
  clientEmail: "Email",
  companyName: "Company Name",
  projectName: "Project Name",
  primaryGoal: "Primary Goal",
  needBuilt: "Project Requirements",
  targetAudience: "Target Audience",
  keyFeatures: "Key Features",
  avoid: "Things to Avoid",
  budgetRange: "Budget",
  deadline: "Deadline",
  assetsUrls: "Assets & Links",
  references: "References",
  additionalInfo: "Additional Info",
};

export const ViewBrief = () => {
  const { id } = useParams();
  const { data: brief, isLoading } = useBrief(id);
  const { openModal } = useModalStore();
  const { setBriefInfo } = useBriefStore();
  const [activeField, setActiveField] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!brief?.slug) return;

    const joinBrief = () => {
      socket.emit("join-brief", brief?.slug);
    };

    // Join immediately if already connected, or on (re)connect
    if (socket.connected) joinBrief();
    socket.on("connect", joinBrief);

    // Listen for brief submission
    socket.on(`brief-updated-${brief?.slug}`, () => {
      queryClient.invalidateQueries({ queryKey: ["brief", id] });
    });

    // Listen for client field activity
    const activityEvent = `client-activity-${brief?.slug}`;
    socket.on(activityEvent, ({ fieldName, isTyping }) => {
      setActiveField(isTyping ? fieldName : null);
    });

    return () => {
      socket.off("connect", joinBrief);
      socket.off(`brief-updated-${brief?.slug}`);
      socket.off(activityEvent);
    };
  }, [brief?.slug, id, queryClient]);

  // Helpers for dynamic data formatting
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const renderLinks = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((link, i) => {
      const trimmed = link.trim();
      if (!trimmed) return null;
      const href = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.metaLink}
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "12px",
            wordBreak: "break-all",
          }}
        >
          {trimmed}
        </a>
      );
    });
  };

  // Still loading initial fetch
  if (isLoading)
    return (
      <div className={styles.loadingWrapper}>
        <span className={styles.waitingText}>
          Loading brief<span className={styles.spinningEmoji}>⏳</span>
        </span>
      </div>
    );

  if (!brief) {
    return (
      <div className={styles.EmptyResponse}>
        <div style={{ marginBottom: "20px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className={styles.EmptyResponseInfo}>
          <h2>Brief Not Found</h2>
          <p>This brief may have been deleted, or the link is incorrect.</p>
          <Link to="/dashboard" className={styles.backbtn}>
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (brief?.status === "PENDING") {
    return (
      <SonarPing
        clientId={brief.clientId}
        slug={brief.slug}
        activeField={activeField}
        fieldLabels={fieldLabels}
      />
    );
  }

  const handleDownload = () => {
    openModal("DOWNLOAD");
    setBriefInfo(brief?.slug, brief?.projectName);
  };

  return (
    <div className={styles.container}>
      <Link to={`/clients/${brief.clientId}`} className={styles.backLink}>
        <ArrowLeft size={13} />
        Briefs
      </Link>

      <h1 className={styles.srOnly}>
        Brief dashboard for {brief?.projectName || "Project"}
      </h1>

      <div className={styles.topbar}>
        <div>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
            <ol className={styles.breadcrumbList}>
              <li>
                <Link to={`/clients/${brief?.clientId}`}>Briefs</Link>
                <span aria-hidden="true" className={styles.separator}>
                  &rsaquo;
                </span>
              </li>
              <li>
                <span aria-current="page" className={styles.breadcrumbCurrent}>
                  Briefd
                </span>
              </li>
            </ol>
          </nav>

          <h2 className={styles.title}>{brief.projectName || "Project"}</h2>

          <p className={styles.subtitle}>
            Submitted{" "}
            <time dateTime={brief.updatedAt}>
              {brief.updatedAt
                ? format(new Date(brief.updatedAt), "MMMM d, yyyy 'at' h:mm a")
                : "recently"}
            </time>
          </p>
        </div>

        <div className={styles.actions}>
          {/* 2. Use a status role for the pill so screen readers announce state changes */}
          <div
            className={styles.pill}
            role="status"
            aria-label="Status: Submitted"
          >
            <div className={styles.pillDot} aria-hidden="true"></div>
            Submitted
          </div>

          <Button onClick={handleDownload} size="sm" className={styles.btn}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save a copy
          </Button>
        </div>
      </div>

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Budget</div>
          <div className={styles.statVal}>
            {brief.budgetRange || "Not specified"}
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Deadline</div>
          <div className={styles.statVal} style={{ fontSize: "15px" }}>
            {brief.deadline
              ? format(new Date(brief.deadline), "MMM d, yyyy")
              : "Not specified"}
          </div>
          {brief.deadline && (
            <div className={styles.statSub}>
              {formatDistanceToNow(new Date(brief.deadline), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Company</div>
          <div className={styles.statVal} style={{ fontSize: "15px" }}>
            {brief.client.companyName || "N/A"}
          </div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Brief ID</div>
          <div
            className={styles.statVal}
            style={{ fontSize: "13px", fontFamily: "var(--font-mono)" }}
          >
            {id}
          </div>
          <div className={styles.statSub}>via link</div>
        </div>
      </div>

      <div className={styles.grid}>
        <aside>
          <div className={styles.card}>
            <div className={styles.cardHead}>Client</div>
            <div
              className={styles.metaRow}
              style={{ alignItems: "center", gap: "10px" }}
            >
              <div className={styles.avatar}>
                {getInitials(brief.client.name)}
              </div>
              <div>
                <div className={styles.metaVal}>{brief.client.name}</div>
                <div className={styles.metaKey}>Client</div>
              </div>
            </div>
            <div className={styles.metaRow}>
              <div className={styles.metaIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <div className={styles.metaKey}>Email</div>
                <a
                  href={`mailto:${brief.client.email}`}
                  className={styles.metaLink}
                >
                  {brief.client.email}
                </a>
              </div>
            </div>
            {brief.client.companyName && (
              <div className={styles.metaRow}>
                <div className={styles.metaIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metaKey}>Company</div>
                  <div className={styles.metaVal}>
                    {brief.client.companyName}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>Logistics</div>
            <div className={styles.metaRow}>
              <div className={styles.metaIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div>
                <div className={styles.metaKey}>Budget</div>
                <div className={styles.metaVal}>
                  {brief.budgetRange || "Not specified"}
                </div>
              </div>
            </div>
            {brief.deadline && (
              <div className={styles.metaRow}>
                <div className={styles.metaIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metaKey}>Deadline</div>
                  <div className={styles.metaVal}>
                    {format(new Date(brief.deadline), "MMMM d, yyyy")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {brief.assetsUrls && (
            <div className={styles.card}>
              <div className={styles.cardHead}>Assets provided</div>
              <div className={styles.assets}>
                {renderLinks(brief.assetsUrls)}
              </div>
            </div>
          )}

          {brief.references && (
            <div className={styles.card}>
              <div className={styles.cardHead}>References</div>
              <div className={styles.assets}>
                {renderLinks(brief.references)}
              </div>
            </div>
          )}
        </aside>

        <main>
          <div className={styles.goal}>
            <div className={styles.goalHead}>
              <div className={styles.goalIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#534AB7"
                  strokeWidth="1.5"
                  width="13"
                  height="13"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <span className={styles.goalLabel}>Primary goal</span>
            </div>
            <p className={styles.goalText}>
              {brief.primaryGoal || "No primary goal specified."}
            </p>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <span className={styles.sectionTitle}>
                What needs to be built
              </span>
            </div>
            <p
              className={styles.sectionBody}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {brief.needBuilt || "Details not provided."}
            </p>
          </div>

          {brief.targetAudience && (
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className={styles.sectionTitle}>Target audience</span>
              </div>
              <p
                className={styles.sectionBody}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {brief.targetAudience}
              </p>
            </div>
          )}

          {brief.keyFeatures && (
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className={styles.sectionTitle}>
                  Key features &amp; must-haves
                </span>
              </div>
              <p
                className={styles.sectionBody}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {brief.keyFeatures}
              </p>
            </div>
          )}

          {brief.avoid && (
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>
                <span className={styles.sectionTitle}>What to avoid</span>
              </div>
              <p
                className={styles.sectionBody}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {brief.avoid}
              </p>
            </div>
          )}

          {brief.additionalInfo && (
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <span className={styles.sectionTitle}>
                  Additional information
                </span>
              </div>
              <p
                className={styles.sectionBody}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {brief.additionalInfo}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
