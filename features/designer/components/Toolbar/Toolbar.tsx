"use client";

import { useCanvasStore } from "@/stores/canvasStore";

// Select and Duplicate are wired up in later phases/tasks. Delete and
// Undo are implemented (Tasks 40, 54).
export function Toolbar() {
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const removeObject = useCanvasStore((s) => s.removeObject);
  const canUndo = useCanvasStore((s) => s.history.past.length > 0);
  const undo = useCanvasStore((s) => s.undo);

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
      <div className="my-1 border-t border-black/[.08] dark:border-white/[.1]" />
      <button
        type="button"
        disabled={!canUndo}
        onClick={undo}
        title="Undo (Ctrl+Z)"
        className={`rounded-md px-3 py-2 text-left text-sm ${
          canUndo
            ? "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        Undo
      </button>
    </div>
  );
}
