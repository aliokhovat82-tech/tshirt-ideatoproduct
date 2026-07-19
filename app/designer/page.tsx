import { DesignerLayout } from "@/features/designer";

export default function DesignerPage() {
  return (
    <DesignerLayout
      toolbar={
        <p className="p-4 text-sm text-zinc-500 dark:text-zinc-400">Toolbar</p>
      }
      canvas={
        <div className="flex flex-1 items-center justify-center text-zinc-500 dark:text-zinc-400">
          Canvas
        </div>
      }
    />
  );
}
