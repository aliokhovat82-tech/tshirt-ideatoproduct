// Output canvas is resized to fit the full rotated bounding box so
// corners are never clipped, matching how photo-rotation tools behave.
export function applyRotation(
  canvas: HTMLCanvasElement,
  operation: { degrees: number },
): HTMLCanvasElement {
  const radians = (operation.degrees * Math.PI) / 180;
  const { width, height } = canvas;
  const newWidth = Math.round(
    Math.abs(width * Math.cos(radians)) + Math.abs(height * Math.sin(radians)),
  );
  const newHeight = Math.round(
    Math.abs(width * Math.sin(radians)) + Math.abs(height * Math.cos(radians)),
  );

  const result = document.createElement("canvas");
  result.width = newWidth;
  result.height = newHeight;
  const ctx = result.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(canvas, -width / 2, -height / 2);
  return result;
}
