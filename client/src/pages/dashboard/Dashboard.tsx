import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Folder, ArrowRight } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

interface Client {
  id: string;
  name: string;
  email: string;
  briefsCount: number;
  lastActive: string;
  status: "active" | "pending";
}

const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "jane@acmecorp.com",
    briefsCount: 3,
    lastActive: "2h ago",
    status: "active",
  },
  {
    id: "2",
    name: "Stark Industries",
    email: "tony@stark.com",
    briefsCount: 1,
    lastActive: "1d ago",
    status: "pending",
  },
  {
    id: "3",
    name: "Wayne Enterprises",
    email: "bruce@wayne.com",
    briefsCount: 5,
    lastActive: "3h ago",
    status: "active",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const Dashboard = () => {
  const { openModal } = useModalStore();
  const [search, setSearch] = useState("");
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const active = clients.filter((c) => c.status === "active").length;
  const pending = clients.filter((c) => c.status === "pending").length;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ── Topbar ── */}
        <div className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Briefd</p>
            <h1 className={styles.title}>Clients</h1>
          </div>
          <Button
            size="sm"
            className={styles.newBtn}
            onClick={() => openModal("ADD_CLIENT")}
          >
            <Plus size={13} />
            New client
          </Button>
        </div>

        {/* ── Stat strip ── */}
        <div className={styles.statStrip}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{clients.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={`${styles.statVal} ${styles.statGreen}`}>
              {active}
            </span>
            <span className={styles.statLabel}>Active</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={`${styles.statVal} ${styles.statAmber}`}>
              {pending}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className={styles.searchWrap}>
          <Search size={13} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search clients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button
              className={styles.searchClear}
              onClick={() => setSearch("")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                width="12"
                height="12"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className={styles.tableWrap}>
          {/* Header */}
          <div className={styles.tableHead}>
            <span className={`${styles.col} ${styles.colClient}`}>Client</span>
            <span className={`${styles.col} ${styles.colBriefs}`}>Briefs</span>
            <span className={`${styles.col} ${styles.colStatus}`}>Status</span>
            <span className={`${styles.col} ${styles.colActivity}`}>
              Last active
            </span>
            <span className={`${styles.col} ${styles.colActions}`} />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <Folder size={18} />
              </div>
              <p className={styles.emptyTitle}>
                {search ? `No results for "${search}"` : "No clients yet"}
              </p>
              <p className={styles.emptySub}>
                {search
                  ? "Try a different name or email."
                  : "Add your first client to generate a brief link."}
              </p>
              {!search && (
                <button
                  className={styles.emptyBtn}
                  onClick={() => openModal("ADD_CLIENT")}
                >
                  <Plus size={13} />
                  Add first client
                </button>
              )}
            </div>
          ) : (
            <div className={styles.rows}>
              {filtered.map((client) => (
                <div key={client.id} className={styles.row}>
                  {/* Avatar + name */}
                  <div className={`${styles.cell} ${styles.colClient}`}>
                    <div className={styles.avatar}>
                      {getInitials(client.name)}
                    </div>
                    <div className={styles.clientInfo}>
                      <span className={styles.clientName}>{client.name}</span>
                      <span className={styles.clientEmail}>{client.email}</span>
                    </div>
                  </div>

                  {/* Briefs count */}
                  <div className={`${styles.cell} ${styles.colBriefs}`}>
                    <span className={styles.briefsBadge}>
                      <Folder size={11} />
                      {client.briefsCount}
                    </span>
                  </div>

                  {/* Status */}
                  <div className={`${styles.cell} ${styles.colStatus}`}>
                    <span
                      className={`${styles.pill} ${
                        client.status === "active"
                          ? styles.pillGreen
                          : styles.pillAmber
                      }`}
                    >
                      <span className={styles.pillDot} />
                      {client.status}
                    </span>
                  </div>

                  {/* Last active */}
                  <div className={`${styles.cell} ${styles.colActivity}`}>
                    <span className={styles.timeAgo}>{client.lastActive}</span>
                  </div>

                  {/* Hover actions */}
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
          )}
        </div>
      </main>
    </div>
  );
};
