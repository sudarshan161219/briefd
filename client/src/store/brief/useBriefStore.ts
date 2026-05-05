import { create } from "zustand";

interface BriefState {
  briefId: string | undefined;
  projectName?: string | null;

  // Actions
  setBriefInfo: (
    briefId: string | undefined,
    projectName?: string | null,
  ) => void;
}

export const useBriefStore = create<BriefState>((set) => ({
  briefId: undefined,
  projectName: null,

  setBriefInfo: (briefId, projectName) =>
    set({
      briefId,
      projectName,
    }),
}));
