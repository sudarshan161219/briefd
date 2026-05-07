import { Link } from "react-router-dom";
import { Coffee, Sun, Moon, Trash } from "lucide-react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { useAuthStore } from "@/store/user/useAuthStore";
import styles from "./index.module.css";
import { useModalStore } from "@/store/useModalStore";

export const DashboardNavbar = () => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* ── Left: brand + workspace ── */}
        <div className={styles.left}>
          <Link to="/dashboard" className={styles.brand}>
            {/* Wordmark */}
            <span className={styles.brandWord}>briefd</span>
            <span className={styles.brandDot}>.</span>
          </Link>

          <span className={styles.sep} aria-hidden="true" />

          <span className={styles.workspace} title="workspaceName">
            {user?.name}
          </span>
        </div>

        {/* ── Right: actions ── */}
        <div className={styles.right}>
          {/* X / Twitter */}
          <a
            href="https://x.com/buildwithSud"
            target="_blank"
            rel="noreferrer"
            className={styles.ghostBtn}
            title="Follow on X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Support */}
          <a
            href="https://buymeacoffee.com/sudarshanhosalli"
            target="_blank"
            rel="noreferrer"
            className={styles.ghostBtn}
            title="Buy me a coffee"
          >
            <Coffee size={13} />
            <span className={styles.btnLabel}>Support</span>
          </a>

          <span className={styles.rule} aria-hidden="true" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={styles.iconBtn}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Settings - in future*/}

          <span className={styles.rule} aria-hidden="true" />

          {/* Exit */}
          <button
            onClick={() => openModal("DELETE_USER")}
            className={styles.exitBtn}
            title="Exit workspace"
          >
            <Trash size={13} />
            <span className={styles.btnLabel}>Delete</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
