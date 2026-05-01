import { type FC } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SonarNav } from "./sonarnav/SonarNav";
import styles from "./index.module.css";

interface SonarPingProps {
  clientId: string | null;
  activeField: string | null;
  fieldLabels: Record<string, string>;
}

export const SonarPing: FC<SonarPingProps> = ({
  clientId,
  activeField,
  fieldLabels,
}) => {
  const currentLabel = activeField ? fieldLabels[activeField] : null;

  return (
    <div className={styles.panel} id="panel-e">
      <SonarNav clientId={clientId} />

      {/* <div className={styles.navBar}>
        <Link to={`/clients/${clientId}`} className={styles.backLink}>
          <ArrowLeft size={13} /> Briefs
        </Link>

        <Button>client view</Button>
      </div> */}

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
