"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import type Konva from "konva";
import { useHtmlImage } from "@/features/designer/hooks/useHtmlImage";

// Garment mockups are 2000x2000px (docs/SPECS.md §1), so the artboard
// keeps a 1:1 aspect ratio. Stage size tracks the box's actual rendered
// size so it stays sharp at any screen size. Size starts at 0 so the
// Stage (which needs a real browser canvas) never attempts to render
// during SSR.
export function CanvasContainer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const imageNodeRef = useRef<Konva.Image>(null);
  const [size, setSize] = useState(0);
  const garmentImage = useHtmlImage("/garments/tshirt/front-white.png");

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
    <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-100 p-6 dark:bg-zinc-900">
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
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}
