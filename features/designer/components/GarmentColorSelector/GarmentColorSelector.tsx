"use client";

import { GARMENT_COLORS } from "@/constants/garments";
import { useDesignerStore } from "@/stores/designerStore";

export function GarmentColorSelector() {
  const garmentColorSlug = useDesignerStore((s) => s.garmentColorSlug);
  const setGarmentColorSlug = useDesignerStore((s) => s.setGarmentColorSlug);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Color
      </span>
      <div className="flex flex-wrap gap-2">
        {GARMENT_COLORS.map((color) => (
          <button
            key={color.slug}
            type="button"
            onClick={() => setGarmentColorSlug(color.slug)}
            aria-label={color.name}
            title={color.name}
            className={`h-8 w-8 rounded-full border-2 ${
              garmentColorSlug === color.slug
                ? "border-foreground"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
