import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/useModalStore";
import { useCreateBrief } from "@/hooks/brief/useBrief";

import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import { useClientIdStore } from "@/store/client/useClientIdStore";

export const CreateBriefModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clientId } = useClientIdStore();
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createBrief, isPending } = useCreateBrief();

  // Form State
  const [name, setName] = useState("");
console.log(clientId);
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
  }, [closeModal, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     await createBrief({
        name: name.trim(),
        clientId: clientId,
      });

      handleClose();
      // Navigate straight to the new brief's internal page
      navigate(`/clients/${clientId}`);
    } catch (err) {
      console.error("Failed to create brief:", err);
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      aria-modal="true"
      role="dialog"
      aria-label="Create new brief"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Workspace</p>
            <h2 className={styles.title}>New brief</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
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
          <div
            className={styles.fieldGroup}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Project Name Input */}
            <div>
              <label className={styles.label}>Project name</label>
              <input
                ref={firstInputRef}
                required
                placeholder="e.g. E-commerce Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className={styles.footer}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Button
              type="submit"
              className={styles.submitBtn}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
              disabled={isPending || !name.trim()}
            >
              {isPending ? (
                <>
                  <span className={styles.spinner} />
                  Creating…
                </>
              ) : (
                <>
                  Create Brief
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "16px", height: "16px" }}
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
