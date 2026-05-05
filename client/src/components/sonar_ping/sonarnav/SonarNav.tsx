import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./index.module.css";
import { Button } from "@/components/ui/button";

interface SonarNavProps {
  clientId: string | null;
  slug: string | null;
  projectName?: string;
}

export const SonarNav = ({ clientId, slug, projectName }: SonarNavProps) => {
  const [copied, setCopied] = useState(false);

  const clientUrl = `${window.location.origin}/b/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(clientUrl);
    setCopied(true);
    toast.success("Client link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className={styles.nav}>
      {/* Left: breadcrumb */}
      <Link to={`/clients/${clientId}`} className={styles.backLink}>
        <ArrowLeft size={13} />
        <span>Briefs</span>
        {projectName && (
          <>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{projectName}</span>
          </>
        )}
      </Link>

      {/* Center: client view link */}
      <div className={styles.linkGroup}>
        <div className={styles.linkLabel}>
          <span className={styles.liveDot} />
          Client link
        </div>
        <div className={styles.urlChip}>
          <span className={styles.urlText}>{clientUrl}</span>
        </div>

        <div className={styles.vertical}></div>
      </div>

      {/* Right: client view link */}
      <div className={styles.right}>
        {/* <div className={styles.linkGroup}>
          <div className={styles.linkLabel}>
            <span className={styles.liveDot} />
            Client link
          </div>
          <div className={styles.urlChip}>
            <span className={styles.urlText}>{clientUrl}</span>
          </div>
        </div> */}

        <Button
          variant="ghost"
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={handleCopy}
          title="Copy client link"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </Button>

        <a
          href={clientUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.openBtn}
          title="Open client view"
        >
          <ExternalLink size={13} />
          Client view
        </a>
      </div>
    </nav>
  );
};
