"use client";

import { useCanvasStore } from "@/stores/canvasStore";

// Select and Duplicate are wired up in later phases/tasks. Delete is
// implemented here (Task 40).
export function Toolbar() {
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const removeObject = useCanvasStore((s) => s.removeObject);

  return (
    <div className="flex flex-col gap-1 p-3">
      {["Select", "Duplicate"].map((tool) => (
        <button
          key={tool}
          type="button"
          disabled
          title="Coming soon"
          className="rounded-md px-3 py-2 text-left text-sm text-zinc-400 dark:text-zinc-500"
        >
          {tool}
        </button>
      ))}
      <button
        type="button"
        disabled={!selectedObjectId}
        onClick={() => {
          if (selectedObjectId) removeObject(selectedObjectId);
        }}
        title={
          selectedObjectId ? "Delete selected object" : "Select an object first"
        }
        className={`rounded-md px-3 py-2 text-left text-sm ${
          selectedObjectId
            ? "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        Delete
      </button>
    </div>
  );
}
