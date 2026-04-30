import { Link } from "react-router-dom";
import { ArrowRight, Sun, Moon, Coffee } from "lucide-react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import styles from "./index.module.css";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/user/useAuthStore";

export const Home = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const { openModal } = useModalStore();

  return (
    <div className={styles.page}>
      <h2 className="sr-only">briefd — client intake landing page</h2>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          briefd<span>.</span>
        </div>
        <div className={styles.navRight}>
          <a href="#how" className={styles.navLink}>
            How it works
          </a>

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

      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          Zero-login
        </div>

        <h1 className={styles.h1}>
          Manage client intake,
          <br />
          <span className={styles.accent}>without the friction.</span>
        </h1>

        <p className={styles.subtitle}>
          Claim your local workspace in one click. Add clients, generate secure
          brief links, and watch their project requirements stream into your
          dashboard in real-time.
        </p>

        <div className={styles.ctaGroup}>
          {isAuthenticated ? (
            // --- RETURNING USERS  ---
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <p style={{ color: "#a1a1aa", fontSize: "1.125rem" }}>
                Welcome back,{" "}
                <span style={{ color: "#f4f4f5", fontWeight: 500 }}>
                  {user?.name}
                </span>
                .
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link to="/dashboard" className={styles.btnPrimary}>
                  Go to your workspace <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ) : (
            // ---  NEW VISITORS  ---
            <>
              <button
                onClick={() => openModal("CREATE_USER")}
                className={styles.btnPrimary}
              >
                Start your first brief <ArrowRight size={20} />
              </button>
              <a href="#how" className={styles.btnSecondary}>
                How it works
              </a>
            </>
          )}
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.features} id="features">
        <div className={styles.sectionEyebrow}>The Architecture</div>
        <div className={styles.sectionTitle}>
          Manage clients, not just links.
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className={styles.featureTitle}>Zero-setup Identity</div>
            <p className={styles.featureDesc}>
              Enter your name and you're done. We use secure, local browser
              tokens to mint your workspace instantly. No passwords, no
              onboarding emails.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className={styles.featureTitle}>Unified Client Profiles</div>
            <p className={styles.featureDesc}>
              Stop digging through messy form submissions. Every brief is
              automatically tied to a specific client profile in your dashboard
              for easy repeat business.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path>
                <path d="M2 6h4"></path>
                <path d="M2 10h4"></path>
                <path d="M2 14h4"></path>
                <path d="M2 18h4"></path>
                <path d="M21.4 2.6a2.14 2.14 0 0 1 0 3l-6 6-3 1 1-3 6-6a2.14 2.14 0 0 1 3 0Z"></path>
              </svg>
            </div>
            <div className={styles.featureTitle}>Async-first Briefs</div>
            <p className={styles.featureDesc}>
              Generate a cryptographically unique URL for a client. They open it
              and type. Your dashboard updates via WebSockets as they fill it
              out.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.howSection} id="how">
        <div className={styles.sectionEyebrow}>Workflow</div>
        <div className={styles.sectionTitle}>
          Three steps to your first brief
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>Claim your workspace</div>
              <p className={styles.stepDesc}>
                Click the "Start" button and enter your name. We silently
                generate a secure authentication token in your browser. You are
                now logged in, forever.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>
                Add a client & generate a link
              </div>
              <p className={styles.stepDesc}>
                Inside your dashboard, add your client's name. Generate a
                unique, single-use URL for their specific project and send it to
                them via email or Slack.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>
                Watch the brief build itself
              </div>
              <p className={styles.stepDesc}>
                Your client opens the link (no login required for them, either)
                and fills out their scope, budget, and goals. Your dashboard
                streams their answers live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Ready to simplify client intake?</h2>
        <p>No account needed. Your first brief is one click away.</p>
        <div className={styles.ctaGroup}>
          {isAuthenticated ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/dashboard" className={styles.btnPrimary}>
                Go to your workspace <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <button
              onClick={() => openModal("CREATE_USER")}
              className={styles.btnPrimary}
            >
              Start your first brief{" "}
              <span className={styles.btnArrow}>&rarr;</span>
            </button>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>briefd. — async client intake</span>
        <a href="#">Source code</a>
      </footer>
    </div>
  );
};
