"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import type Konva from "konva";
import { useHtmlImage } from "@/features/designer/hooks/useHtmlImage";
import { useDesignerStore } from "@/stores/designerStore";
import { getGarmentMockupUrl } from "@/constants/garments";
import type { Side } from "@/stores/designerStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { useAssetsStore } from "@/stores/assetsStore";
import { PlacedObject } from "@/features/designer/components/CanvasContainer/PlacedObject";

const SIDES: Side[] = ["front", "back"];

// Garment mockups are 2000x2000px (docs/SPECS.md §1), so the artboard
// keeps a 1:1 aspect ratio. Stage size tracks the box's actual rendered
// size so it stays sharp at any screen size. Size starts at 0 so the
// Stage (which needs a real browser canvas) never attempts to render
// during SSR.
export function CanvasContainer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const imageNodeRef = useRef<Konva.Image>(null);
  const [size, setSize] = useState(0);

  const garmentTypeId = useDesignerStore((s) => s.garmentTypeId);
  const garmentColorSlug = useDesignerStore((s) => s.garmentColorSlug);
  const side = useDesignerStore((s) => s.side);
  const setSide = useDesignerStore((s) => s.setSide);

  const objects = useCanvasStore((s) => s.objects);
  const assets = useAssetsStore((s) => s.assets);

  const mockupUrl = getGarmentMockupUrl(garmentTypeId, garmentColorSlug, side);
  const garmentImage = useHtmlImage(mockupUrl);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const measure = () => setSize(el.getBoundingClientRect().width);
    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The garment image loads asynchronously; Konva doesn't always repaint
  // on its own once the <Image> node's image prop changes, so force a
  // redraw once it's ready.
  useEffect(() => {
    imageNodeRef.current?.getLayer()?.draw();
  }, [garmentImage, size]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-zinc-100 p-6 dark:bg-zinc-900">
      <div className="flex rounded-full border border-black/[.1] p-1 dark:border-white/[.15]">
        {SIDES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={`rounded-full px-4 py-1 text-sm font-medium capitalize ${
              side === s
                ? "bg-foreground text-background"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        ref={boxRef}
        className="aspect-square w-full max-w-[720px] rounded bg-white shadow-sm dark:bg-zinc-800"
      >
        {size > 0 && (
          <Stage width={size} height={size}>
            <Layer>
              {garmentImage && (
                <KonvaImage
                  ref={imageNodeRef}
                  image={garmentImage}
                  width={size}
                  height={size}
                />
              )}
              {objects.map((object) => {
                const asset = assets.find((a) => a.id === object.assetId);
                if (!asset) return null;
                return (
                  <PlacedObject
                    key={object.id}
                    object={object}
                    asset={asset}
                    size={size}
                  />
                );
              })}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}
