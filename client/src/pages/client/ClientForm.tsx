import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { DrawnCheck } from "@/components/brief_submitted/DrawnCheck";
import styles from "./index.module.css";
import { useSubmitPublicBrief, usePublicBrief } from "@/hooks/brief/useBrief";
import { socket } from "@/lib/socket/socket";
import { Button } from "@/components/ui/button";

export const ClientForm = () => {
  const { id } = useParams();
  const { theme, toggleTheme } = useThemeStore();
  const { mutateAsync: submitBrief, isPending } = useSubmitPublicBrief();
  const { data: brief, isLoading } = usePublicBrief(id);
  const isSubmitted = brief?.status === "COMPLETED";

  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem(`brief-draft-${id}`);
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (e) {
        console.error(`Failed to parse saved draft ${e}`);
      }
    }
    return {
      clientName: "",
      clientEmail: "",
      companyName: "",
      primaryGoal: "",
      assetsUrls: "",
      projectName: "",
      needBuilt: "",
      targetAudience: "",
      keyFeatures: "",
      avoid: "",
      deadline: "",
      budgetRange: "<$500",
      references: "",
      additionalInfo: "",
    };
  });

  // 2. Draft Auto-saving
  useEffect(() => {
    localStorage.setItem(`brief-draft-${id}`, JSON.stringify(formData));
  }, [formData, id]);

  useEffect(() => {
    const joinBrief = () => {
      if (id) socket.emit("join-brief", id);
    };

    if (socket.connected) joinBrief();
    socket.on("connect", joinBrief);

    return () => {
      socket.off("connect", joinBrief);
    };
  }, [id]);

  // 3. Helper to emit typing activity (working)
  const handleActivity = (fieldName: string, isTyping: boolean) => {
    if (socket.connected) {
      socket.emit("field-focus", {
        briefId: id,
        fieldName,
        isTyping,
      });
    } else {
      console.warn("Socket is not connected yet!");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitBrief({
        slug: id as string,
        data: {
          ...formData,
          deadline: formData.deadline
            ? new Date(formData.deadline).toISOString()
            : null,
        },
      });
      localStorage.removeItem(`brief-draft-${id}`);
    } catch (error) {
      console.error("Error submitting brief:", error);
    }
  };

  if (isSubmitted) {
    return <DrawnCheck />;
  }

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <h2 className={styles.srOnly}>Project brief intake form</h2>
        <button onClick={toggleTheme} className="cursor-pointer">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <form id="form-view" onSubmit={handleSubmit}>
        <p className={styles.eyebrow}>Briefd</p>
        <h1 className={styles.title}>
          Tell us about your <em>project.</em>
        </h1>
        <p className={styles.subtitle}>
          Your progress is saved automatically to this browser.
        </p>

        <div className={styles.autosave}>
          <div className={styles.dot}></div>
          Draft saved
        </div>

        {/* client section */}

        <div className={styles.section}>
          {brief?.client ? (
            <div className={styles.clientCard}>
              <div className={styles.clientHeader}>
                <div className={styles.avatar}>
                  {brief.client.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <p className={styles.clientName}>{brief.client.name}</p>
                  <p className={styles.clientSub}>Prepared for this brief</p>
                </div>
              </div>
              <div className={styles.clientMeta}>
                {brief.client.companyName && (
                  <div className={styles.clientMetaItem}>
                    <span className={styles.clientMetaKey}>Company</span>
                    <span className={styles.clientMetaVal}>
                      {brief.client.companyName}
                    </span>
                  </div>
                )}
                <div className={styles.clientMetaItem}>
                  <span className={styles.clientMetaKey}>Email</span>
                  <span className={styles.clientMetaValMono}>
                    {brief.client.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.sectionLabel}>Who are you</p>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Your name</label>
                  <input
                    className={styles.input}
                    value={formData.clientName}
                    type="text"
                    placeholder="Alex Chen"
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    onFocus={() => handleActivity("clientName", true)}
                    onBlur={() => handleActivity("clientName", false)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Email{" "}
                    <span className={styles.optionalLabel}>(optional)</span>
                  </label>
                  <input
                    className={styles.input}
                    value={formData.clientEmail}
                    type="email"
                    placeholder="alex@company.com"
                    onChange={(e) =>
                      setFormData({ ...formData, clientEmail: e.target.value })
                    }
                    onFocus={() => handleActivity("clientEmail", true)}
                    onBlur={() => handleActivity("clientEmail", false)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  Company{" "}
                  <span className={styles.optionalLabel}>(optional)</span>
                </label>
                <input
                  className={styles.input}
                  value={formData.companyName}
                  type="text"
                  placeholder="Acme Inc."
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  onFocus={() => handleActivity("companyName", true)}
                  onBlur={() => handleActivity("companyName", false)}
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>The project</p>

          <div className={styles.field}>
            <label className={styles.label}>Project name</label>
            <input
              className={styles.input}
              value={formData.projectName}
              type="text"
              placeholder="Customer Portal Redesign"
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              onFocus={() => handleActivity("projectName", true)}
              onBlur={() => handleActivity("projectName", false)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Primary goal</label>
            <p className={styles.hint}>
              e.g. Generate more leads, automate a manual process, modernize our
              brand.
            </p>
            <input
              className={styles.input}
              value={formData.primaryGoal}
              type="text"
              placeholder="What does success look like?"
              onChange={(e) =>
                setFormData({ ...formData, primaryGoal: e.target.value })
              }
              onFocus={() => handleActivity("primaryGoal", true)}
              onBlur={() => handleActivity("primaryGoal", false)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              What exactly do you need built?
            </label>
            <textarea
              className={styles.textarea}
              rows={5}
              value={formData.needBuilt}
              placeholder="Describe the deliverable in as much detail as you can. The more context, the better."
              onChange={(e) =>
                setFormData({ ...formData, needBuilt: e.target.value })
              }
              onFocus={() => handleActivity("needBuilt", true)}
              onBlur={() => handleActivity("needBuilt", false)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Target audience{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <input
              className={styles.input}
              value={formData.targetAudience}
              type="text"
              placeholder="Who will be using this?"
              onChange={(e) =>
                setFormData({ ...formData, targetAudience: e.target.value })
              }
              onFocus={() => handleActivity("targetAudience", true)}
              onBlur={() => handleActivity("targetAudience", false)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Key features{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={formData.keyFeatures}
              placeholder="What are the absolute must-have features?"
              onChange={(e) =>
                setFormData({ ...formData, keyFeatures: e.target.value })
              }
              onFocus={() => handleActivity("keyFeatures", true)}
              onBlur={() => handleActivity("keyFeatures", false)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Things to avoid{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              className={styles.textarea}
              rows={2}
              value={formData.avoid}
              placeholder="Any specific styles, features, or patterns you definitely don't want?"
              onChange={(e) =>
                setFormData({ ...formData, avoid: e.target.value })
              }
              onFocus={() => handleActivity("avoid", true)}
              onBlur={() => handleActivity("avoid", false)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Scope &amp; timeline</p>

          <div className={styles.field}>
            <label className={styles.label}>Approximate budget</label>
            <div className={styles.budgetGrid}>
              <div className={styles.budgetOpt}>
                <input
                  type="radio"
                  name="budget"
                  id="b1"
                  value="<$500"
                  checked={formData.budgetRange === "<$500"}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                />
                <label htmlFor="b1">&lt;$500</label>
              </div>

              <div className={styles.budgetOpt}>
                <input
                  type="radio"
                  name="budget"
                  id="b2"
                  value="500-2k"
                  checked={formData.budgetRange === "500-2k"}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                />
                <label htmlFor="b2">$500–$2k</label>
              </div>

              <div className={styles.budgetOpt}>
                <input
                  type="radio"
                  name="budget"
                  id="b3"
                  value="2k-5k"
                  checked={formData.budgetRange === "2k-5k"}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                />
                <label htmlFor="b3">$2k–$5k</label>
              </div>

              <div className={styles.budgetOpt}>
                <input
                  type="radio"
                  name="budget"
                  id="b4"
                  value="5k+"
                  checked={formData.budgetRange === "5k+"}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                />
                <label htmlFor="b4">$5k+</label>
              </div>

              <div className={styles.budgetOpt}>
                <input
                  type="radio"
                  name="budget"
                  id="b5"
                  value="custom"
                  checked={
                    formData.budgetRange === "custom" ||
                    (!["<$500", "500-2k", "2k-5k", "5k+"].includes(
                      formData.budgetRange,
                    ) &&
                      formData.budgetRange !== "")
                  }
                  onChange={() =>
                    setFormData({ ...formData, budgetRange: "custom" })
                  }
                />
                <label htmlFor="b5">Custom</label>
              </div>
            </div>

            {(formData.budgetRange === "custom" ||
              !["<$500", "500-2k", "2k-5k", "5k+", ""].includes(
                formData.budgetRange,
              )) && (
              <div className={styles.customBudgetOpt}>
                <label htmlFor="b6">Custom</label>
                <input
                  id="b6"
                  className={styles.input}
                  type="text"
                  placeholder="e.g. $3,500 or negotiable"
                  value={
                    ["<$500", "500-2k", "2k-5k", "5k+", "custom"].includes(
                      formData.budgetRange,
                    )
                      ? ""
                      : formData.budgetRange
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                  onFocus={() => handleActivity("budgetRange", true)}
                  onBlur={() => handleActivity("budgetRange", false)}
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Deadline{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <input
              className={styles.input}
              type="date"
              style={{ colorScheme: "light dark" }}
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              onFocus={() => handleActivity("deadline", true)}
              onBlur={() => handleActivity("deadline", false)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Assets & References</p>
          <div className={styles.field}>
            <label className={styles.label}>Existing assets or links</label>
            <p className={styles.hint}>
              Figma files, your current website, Google Drive folders, brand
              guidelines, etc.
            </p>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="Paste URLs here, one per line."
              value={formData.assetsUrls}
              onChange={(e) =>
                setFormData({ ...formData, assetsUrls: e.target.value })
              }
              onFocus={() => handleActivity("assetsUrls", true)}
              onBlur={() => handleActivity("assetsUrls", false)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              References or Inspiration{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="Links to competitors or examples of work you like."
              value={formData.references}
              onChange={(e) =>
                setFormData({ ...formData, references: e.target.value })
              }
              onFocus={() => handleActivity("references", true)}
              onBlur={() => handleActivity("references", false)}
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Anything Else?</p>
          <div className={styles.field}>
            <label className={styles.label}>
              Additional information{" "}
              <span
                style={{
                  fontWeight: 400,
                  color: "var(--color-text-tertiary)",
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              className={styles.textarea}
              rows={4}
              placeholder="Any other details we should know about?"
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData({ ...formData, additionalInfo: e.target.value })
              }
              onFocus={() => handleActivity("additionalInfo", true)}
              onBlur={() => handleActivity("additionalInfo", false)}
            />
          </div>
        </div>

        <Button className={styles.submitBtn} type="submit">
          Submit brief
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Button>
      </form>
    </div>
  );
};
