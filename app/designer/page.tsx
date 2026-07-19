import { DesignerLayout, Toolbar } from "@/features/designer";

export default function DesignerPage() {
  return (
    <DesignerLayout
      toolbar={<Toolbar />}
      canvas={
        <div className="flex flex-1 items-center justify-center text-zinc-500 dark:text-zinc-400">
          Canvas
        </div>
      }
    />
  );
}
