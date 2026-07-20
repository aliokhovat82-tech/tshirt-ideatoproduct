"use client";

import { useEffect, useRef } from "react";
import { Image as KonvaImage } from "react-konva";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useHtmlImage } from "@/features/designer/hooks/useHtmlImage";
import { useCanvasStore, type CanvasObject } from "@/stores/canvasStore";
import type { Asset } from "@/stores/assetsStore";

// x/y are the object's center (normalized 0-1) so rotation happens around
// the center rather than the top-left corner — offsetX/offsetY implement
// that in Konva.
export function PlacedObject({
  object,
  asset,
  size,
}: {
  object: CanvasObject;
  asset: Asset;
  size: number;
}) {
  const image = useHtmlImage(asset.objectUrl);
  const nodeRef = useRef<Konva.Image>(null);
  const updateObject = useCanvasStore((s) => s.updateObject);

  // The image loads asynchronously; force a redraw once it's ready so the
  // object actually appears without needing an unrelated re-render to
  // happen to trigger it (same issue the garment mockup image has).
  useEffect(() => {
    nodeRef.current?.getLayer()?.draw();
  }, [image]);

  if (!image) return null;

  const width = object.width * size;
  const height = object.height * size;

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateObject(object.id, {
      x: e.target.x() / size,
      y: e.target.y() / size,
    });
  };

  return (
    <KonvaImage
      ref={nodeRef}
      image={image}
      x={object.x * size}
      y={object.y * size}
      width={width}
      height={height}
      offsetX={width / 2}
      offsetY={height / 2}
      rotation={object.rotation}
      draggable
      onDragEnd={handleDragEnd}
    />
  );
}
