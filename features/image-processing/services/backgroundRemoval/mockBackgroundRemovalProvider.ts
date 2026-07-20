import type { BackgroundRemovalProvider } from "./BackgroundRemovalProvider";

// Placeholder only — real provider selection (Remove.bg, Clipdrop, etc.)
// is post-MVP per docs/development-tasks.md addendum C. This proves the
// provider interface works end to end without performing real background
// detection; it returns the image unchanged.
export const mockBackgroundRemovalProvider: BackgroundRemovalProvider = {
  name: "mock",
  async removeBackground(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D canvas context");
    ctx.drawImage(image, 0, 0);
    return canvas;
  },
};
