import { create } from "zustand";

interface SlideBarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSideBar = create<SlideBarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSideBar;
