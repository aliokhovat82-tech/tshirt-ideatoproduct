"use client";

import { useState } from "react";
import { useAssetsStore } from "@/stores/assetsStore";
import { useCanvasStore } from "@/stores/canvasStore";

export function LayerPanel() {
  const objects = useCanvasStore((s) => s.objects);
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const selectObject = useCanvasStore((s) => s.selectObject);
  const reorderObjects = useCanvasStore((s) => s.reorderObjects);
  const assets = useAssetsStore((s) => s.assets);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (objects.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No layers yet. Place an image on the canvas to see it here.
      </p>
    );
  }

  // Topmost layer (rendered last / on top) shown first, matching every
  // other design tool's layer list convention. Display index and store
  // index are mirror images of each other: displayIndex = lastIndex -
  // storeIndex.
  const lastIndex = objects.length - 1;
  const layersTopFirst = [...objects].reverse();

  const handleDrop = (dropDisplayIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropDisplayIndex) return;
    reorderObjects(lastIndex - draggedIndex, lastIndex - dropDisplayIndex);
    setDraggedIndex(null);
  };

  return (
    <ul className="flex flex-col gap-1">
      {layersTopFirst.map((object, displayIndex) => {
        const asset = assets.find((a) => a.id === object.assetId);
        const isSelected = object.id === selectedObjectId;
        return (
          <li
            key={object.id}
            draggable
            onDragStart={() => setDraggedIndex(displayIndex)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(displayIndex)}
            onDragEnd={() => setDraggedIndex(null)}
            className="cursor-grab active:cursor-grabbing"
          >
            <button
              type="button"
              onClick={() => selectObject(object.id)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${
                isSelected
                  ? "bg-foreground text-background"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {asset && (
                // eslint-disable-next-line @next/next/no-img-element -- blob: object URLs aren't remote assets next/image can optimize
                <img
                  src={asset.objectUrl}
                  alt=""
                  className="h-6 w-6 shrink-0 rounded object-cover"
                />
              )}
              <span className="truncate">{object.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
