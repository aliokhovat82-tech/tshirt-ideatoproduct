"use client";

import { useCanvasStore } from "@/stores/canvasStore";

export function PropertyPanel() {
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);

  if (!selectedObjectId) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No object selected. Click an image on the canvas to see its properties.
      </p>
    );
  }

  // Task 50 replaces this with the real property fields.
  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">Object selected.</p>
  );
}
