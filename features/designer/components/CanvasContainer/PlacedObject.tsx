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
  onSelect,
  registerNode,
}: {
  object: CanvasObject;
  asset: Asset;
  size: number;
  onSelect: () => void;
  registerNode: (id: string, node: Konva.Image | null) => void;
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

  // nodeRef only attaches once the KonvaImage below actually mounts, which
  // doesn't happen until `image` finishes loading (see the early return) —
  // so this must also depend on `image`, or the node never re-registers
  // once it becomes available.
  useEffect(() => {
    registerNode(object.id, nodeRef.current);
    return () => registerNode(object.id, null);
  }, [object.id, registerNode, image]);

  if (!image) return null;

  const width = object.width * size;
  const height = object.height * size;

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateObject(object.id, {
      x: e.target.x() / size,
      y: e.target.y() / size,
    });
  };

  const handleTransformEnd = () => {
    const node = nodeRef.current;
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    updateObject(object.id, {
      x: node.x() / size,
      y: node.y() / size,
      width: (node.width() * scaleX) / size,
      height: (node.height() * scaleY) / size,
      rotation: node.rotation(),
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
      opacity={object.opacity}
      draggable={!object.locked}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      onClick={object.locked ? undefined : onSelect}
      onTap={object.locked ? undefined : onSelect}
    />
  );
}
