import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

export const CreateBriefModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [prefillData, setPrefillData] = useState({
    name: "",
    clientName: "",
    clientEmail: "",
    companyName: "",
  });

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const set =
    (k: keyof typeof prefillData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setPrefillData((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:8080/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefillData),
      });

      if (!res.ok) throw new Error("Failed to generate brief");

      const data = await res.json();
      const shareLink = `${window.location.origin}/brief/${data.id}`;
      const viewLink = `${window.location.origin}/brief/${data.id}/view`;

      const existing = JSON.parse(
        localStorage.getItem("brief-history") || "[]",
      );
      localStorage.setItem(
        "brief-history",
        JSON.stringify([
          {
            id: data.id,
            name: prefillData.name,
            client: shareLink,
            user: viewLink,
            date: new Date().toISOString(),
          },
          ...existing,
        ]),
      );

      closeModal();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closeModal()}
      aria-modal="true"
      role="dialog"
      aria-label="Create new brief"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Briefd</p>
            <h2 className={styles.title}>New brief</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Project name — full width, prominent */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Project name</label>
            <input
              ref={firstInputRef}
              required
              placeholder="e.g. E-commerce Redesign"
              value={prefillData.name}
              onChange={set("name")}
              className={`${styles.input} ${styles.inputLarge}`}
              disabled={isGenerating}
            />
          </div>

          <div className={styles.divider} />

          {/* Client row */}
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Client name
                <span className={styles.optional}>optional</span>
              </label>
              <input
                placeholder="Jane Smith"
                value={prefillData.clientName}
                onChange={set("clientName")}
                className={styles.input}
                disabled={isGenerating}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Client email
                <span className={styles.optional}>optional</span>
              </label>
              <input
                type="email"
                placeholder="jane@company.com"
                value={prefillData.clientEmail}
                onChange={set("clientEmail")}
                className={styles.input}
                disabled={isGenerating}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Company
              <span className={styles.optional}>optional</span>
            </label>
            <input
              placeholder="Acme Inc."
              value={prefillData.companyName}
              onChange={set("companyName")}
              className={styles.input}
              disabled={isGenerating}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerHint}>
              A shareable link will be generated for your client.
            </p>
            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={isGenerating || !prefillData.name.trim()}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner} />
                  Generating…
                </>
              ) : (
                <>
                  Generate link
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.btnIcon}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
