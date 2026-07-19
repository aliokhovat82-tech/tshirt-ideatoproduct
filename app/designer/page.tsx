import {
  DesignerLayout,
  Toolbar,
  CanvasContainer,
  GarmentTypeSelector,
} from "@/features/designer";

function ComingSoon({ label }: { label: string }) {
  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      {label} panel — coming soon.
    </p>
  );
}

export default function DesignerPage() {
  return (
    <DesignerLayout
      toolbar={<Toolbar />}
      canvas={<CanvasContainer />}
      panels={{
        Layers: <ComingSoon label="Layers" />,
        Properties: <ComingSoon label="Properties" />,
        Garment: <GarmentTypeSelector />,
      }}
    />
  );
}
