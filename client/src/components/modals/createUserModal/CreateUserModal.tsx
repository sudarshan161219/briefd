import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/user/useCreateUser";
import styles from "./index.module.css";

export const CreateProfileModal = () => {
  const { isOpen, closeModal } = useModalStore();

  // 1. Grab mutateAsync and isPending from your React Query hook
  const { mutateAsync: createUser, isPending } = useCreateUser();

  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser({ name: name.trim() });
      //  Route to dashboard and close modal
      navigate("/dashboard");
      closeModal();
    } catch (err) {
      console.error("Failed to create profile:", err);
    }
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closeModal()}
      aria-modal="true"
      role="dialog"
      aria-label="Create your profile"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>briefd.</p>
            <h2 className={styles.title}>Welcome</h2>
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
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              What should clients call you?
            </label>
            <input
              ref={firstInputRef}
              required
              placeholder="e.g. Sudarshan or Acme Studio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} ${styles.inputLarge}`}
              disabled={isPending}
            />
          </div>

          {/* Footer */}
          <div className={styles.footer} style={{ marginTop: "2rem" }}>
            <p className={styles.footerHint}>
              No passwords, no sign-up. We use a secure local token.
            </p>
            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={isPending || !name.trim()}
            >
              {/* 4. Swap isGenerating for React Query's isPending */}
              {isPending ? (
                <>
                  <span className={styles.spinner} />
                  Setting up…
                </>
              ) : (
                <>
                  Continue to dashboard
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
