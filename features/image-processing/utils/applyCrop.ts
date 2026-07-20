// x, y, width, height are normalized (0-1) relative to the input canvas,
// not absolute pixels — keeps crop rects resolution-independent so they
// work the same regardless of which pipeline stage produced the input.
export function applyCrop(
  canvas: HTMLCanvasElement,
  operation: { x: number; y: number; width: number; height: number },
): HTMLCanvasElement {
  const sourceX = Math.round(operation.x * canvas.width);
  const sourceY = Math.round(operation.y * canvas.height);
  const sourceWidth = Math.round(operation.width * canvas.width);
  const sourceHeight = Math.round(operation.height * canvas.height);

  const result = document.createElement("canvas");
  result.width = sourceWidth;
  result.height = sourceHeight;
  const ctx = result.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  ctx.drawImage(
    canvas,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    sourceWidth,
    sourceHeight,
  );
  return result;
}
