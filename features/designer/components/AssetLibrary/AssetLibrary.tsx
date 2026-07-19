"use client";

import { useAssetsStore } from "@/stores/assetsStore";

export function AssetLibrary() {
  const assets = useAssetsStore((s) => s.assets);

  if (assets.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {assets.map((asset) => (
        <div
          key={asset.id}
          title={asset.name}
          className="aspect-square overflow-hidden rounded-md border border-black/[.08] bg-zinc-50 dark:border-white/[.1] dark:bg-zinc-800"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- blob: object URLs aren't remote assets next/image can optimize */}
          <img
            src={asset.objectUrl}
            alt={asset.name}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
