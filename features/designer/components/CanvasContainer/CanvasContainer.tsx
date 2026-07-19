"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva";

// Garment mockups are 2000x2000px (docs/SPECS.md §1), so the artboard
// keeps a 1:1 aspect ratio. Stage size tracks the box's actual rendered
// size so it stays sharp at any screen size. Size starts at 0 so the
// Stage (which needs a real browser canvas) never attempts to render
// during SSR.
export function CanvasContainer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const measure = () => setSize(el.getBoundingClientRect().width);
    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-100 p-6 dark:bg-zinc-900">
      <div
        ref={boxRef}
        className="aspect-square w-full max-w-[720px] rounded bg-white shadow-sm dark:bg-zinc-800"
      >
        {size > 0 && (
          <Stage width={size} height={size}>
            <Layer>
              <Text
                text="Canvas"
                x={0}
                y={size / 2 - 8}
                width={size}
                align="center"
                fontSize={16}
                fill="#a1a1aa"
              />
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}
