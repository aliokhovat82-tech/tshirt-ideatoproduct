// Garment data per docs/SPECS.md §1. Adding future garments should only
// require new entries here (plus new mockup images) — never new code paths.

export const GARMENT_COLORS = [
  { name: "White", hex: "#FFFFFF", slug: "white" },
  { name: "Black", hex: "#1A1A1A", slug: "black" },
  { name: "Heather Grey", hex: "#B2B4B3", slug: "heather-grey" },
  { name: "Navy", hex: "#1F2A44", slug: "navy" },
  { name: "Red", hex: "#C0392B", slug: "red" },
] as const;

export const GARMENT_TYPES = [
  { id: "tshirt", name: "Classic T-Shirt", mockupFolder: "tshirt" },
] as const;

type GarmentTypeId = (typeof GARMENT_TYPES)[number]["id"];
type GarmentColorSlug = (typeof GARMENT_COLORS)[number]["slug"];

// Mockup images live at public/garments/<mockupFolder>/<side>-<colorSlug>.png
export function getGarmentMockupUrl(
  garmentTypeId: GarmentTypeId,
  colorSlug: GarmentColorSlug,
  side: "front" | "back",
) {
  const type = GARMENT_TYPES.find((t) => t.id === garmentTypeId);
  if (!type) {
    throw new Error(`Unknown garment type: ${garmentTypeId}`);
  }
  return `/garments/${type.mockupFolder}/${side}-${colorSlug}.png`;
}
