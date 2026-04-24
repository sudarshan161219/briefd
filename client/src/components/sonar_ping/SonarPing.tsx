import { type FC } from "react";
import { Sun, Moon, Coffee } from "lucide-react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import styles from "./index.module.css";

interface SonarPingProps {
  activeField: string | null;
  fieldLabels: Record<string, string>;
}

export const SonarPing: FC<SonarPingProps> = ({ activeField, fieldLabels }) => {
  const currentLabel = activeField ? fieldLabels[activeField] : null;
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={styles.panel} id="panel-e">
      <nav className={styles.nav}>
        <div className={styles.logo}>
          briefd<span>.</span>
        </div>
        <div className={styles.navRight}>
   

          <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="https://x.com/buildwithSud"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>

            <span style={{ fontSize: "0.75rem" }}>Follow</span>
          </a>

          <a
            href="https://buymeacoffee.com/sudarshanhosalli"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Coffee size={16} />
            <span style={{ fontSize: "0.75rem" }}>Support</span>
          </a>
        </div>
      </nav>

      <div className={styles.stage}>
        <div className={styles.radarwrap}>
          <div className={styles.radarring}></div>
          <div className={styles.radarring}></div>
          <div className={styles.radarring}></div>
          <div className={styles.radarcenter}></div>
        </div>
        <p className={styles.big}>Listening for your client</p>
        <p className={styles.small}>
          Watch the fields update the exact moment they type
        </p>

        <div className={styles.fieldchip} id="chip-e">
          <div className={styles.dot}></div>
          <span id="fe">
            {currentLabel ? (
              currentLabel
            ) : (
              <span className={styles.waitingText}>
                Waiting <span className={styles.spinningEmoji}>⏳</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
