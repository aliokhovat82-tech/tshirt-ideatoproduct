// Provider-based per docs/tech-stack-selection.md — "the implementation
// should allow changing providers without affecting the rest of the
// application." Real providers (Remove.bg, Clipdrop, etc.) are post-MVP;
// only the mock implementation exists for now.
export interface BackgroundRemovalProvider {
  name: string;
  removeBackground(image: HTMLCanvasElement): Promise<HTMLCanvasElement>;
}
