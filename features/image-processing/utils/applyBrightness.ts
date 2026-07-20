// value ranges -1 (black) to 1 (double brightness), 0 = no change —
// maps onto the CSS brightness() filter's 0%-200% range.
export function applyBrightness(
  canvas: HTMLCanvasElement,
  operation: { value: number },
): HTMLCanvasElement {
  const result = document.createElement("canvas");
  result.width = canvas.width;
  result.height = canvas.height;
  const ctx = result.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  const percent = (1 + operation.value) * 100;
  ctx.filter = `brightness(${percent}%)`;
  ctx.drawImage(canvas, 0, 0);
  return result;
}
