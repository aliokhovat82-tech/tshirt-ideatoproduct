"use client";

import { useCanvasStore } from "@/stores/canvasStore";

export function LayerPanel() {
  const objectCount = useCanvasStore((s) => s.objects.length);

  if (objectCount === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No layers yet. Place an image on the canvas to see it here.
      </p>
    );
  }

  // Task 42 replaces this with the real list.
  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      {objectCount} layer{objectCount === 1 ? "" : "s"}
    </p>
  );
}
