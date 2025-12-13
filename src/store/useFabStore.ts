import { create } from 'zustand'

interface FabState {
  open: boolean;
  setOpen: (open: boolean) => void;
  active: string;
  setActive: (active: string) => void;
}

export const useFabStore = create<FabState>((set) => ({
  open: false,
  setOpen: (open) => set({ open: open }),
  active: "",
  setActive: (active) => set({ active: active }),
}))
