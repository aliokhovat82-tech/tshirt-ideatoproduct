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

function PercentField({
  label,
  valuePercent,
  onChange,
}: {
  label: string;
  valuePercent: number;
  onChange: (percent: number) => void;
}) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={1}
          max={500}
          value={Math.round(valuePercent)}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            if (!Number.isNaN(parsed)) onChange(parsed);
          }}
          className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-right text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <span className="text-zinc-500 dark:text-zinc-400">%</span>
      </div>
    </label>
  );
}

export function PropertyPanel() {
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const objects = useCanvasStore((s) => s.objects);
  const updateObject = useCanvasStore((s) => s.updateObject);
  const object = objects.find((o) => o.id === selectedObjectId);

  if (!object) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No object selected. Click an image on the canvas to see its properties.
      </p>
    );
  }

  // Width/height edits keep the object's current aspect ratio, matching
  // how the canvas Transformer's resize handles already behave (Task 37) —
  // typing a width shouldn't distort the image in a way dragging wouldn't.
  const handleWidthPercent = (percent: number) => {
    const newWidth = Math.max(0.01, percent / 100);
    const aspectRatio = object.width / object.height;
    updateObject(object.id, {
      width: newWidth,
      height: newWidth / aspectRatio,
    });
  };

  const handleHeightPercent = (percent: number) => {
    const newHeight = Math.max(0.01, percent / 100);
    const aspectRatio = object.width / object.height;
    updateObject(object.id, {
      height: newHeight,
      width: newHeight * aspectRatio,
    });
  };

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
      <PercentField
        label="Width"
        valuePercent={object.width * 100}
        onChange={handleWidthPercent}
      />
      <PercentField
        label="Height"
        valuePercent={object.height * 100}
        onChange={handleHeightPercent}
      />
      <PropertyRow
        label="Opacity"
        value={`${Math.round(object.opacity * 100)}%`}
      />
    </div>
  );
}
