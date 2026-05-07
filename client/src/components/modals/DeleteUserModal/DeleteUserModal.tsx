import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
// import { useDeleteUser } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

export const DeleteUserModal = () => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();
  const { mutate: deleteAccount, isPending } = useDeleteUser();

  // State for the confirmation input
  const [confirmText, setConfirmText] = useState("");
  const requiredPhrase = "DELETE MY ACCOUNT";

  const handleDelete = () => {
    if (confirmText !== requiredPhrase) return;

    deleteAccount(undefined, {
      onSuccess: () => {
        toast.success("Your account has been deleted.");
        localStorage.removeItem("authToken");
        closeModal();
        navigate("/", { replace: true });
      },
      onError: () => {
        toast.error(
          "Failed to delete account. Please try again or contact support.",
        );
      },
    });
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p
              className={styles.modalEyebrow}
              style={{ color: "var(--color-destructive, #ef4444)" }}
            >
              Danger Zone
            </p>
            <h3 className={styles.modalTitle}>Delete Account</h3>
          </div>
          <button
            className={styles.modalClose}
            onClick={closeModal}
            aria-label="Close"
            disabled={isPending}
          >
            <X size={14} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.warningBox}>
            <div className={styles.warningIconWrapper}>
              <AlertTriangle size={18} className={styles.warningIcon} />
            </div>
            <div className={styles.warningText}>
              <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                This is a permanent action
              </p>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5,
                  fontSize: "14px",
                }}
              >
                Deleting your account will permanently wipe all your data,
                including all connected clients, generated links, and project
                briefs. This cannot be undone.
              </p>
            </div>
          </div>

          <div className={styles.fieldGroup} style={{ marginTop: "24px" }}>
            <label className={styles.label}>
              Please type <strong>{requiredPhrase}</strong> to confirm.
            </label>
            <input
              className={styles.input}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={requiredPhrase}
              autoFocus
              disabled={isPending}
              style={{
                borderColor:
                  confirmText === requiredPhrase
                    ? "var(--color-destructive, #ef4444)"
                    : undefined,
              }}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            variant="secondary"
            className={styles.cancelBtn}
            onClick={closeModal}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={isPending || confirmText !== requiredPhrase}
          >
            {isPending ? (
              <>
                <span className={styles.spinner} />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 size={13} />
                Permanently delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
