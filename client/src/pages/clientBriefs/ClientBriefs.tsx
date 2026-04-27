import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Copy,
  Check,
  Building2,
  ArrowRight,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";
// Assuming you have the same getInitials utility from the table
import { getInitials } from "@/utils/getInitials";
import styles from "./index.module.css";

// MOCK DATA TYPES
interface Client {
  name: string;
  email: string;
  companyName?: string;
}

interface Brief {
  id: string;
  name: string;
  slug: string;
  status: "COMPLETED" | "PENDING";
  createdAt: string;
}

// MOCK DATA
const MOCK_CLIENT: Client = {
  name: "Acme Corp",
  email: "jane@acmecorp.com",
  companyName: "Acme Corporation",
};

const MOCK_BRIEFS: Brief[] = [
  {
    id: "1",
    name: "E-commerce Redesign",
    slug: "brf_abc123",
    status: "COMPLETED",
    createdAt: "Oct 12, 2026",
  },
  {
    id: "2",
    name: "Q4 Landing Page",
    slug: "brf_xyz789",
    status: "PENDING",
    createdAt: "Oct 24, 2026",
  },
];

export const ClientBriefs = () => {
  const { id } = useParams();
  const { openModal } = useModalStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const client = MOCK_CLIENT;
  const briefs = MOCK_BRIEFS;

  const handleCopyLink = (slug: string, briefId: string) => {
    const url = `${window.location.origin}/b/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(briefId);
    toast.success("Brief link copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={styles.pageWrap}>
      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <Link to="/dashboard" className={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Clients</span>
        </Link>
      </nav>

      {/* ── Header Area ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatarLg}>{getInitials(client.name)}</div>
          <div className={styles.clientInfo}>
            <h1 className={styles.clientName}>{client.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaText}>{client.email}</span>
              {client.companyName && (
                <>
                  <span className={styles.dot}></span>
                  <span className={styles.metaText}>
                    <Building2 size={12} className={styles.metaIcon} />
                    {client.companyName}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          className={styles.primaryBtn}
          onClick={() => openModal("CREATE_BRIEF")}
        >
          <Plus size={14} />
          New Brief
        </button>
      </header>

      {/* ── Content ── */}
      <main className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Project Briefs</h2>
          <span className={styles.badgeCount}>{briefs.length}</span>
        </div>

        {briefs?.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <LinkIcon size={20} />
            </div>
            <p className={styles.emptyTitle}>No briefs generated yet</p>
            <p className={styles.emptySub}>
              Create a brief to generate a shareable client portal.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {briefs.map((brief) => {
              const url = `${window.location.origin}/b/${brief.slug}`;
              const isCopied = copiedId === brief.id;

              return (
                <div key={brief.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.briefName}>{brief.name}</h3>
                      <p className={styles.briefDate}>
                        Created {brief.createdAt}
                      </p>
                    </div>

                    {/* Status Pill (Reusing Table logic) */}
                    <span
                      className={`${styles.pill} ${
                        brief.status === "COMPLETED"
                          ? styles.pillGreen
                          : styles.pillAmber
                      }`}
                    >
                      <span className={styles.pillDot} />
                      {brief.status === "COMPLETED" ? "Active" : "Pending"}
                    </span>
                  </div>

                  <div className={styles.cardBottom}>
                    {/* Sleek URL Input + Copy Combo */}
                    <div className={styles.urlBox}>
                      <span className={styles.urlText}>{url}</span>
                      <button
                        onClick={() => handleCopyLink(brief.slug, brief.id)}
                        className={styles.copyBtn}
                        title="Copy magic link"
                      >
                        {isCopied ? (
                          <Check size={14} className={styles.successColor} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    <Link to={`/briefs/${brief.id}`} className={styles.viewBtn}>
                      Open
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
