import { Link, useNavigate } from "react-router-dom";
import { Coffee, Sun, Moon, LogOut, Settings } from "lucide-react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/user/useAuthStore";
import styles from "./index.module.css";

export const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleDisconnect = () => {
    const ok = window.confirm(
      "Exit workspace? You'll need your secure token to get back in.",
    );
    if (ok) {
      localStorage.removeItem("adminToken");
      navigate("/");
    }
  };

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

          {/* Settings */}
          <button
            onClick={() => openModal("SETTINGS")}
            className={styles.iconBtn}
            title="Workspace settings"
            aria-label="Settings"
          >
            <Settings size={14} />
          </button>

          <span className={styles.rule} aria-hidden="true" />

          {/* Exit */}
          <button
            onClick={handleDisconnect}
            className={styles.exitBtn}
            title="Exit workspace"
          >
            <LogOut size={13} />
            <span className={styles.btnLabel}>Exit</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
