import { useState, useEffect } from "react";
import { Plus, Search, Users } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { useClients } from "@/hooks/client/useClient";
import { Button } from "@/components/ui/button";
import { Cards } from "./cards/Cards";
import { Table } from "./table/Table";
import { CustomSelect } from "@/components/customSelect/CustomSelect";
import styles from "./index.module.css";

export const Dashboard = () => {
  const { openModal } = useModalStore();
  const [isMobile, setIsMobile] = useState(false);
  // Search & Filter State
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "companyName">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Fetch Clients
  const { data: clients, isLoading } = useClients({
    search: search || undefined,
    sortBy,
    order,
  });

  useEffect(() => {
    // Function to check the current window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the standard mobile/tablet breakpoint
    };

    // Run once on mount to set the initial state
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading)
    return (
      <div className={styles.loadingWrapper}>
        <span className={styles.waitingText}>
          Loading Clients<span className={styles.spinningEmoji}>⏳</span>
        </span>
      </div>
    );

  if (!clients || clients.length === 0) {
    return (
      <div className={styles.EmptyResponse}>
        <div className={styles.iconWrap}>
          <div className={styles.iconGrid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={styles.gridDot}></div>
            ))}
          </div>
          <Users size={26} strokeWidth={1.5} className={styles.icon} />
        </div>

        <div className={styles.EmptyResponseInfo}>
          <span className={styles.eyebrow}>Clients</span>
          <h2>No clients yet</h2>
          <p>
            Add your first client to start sending briefs and managing projects.
          </p>

          <Button
            onClick={() => openModal("CREATE_CLIENT")}
            className={styles.newBtn}
          >
            <Plus size={14} />
            Add new client
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* ── Topbar ── */}
        <div className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Workspace</p>
            <h1 className={styles.title}>Clients</h1>
          </div>
          <Button
            size="sm"
            className={styles.newBtn}
            onClick={() => openModal("CREATE_CLIENT")}
          >
            <Plus size={13} />
            New client
          </Button>
        </div>

        {/* ── Search & Controls ── */}
        <div className={styles.searchWrap}>
          {/* Search Input */}
          <div className={styles.searchInputWrap}>
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

          {/* Sort Controls */}
          <div className={styles.searchControls}>
            <CustomSelect
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              options={[
                { value: "name", label: "Sort by Name" },
                { value: "companyName", label: "Sort by Company" },
              ]}
            />
            <Button
              variant="secondary"
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              className={styles.sortOrderBtn}
            >
              Order: {order.toUpperCase()}
            </Button>
          </div>
        </div>

        {isMobile ? (
          <Cards clients={clients || []} />
        ) : (
          <Table clients={clients || []} />
        )}
      </main>
    </div>
  );
};
