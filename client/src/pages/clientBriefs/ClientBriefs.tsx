import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useClient } from "@/hooks/client/useClient";
import { useEditClientStore } from "@/store/client/useEditClientStore";
import { useClientIdStore } from "@/store/client/useClientIdStore";
import { Button } from "@/components/ui/button";
import { useBriefs } from "@/hooks/brief/useBrief";
import {
  ArrowLeft,
  Plus,
  Copy,
  Check,
  Building2,
  ArrowRight,
  Mail,
  Pencil,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";
import { getInitials } from "@/utils/getInitials";
import styles from "./index.module.css";

// ── Main ───────────────────────────────────────────────────
export const ClientBriefs = () => {
  const { id } = useParams();
  const { data: client, isLoading } = useClient(id);
  const { data: briefs, isLoading: isBriefsLoading } = useBriefs(id);
  const { openModal } = useModalStore();
  const { setClient } = useEditClientStore();
  const { setClientId } = useClientIdStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const completed = briefs?.filter((b) => b.status === "COMPLETED").length;
  const pending = briefs?.filter((b) => b.status === "PENDING").length;

  const handleCopy = (slug: string, briefId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/b/${slug}`);
    setCopiedId(briefId);
    toast.success("Link copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = () => {
    openModal("EDIT_CLIENT");
    setClient(client ?? null);
  };

  // const handleDelete = () => {
  //   if (
  //     !window.confirm(
  //       `Delete ${client?.name}? All their briefs will be removed.`,
  //     )
  //   )
  //     return;
  //   // TODO: DELETE /api/clients/:id
  //   toast.success("Client deleted");
  // };

  const handleCreateBrief = () => {
    setClientId(id);
    openModal("CREATE_BRIEF");
  };

  return (
    <div className={styles.page}>
      {/* ── Nav ── */}
      <div className={styles.navBar}>
        <Link to="/dashboard" className={styles.backLink}>
          <ArrowLeft size={13} /> Clients
        </Link>
      </div>

      <main className={styles.main}>
        {/* ── Client card ── */}
        {isLoading ? (
          <div className={styles.skeletonCard} />
        ) : (
          <div className={styles.clientCard}>
            <div className={styles.clientLeft}>
              <div className={styles.avatar}>{getInitials(client?.name)}</div>
              <div className={styles.clientInfo}>
                <h1 className={styles.clientName}>{client?.name}</h1>
                <div className={styles.clientMeta}>
                  <span className={styles.metaChip}>
                    <Mail size={10} />
                    {client?.email}
                  </span>
                  {client?.companyName && (
                    <span className={styles.metaChip}>
                      <Building2 size={10} />
                      {client.companyName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.clientActions}>
              <button
                className={styles.iconBtn}
                title="Edit client"
                onClick={handleEdit}
              >
                <Pencil size={13} />
              </button>
              {/* <button
                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                title="Delete client"
                onClick={handleDelete}
              >
                <Trash2 size={13} />
              </button> */}
              <div className={styles.actionRule} />
              <Button className={styles.newBtn} onClick={handleCreateBrief}>
                <Plus size={13} /> New brief
              </Button>
            </div>
          </div>
        )}

        {/* ── Stats ── */}
        <div className={styles.statStrip}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{briefs?.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={`${styles.statVal} ${styles.statGreen}`}>
              {completed}
            </span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={`${styles.statVal} ${styles.statAmber}`}>
              {pending}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </div>

        {/* ── Brief grid ── */}

        {!isBriefsLoading && briefs?.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                width="18"
                height="18"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>No briefs yet</p>
            <p className={styles.emptySub}>
              Create a brief to generate a shareable link for this client.
            </p>
            <Button className={styles.emptyBtn} onClick={handleCreateBrief}>
              <Plus size={13} /> Create first brief
            </Button>
          </div>
        ) : (
          <div className={styles.briefGrid}>
            {briefs?.map((brief) => {
              const url = `${window.location.origin}/b/${brief.slug}`;
              const isCopied = copiedId === brief.id;
              const isDone = brief.status === "COMPLETED";

              return (
                <div
                  key={brief.id}
                  className={`${styles.briefCard} ${isDone ? styles.cardGreen : styles.cardAmber}`}
                >
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3 className={styles.briefName}>{brief.name}</h3>
                        <p className={styles.briefDate}>
                          Created {brief.createdAt}
                        </p>
                      </div>
                      <span
                        className={`${styles.pill} ${isDone ? styles.pillGreen : styles.pillAmber}`}
                      >
                        {isDone ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <Clock size={10} />
                        )}
                        {isDone ? "Completed" : "Pending"}
                      </span>
                    </div>

                    <div>
                      <span className={styles.label}>
                        Send this link to your client to provide project
                        details.
                      </span>
                      <div className={styles.urlRow}>
                        <div className={styles.urlBox}>
                          <span className={styles.urlText}>{url}</span>
                          <button
                            className={`${styles.copyBtn} ${isCopied ? styles.copyBtnDone : ""}`}
                            onClick={() => handleCopy(brief.slug, brief.id)}
                            title="Copy link"
                          >
                            {isCopied ? (
                              <Check size={12} />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>

                        <Link
                          to={`/brief/${brief.id}/view`}
                          className={styles.openBtn}
                        >
                          Open <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
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
