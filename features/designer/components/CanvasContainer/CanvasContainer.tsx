"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useHtmlImage } from "@/features/designer/hooks/useHtmlImage";
import { useDesignerStore } from "@/stores/designerStore";
import { getGarmentMockupUrl } from "@/constants/garments";
import type { Side } from "@/stores/designerStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { useAssetsStore } from "@/stores/assetsStore";
import { PlacedObject } from "@/features/designer/components/CanvasContainer/PlacedObject";

const SIDES: Side[] = ["front", "back"];
const MIN_TRANSFORM_SIZE = 20;

// Garment mockups are 2000x2000px (docs/SPECS.md §1), so the artboard
// keeps a 1:1 aspect ratio. Stage size tracks the box's actual rendered
// size so it stays sharp at any screen size. Size starts at 0 so the
// Stage (which needs a real browser canvas) never attempts to render
// during SSR.
export function CanvasContainer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const imageNodeRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const objectNodes = useRef<Map<string, Konva.Image>>(new Map());
  const [size, setSize] = useState(0);
  // A node registering is invisible to React (it only mutates a ref), but
  // the Transformer needs to re-sync once a node becomes available — this
  // makes that moment observable so the effect below re-runs.
  const [nodeVersion, setNodeVersion] = useState(0);

  const garmentTypeId = useDesignerStore((s) => s.garmentTypeId);
  const garmentColorSlug = useDesignerStore((s) => s.garmentColorSlug);
  const side = useDesignerStore((s) => s.side);
  const setSide = useDesignerStore((s) => s.setSide);

  const objects = useCanvasStore((s) => s.objects);
  const selectedObjectId = useCanvasStore((s) => s.selectedObjectId);
  const selectObject = useCanvasStore((s) => s.selectObject);
  const removeObject = useCanvasStore((s) => s.removeObject);
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const assets = useAssetsStore((s) => s.assets);

  const mockupUrl = getGarmentMockupUrl(garmentTypeId, garmentColorSlug, side);
  const garmentImage = useHtmlImage(mockupUrl);

  const registerNode = useCallback((id: string, node: Konva.Image | null) => {
    if (node) {
      objectNodes.current.set(id, node);
    } else {
      objectNodes.current.delete(id);
    }
    setNodeVersion((v) => v + 1);
  }, []);

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

  // Attach the shared Transformer to whichever node is currently selected.
  useEffect(() => {
    const transformer = transformerRef.current;
    if (!transformer) return;
    const selectedNode = selectedObjectId
      ? objectNodes.current.get(selectedObjectId)
      : null;
    transformer.nodes(selectedNode ? [selectedNode] : []);
    transformer.getLayer()?.batchDraw();
  }, [selectedObjectId, objects, nodeVersion]);

  // Keyboard delete + undo. Guards against firing while typing in a form
  // field (Property Panel's inputs, Layer rename). Undo isn't gated on
  // selection — it's a global history action, not a per-object one.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isEditableTarget =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isEditableTarget) return;

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && e.key.toLowerCase() === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }
      if (isCtrlOrCmd && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }

      if ((e.key === "Delete" || e.key === "Backspace") && selectedObjectId) {
        e.preventDefault();
        removeObject(selectedObjectId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, removeObject, undo, redo]);

  const handleStagePointerDown = (
    e: KonvaEventObject<MouseEvent | TouchEvent>,
  ) => {
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target === imageNodeRef.current;
    if (clickedOnEmpty) {
      selectObject(null);
    }
  };

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
          <Stage
            width={size}
            height={size}
            onMouseDown={handleStagePointerDown}
            onTouchStart={handleStagePointerDown}
          >
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
                if (!asset || object.hidden) return null;
                return (
                  <PlacedObject
                    key={object.id}
                    object={object}
                    asset={asset}
                    size={size}
                    onSelect={() => selectObject(object.id)}
                    registerNode={registerNode}
                  />
                );
              })}
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) =>
                  newBox.width < MIN_TRANSFORM_SIZE ||
                  newBox.height < MIN_TRANSFORM_SIZE
                    ? oldBox
                    : newBox
                }
              />
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}
