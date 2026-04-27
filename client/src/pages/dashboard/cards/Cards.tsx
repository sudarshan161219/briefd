import { Link } from "react-router-dom";
import { Plus, ArrowRight, Building2 } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import type { Client } from "@/hooks/client/useClient";
import { getInitials } from "@/utils/getInitials";
import styles from "./index.module.css";

interface Props {
  clients: Client[];
}

export const Cards = ({ clients }: Props) => {
  const { openModal } = useModalStore();

  return (
    <div className={styles.list}>
      {clients.map((client) => (
        <div key={client.id} className={styles.card}>
          {/* Top row: avatar + name/email + actions */}
          <div className={styles.cardTop}>
            <div className={styles.avatar}>{getInitials(client.name)}</div>
            <div className={styles.clientInfo}>
              <span className={styles.clientName}>{client.name}</span>
              <span className={styles.clientEmail}>{client.email}</span>
            </div>
            <div className={styles.actions}>
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

          {/* Bottom row: status + company + brief count */}
          <div className={styles.cardMeta}>
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

            {client.companyName && (
              <span className={styles.metaItem}>
                <Building2 size={11} style={{ opacity: 0.4 }} />
                {client.companyName}
              </span>
            )}

            {client.briefs.length > 0 && (
              <span className={styles.metaItem}>
                {client.briefs.length} brief
                {client.briefs.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
