"use client";

import { GARMENT_TYPES } from "@/constants/garments";
import { useDesignerStore } from "@/stores/designerStore";

export function GarmentTypeSelector() {
  const garmentTypeId = useDesignerStore((s) => s.garmentTypeId);
  const setGarmentTypeId = useDesignerStore((s) => s.setGarmentTypeId);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        Garment
      </span>
      <div className="flex flex-col gap-1">
        {GARMENT_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setGarmentTypeId(type.id)}
            className={`rounded-md px-3 py-2 text-left text-sm ${
              garmentTypeId === type.id
                ? "bg-foreground text-background"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
}
