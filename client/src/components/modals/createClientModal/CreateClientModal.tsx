import { useState, useEffect, useRef, useCallback } from "react";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { useCreateClient } from "@/hooks/client/useClient";
import styles from "./index.module.css";

export const CreateClientModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { mutateAsync: createClient, isPending } = useCreateClient();

  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Client Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleClose = useCallback(() => {
    setName("");
    setEmail("");
    setCompanyName("");
    closeModal();
  }, [closeModal]);

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await createClient({
        name: name.trim(),
        email: email.trim(),
        companyName: companyName.trim() || undefined,
      });

      handleClose();
    } catch (err: any) {
      console.error("Failed to create client:", err);
      // You could add a toast error here if the email already exists (the 409 error)
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      aria-modal="true"
      role="dialog"
      aria-label="Add a new client"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Workspace</p>
            <h2 className={styles.title}>New Client</h2>
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
            {/* Name Input */}
            <div>
              <label htmlFor="name" className={styles.label}>
                Client Name
              </label>
              <input
                id="name"
                ref={firstInputRef}
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                disabled={isPending}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={isPending}
              />
            </div>

            {/* Company Input (Optional) */}
            <div>
              <label className={styles.label} htmlFor="company">
                Company <span style={{ opacity: 0.5 }}>(Optional)</span>
              </label>
              <input
                id="company"
                placeholder="Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.input}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer} style={{ marginTop: "2rem" }}>
            <Button
              type="submit"
              className={styles.submitBtn}
              style={{ width: "100%" }}
              disabled={isPending || !name.trim() || !email.trim()}
            >
              {isPending ? (
                <>
                  <span className={styles.spinner} />
                  Saving...
                </>
              ) : (
                "Save Client"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
