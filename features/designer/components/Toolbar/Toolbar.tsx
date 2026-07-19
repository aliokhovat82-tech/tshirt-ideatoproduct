// Tool actions are wired up in Phase 7 (Canvas Editing). This is a
// structural placeholder so the layout has a real toolbar region to test.
const TOOLS = ["Select", "Duplicate", "Delete"] as const;

export function Toolbar() {
  return (
    <div className="flex flex-col gap-1 p-3">
      {TOOLS.map((tool) => (
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
    </div>
  );
}
