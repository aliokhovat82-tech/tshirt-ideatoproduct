import { create } from "zustand";

// In-memory only for now — Supabase Storage isn't configured until
// Phase 12B (docs/development-tasks.md), matching guest mode in
// docs/SPECS.md §6. Uploading to cloud storage happens then, not here.
export interface Asset {
  id: string;
  file: File;
  objectUrl: string;
  name: string;
  width: number;
  height: number;
  fileSize: number;
}

interface AssetsState {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, "id">) => void;
}

export const useAssetsStore = create<AssetsState>((set) => ({
  assets: [],
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, { ...asset, id: crypto.randomUUID() }],
    })),
}));
