import { create } from "zustand";

interface BriefState {
  briefId: string | undefined;
  projectName?: string;

  // Actions
  setBriefInfo: (briefId: string | undefined, projectName?: string) => void;
}

export const useBriefStore = create<BriefState>((set) => ({
  briefId: undefined,
  projectName: "project",

  setBriefInfo: (briefId, projectName) =>
    set({
      briefId,
      projectName,
    }),
}));
