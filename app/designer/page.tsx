import {
  DesignerLayout,
  Toolbar,
  CanvasContainer,
  GarmentTypeSelector,
  GarmentColorSelector,
  ImageManagerPanel,
  LayerPanel,
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
      toolbar={
        <div className="flex h-full flex-col overflow-y-auto">
          <ImageManagerPanel />
          <div className="border-t border-black/[.08] dark:border-white/[.1]">
            <Toolbar />
          </div>
        </div>
      }
      canvas={<CanvasContainer />}
      mobileExtraTabs={[{ label: "Images", content: <ImageManagerPanel /> }]}
      panels={{
        Layers: <LayerPanel />,
        Properties: <ComingSoon label="Properties" />,
        Garment: (
          <div className="flex flex-col gap-6">
            <GarmentTypeSelector />
            <GarmentColorSelector />
          </div>
        ),
      }}
    />
  );
}
