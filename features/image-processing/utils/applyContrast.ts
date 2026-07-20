// value ranges -1 (flat gray) to 1 (double contrast), 0 = no change —
// maps onto the CSS contrast() filter's 0%-200% range.
export function applyContrast(
  canvas: HTMLCanvasElement,
  operation: { value: number },
): HTMLCanvasElement {
  const result = document.createElement("canvas");
  result.width = canvas.width;
  result.height = canvas.height;
  const ctx = result.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  const percent = (1 + operation.value) * 100;
  ctx.filter = `contrast(${percent}%)`;
  ctx.drawImage(canvas, 0, 0);
  return result;
}
