import type { ImageOperation } from "@/features/image-processing/types/ImageOperation";

function sourceToCanvas(source: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  ctx.drawImage(source, 0, 0);
  return canvas;
}

// Always re-runs every operation starting from the untouched original
// source, never mutates a previous result in place. That's what makes
// edits reversible: changing or removing an earlier operation just
// re-renders cleanly instead of compounding on top of prior output
// (docs/CLAUDE.md rule 1 — non-destructive editing).
export async function applyImageOperations(
  source: HTMLImageElement,
  operations: ImageOperation[],
): Promise<HTMLCanvasElement> {
  const canvas = sourceToCanvas(source);

  for (const operation of operations) {
    switch (operation.type) {
      case "crop":
      case "brightness":
      case "contrast":
      case "rotate":
      case "scale":
      case "backgroundRemoval":
        throw new Error(`Operation not yet implemented: ${operation.type}`);
      default: {
        const exhaustive: never = operation;
        throw new Error(`Unknown operation: ${JSON.stringify(exhaustive)}`);
      }
    }
  }

  return canvas;
}
