"use client";

import { useCanvasStore } from "@/stores/canvasStore";

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="font-medium text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
    </div>
  );
}

export function PropertyPanel() {
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const objects = useCanvasStore((s) => s.objects);
  const object = objects.find((o) => o.id === selectedObjectId);

  if (!object) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No object selected. Click an image on the canvas to see its properties.
      </p>
    );
  }

  // Stored as normalized 0-1 fractions of the canvas; displayed as
  // percentages since raw fractions wouldn't mean anything to the owner.
  return (
    <div className="flex flex-col gap-3">
      <PropertyRow
        label="Position X"
        value={`${Math.round(object.x * 100)}%`}
      />
      <PropertyRow
        label="Position Y"
        value={`${Math.round(object.y * 100)}%`}
      />
      <PropertyRow label="Width" value={`${Math.round(object.width * 100)}%`} />
      <PropertyRow
        label="Height"
        value={`${Math.round(object.height * 100)}%`}
      />
      <PropertyRow
        label="Opacity"
        value={`${Math.round(object.opacity * 100)}%`}
      />
    </div>
  );
}
