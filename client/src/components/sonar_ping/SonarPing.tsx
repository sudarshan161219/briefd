import { type FC } from "react";
import { SonarNav } from "./sonarnav/SonarNav";
import styles from "./index.module.css";

interface SonarPingProps {
  clientId: string | null;
  slug: string | null;
  activeField: string | null;
  fieldLabels: Record<string, string>;
}

export const SonarPing: FC<SonarPingProps> = ({
  clientId,
  slug,
  activeField,
  fieldLabels,
}) => {
  const currentLabel = activeField ? fieldLabels[activeField] : null;

  return (
    <div className={styles.panel} id="panel-e">
      <SonarNav slug={slug} clientId={clientId} />

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
