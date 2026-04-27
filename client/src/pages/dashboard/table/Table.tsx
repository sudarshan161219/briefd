import { Link } from "react-router-dom";
import { Plus, ArrowRight, Building2 } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import type { Client } from "@/hooks/client/useClient";
import { getInitials } from "@/utils/getInitials";
import styles from "./index.module.css";

interface Props {
  clients: Client[];
}

export const Table = ({ clients }: Props) => {
  const { openModal } = useModalStore();

  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableHead}>
        <span className={`${styles.col} ${styles.colClient}`}>Client</span>
        <span className={`${styles.col} ${styles.colBriefs}`}>Briefs</span>
        <span className={`${styles.col} ${styles.colStatus}`}>Status</span>
        <span className={`${styles.col} ${styles.colActivity}`}>Company</span>
        <span className={`${styles.col} ${styles.colActions}`} />
      </div>

      <div className={styles.rows}>
        {clients.map((client) => (
          <div key={client.id} className={styles.row}>
            {/* Avatar + Name + Email */}
            <div className={`${styles.cell} ${styles.colClient}`}>
              <div className={styles.avatar}>{getInitials(client.name)}</div>
              <div className={styles.clientInfo}>
                <span className={styles.clientName}>{client.name}</span>
                <span className={styles.clientEmail}>{client.email}</span>
              </div>
            </div>

            {/* Brief count */}
            <div className={`${styles.cell} ${styles.colBriefs}`}>
              <span className={styles.briefsBadge}>
                {client.briefs.length > 0 ? (
                  client.briefs.length
                ) : (
                  <span className={styles.emDash}>—</span>
                )}
              </span>
            </div>

            {/* Status */}
            <div className={`${styles.cell} ${styles.colStatus}`}>
              {client.briefs.length > 0 ? (
                <span className={`${styles.pill} ${styles.pillGreen}`}>
                  <span className={styles.pillDot} />
                  Active
                </span>
              ) : (
                <span className={`${styles.pill} ${styles.pillAmber}`}>
                  <span className={styles.pillDot} />
                  New
                </span>
              )}
            </div>

            {/* Company */}
            <div className={`${styles.cell} ${styles.colActivity}`}>
              <span
                className={styles.timeAgo}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                {client.companyName ? (
                  <>
                    <Building2
                      size={12}
                      style={{ opacity: 0.4, flexShrink: 0 }}
                    />
                    {client.companyName}
                  </>
                ) : (
                  <span className={styles.emDash}>—</span>
                )}
              </span>
            </div>

            {/* Hover Actions */}
            <div
              className={`${styles.cell} ${styles.colActions} ${styles.actions}`}
            >
              <button
                className={styles.rowBtn}
                title="New brief for this client"
                onClick={() => openModal("CREATE_BRIEF")}
              >
                <Plus size={13} />
              </button>
              <Link
                to={`/clients/${client.id}`}
                className={styles.rowBtnPrimary}
                title="Open client"
              >
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
