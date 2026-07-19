// Garment data per docs/SPECS.md §1. Adding future garments should only
// require new entries here (plus new mockup images) — never new code paths.

export const GARMENT_COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Heather Grey", hex: "#B2B4B3" },
  { name: "Navy", hex: "#1F2A44" },
  { name: "Red", hex: "#C0392B" },
] as const;

export const GARMENT_TYPES = [
  { id: "tshirt", name: "Classic T-Shirt" },
] as const;
