import { create } from "zustand";

type OpenTranactionState = {
    id?: string;
    isOpen: boolean,
    onOpen: (id: string) => void,
    onClose: () => void
};

export const useOpenTransaction = create<OpenTranactionState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}))