import { useState } from "react";
import { useUpdateClient } from "@/hooks/client/useClient";
import { useModalStore } from "@/store/useModalStore";
import { useEditClientStore } from "@/store/client/useEditClientStore";
import { toast } from "sonner";
import styles from "./index.module.css";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditClientModal = () => {
  const { closeModal } = useModalStore();
  const { client } = useEditClientStore();
  const { mutate, isPending } = useUpdateClient();

  const [form, setForm] = useState({
    name: client?.name,
    email: client?.email,
    companyName: client?.companyName || "",
  });

  if (!client) return;

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.name?.trim()) return;

    mutate(
      {
        id: client?.id,
        data: {
          name: form.name,
          email: form.email,
          companyName: form.companyName || undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success("Client updated successfully!");
          closeModal();
        },
      },
    );
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Client</p>
            <h3 className={styles.modalTitle}>Edit details</h3>
          </div>
          <button
            className={styles.modalClose}
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              value={form.name}
              onChange={set("name")}
              placeholder="Client name"
              autoFocus
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="client@company.com"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Company <span className={styles.optional}>optional</span>
            </label>
            <input
              className={styles.input}
              value={form.companyName}
              onChange={set("companyName")}
              placeholder="Company Inc."
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            variant="secondary"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={isPending || !form.name?.trim()}
          >
            {isPending ? (
              <>
                <span className={styles.spinner} />
                Saving…
              </>
            ) : (
              <>
                <Save size={13} />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
