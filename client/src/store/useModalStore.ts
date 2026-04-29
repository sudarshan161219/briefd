import { create } from "zustand";

export type ModalType =
  | "CREATE_BRIEF"
  | "CREATE_USER"
  | "CREATE_CLIENT"
  | "EDIT_CLIENT"
  | "DOWNLOAD"
  | "DELETE"
  | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;

  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,

  openModal: (type) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false, type: null }),
}));
