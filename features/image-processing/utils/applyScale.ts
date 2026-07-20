// factor 1 = no change, 2 = double size, 0.5 = half size.
export function applyScale(
  canvas: HTMLCanvasElement,
  operation: { factor: number },
): HTMLCanvasElement {
  const newWidth = Math.max(1, Math.round(canvas.width * operation.factor));
  const newHeight = Math.max(1, Math.round(canvas.height * operation.factor));

  const result = document.createElement("canvas");
  result.width = newWidth;
  result.height = newHeight;
  const ctx = result.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
  return result;
}
