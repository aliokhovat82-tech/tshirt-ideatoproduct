// Garment mockups are 2000x2000px (docs/SPECS.md §1), so the artboard
// keeps a 1:1 aspect ratio. The Konva stage mounts inside this box in Task 16.
export function CanvasContainer() {
  return (
    <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-100 p-6 dark:bg-zinc-900">
      <div className="flex aspect-square w-full max-w-[720px] items-center justify-center rounded bg-white text-zinc-400 shadow-sm dark:bg-zinc-800 dark:text-zinc-500">
        Canvas
      </div>
    </div>
  );
}
