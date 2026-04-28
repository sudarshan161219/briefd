import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useClient } from "@/hooks/client/useClient";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Copy,
  Check,
  Building2,
  ArrowRight,
  Mail,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";
import { getInitials } from "@/utils/getInitials";
import styles from "./index.module.css";

interface Brief {
  id: string;
  name: string;
  slug: string;
  status: "COMPLETED" | "PENDING";
  createdAt: string;
}

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

// ── Edit modal ─────────────────────────────────────────────
interface EditClientModalProps {
  client: { name: string; email: string; companyName?: string };
  onSave: (d: { name: string; email: string; companyName: string }) => void;
  onClose: () => void;
}

const EditClientModal = ({ client, onSave, onClose }: EditClientModalProps) => {
  const [form, setForm] = useState({
    name: client.name,
    email: client.email,
    companyName: client.companyName || "",
  });
  const [saving, setSaving] = useState(false);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // replace with real API
    onSave(form);
    setSaving(false);
    toast.success("Client updated");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Client</p>
            <h3 className={styles.modalTitle}>Edit details</h3>
          </div>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              value={form.name}
              onChange={set("name")}
              placeholder="Client name"
              autoFocus
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="client@company.com"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Company <span className={styles.optional}>optional</span>
            </label>
            <input
              className={styles.input}
              value={form.companyName}
              onChange={set("companyName")}
              placeholder="Company Inc."
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            variant="secondary"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={saving || !form.name.trim()}
          >
            {saving ? (
              <>
                <span className={styles.spinner} />
                Saving…
              </>
            ) : (
              <>
                <Save size={13} />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Main ───────────────────────────────────────────────────
export const ClientBriefs = () => {
  const { id } = useParams();
  const { data, isLoading } = useClient(id);
  const { openModal } = useModalStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [localClient, setLocalClient] = useState<any>(null);

  const briefs = MOCK_BRIEFS;
  const client = localClient ?? data;
  const completed = briefs.filter((b) => b.status === "COMPLETED").length;
  const pending = briefs.filter((b) => b.status === "PENDING").length;

  const handleCopy = (slug: string, briefId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/b/${slug}`);
    setCopiedId(briefId);
    toast.success("Link copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = () => {
    if (
      !window.confirm(
        `Delete ${client?.name}? All their briefs will be removed.`,
      )
    )
      return;
    // TODO: DELETE /api/clients/:id
    toast.success("Client deleted");
  };

  const handleSave = (updated: {
    name: string;
    email: string;
    companyName: string;
  }) => {
    setLocalClient((prev: any) => ({ ...(prev ?? data), ...updated }));
    setShowEdit(false);
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
                onClick={() => setShowEdit(true)}
              >
                <Pencil size={13} />
              </button>
              <button
                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                title="Delete client"
                onClick={handleDelete}
              >
                <Trash2 size={13} />
              </button>
              <div className={styles.actionRule} />
              <Button
                className={styles.newBtn}
                onClick={() => openModal("CREATE_BRIEF")}
              >
                <Plus size={13} /> New brief
              </Button>
            </div>
          </div>
        )}

        {/* ── Stats ── */}
        <div className={styles.statStrip}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{briefs.length}</span>
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
        {briefs.length === 0 ? (
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
            <button
              className={styles.emptyBtn}
              onClick={() => openModal("CREATE_BRIEF")}
            >
              <Plus size={13} /> Create first brief
            </button>
          </div>
        ) : (
          <div className={styles.briefGrid}>
            {briefs.map((brief) => {
              const url = `${window.location.origin}/b/${brief.slug}`;
              const isCopied = copiedId === brief.id;
              const isDone = brief.status === "COMPLETED";

              return (
                <div key={brief.id} className={styles.briefCard}>
                  <div
                    className={`${styles.cardStripe} ${isDone ? styles.stripeGreen : styles.stripeAmber}`}
                  />

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

                    <div className={styles.urlRow}>
                      <div className={styles.urlBox}>
                        <span className={styles.urlText}>{url}</span>
                        <button
                          className={`${styles.copyBtn} ${isCopied ? styles.copyBtnDone : ""}`}
                          onClick={() => handleCopy(brief.slug, brief.id)}
                          title="Copy link"
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                      <Link
                        to={`/briefs/${brief.id}`}
                        className={styles.openBtn}
                      >
                        Open <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {showEdit && client && (
        <EditClientModal
          client={client}
          onSave={handleSave}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};
