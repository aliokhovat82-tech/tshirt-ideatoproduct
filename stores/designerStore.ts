import { create } from "zustand";
import { GARMENT_TYPES, GARMENT_COLORS } from "@/constants/garments";

export type Side = "front" | "back";
type GarmentTypeId = (typeof GARMENT_TYPES)[number]["id"];
type GarmentColorSlug = (typeof GARMENT_COLORS)[number]["slug"];

interface DesignerState {
  garmentTypeId: GarmentTypeId;
  garmentColorSlug: GarmentColorSlug;
  side: Side;
  setGarmentTypeId: (id: GarmentTypeId) => void;
  setGarmentColorSlug: (slug: GarmentColorSlug) => void;
  setSide: (side: Side) => void;
}

export const useDesignerStore = create<DesignerState>((set) => ({
  garmentTypeId: GARMENT_TYPES[0].id,
  garmentColorSlug: GARMENT_COLORS[0].slug,
  side: "front",
  setGarmentTypeId: (garmentTypeId) => set({ garmentTypeId }),
  setGarmentColorSlug: (garmentColorSlug) => set({ garmentColorSlug }),
  setSide: (side) => set({ side }),
}));
