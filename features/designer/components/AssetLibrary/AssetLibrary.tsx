"use client";

import { useAssetsStore, type Asset } from "@/stores/assetsStore";
import { useCanvasStore } from "@/stores/canvasStore";

const DEFAULT_WIDTH_FRACTION = 0.3;

export function AssetLibrary() {
  const assets = useAssetsStore((s) => s.assets);
  const addObject = useCanvasStore((s) => s.addObject);
  const selectObject = useCanvasStore((s) => s.selectObject);

  if (assets.length === 0) return null;

  const handlePlace = (asset: Asset) => {
    const aspectRatio = asset.width / asset.height;
    const width = DEFAULT_WIDTH_FRACTION;
    const height = DEFAULT_WIDTH_FRACTION / aspectRatio;
    const id = addObject({
      assetId: asset.id,
      x: 0.5,
      y: 0.5,
      width,
      height,
      rotation: 0,
    });
    selectObject(id);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {assets.map((asset) => (
        <button
          key={asset.id}
          type="button"
          title={`Add ${asset.name} to canvas`}
          onClick={() => handlePlace(asset)}
          className="aspect-square overflow-hidden rounded-md border border-black/[.08] bg-zinc-50 transition-opacity hover:opacity-80 dark:border-white/[.1] dark:bg-zinc-800"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- blob: object URLs aren't remote assets next/image can optimize */}
          <img
            src={asset.objectUrl}
            alt={asset.name}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
