// The full, closed set of operations per docs/project-architecture.md §3.3
// and docs/tech-stack-selection.md. Each is implemented in its own task
// (30-34) and wired into applyImageOperations.ts's switch as it lands.
export type ImageOperation =
  | { type: "crop"; x: number; y: number; width: number; height: number }
  | { type: "brightness"; value: number }
  | { type: "contrast"; value: number }
  | { type: "rotate"; degrees: number }
  | { type: "scale"; factor: number }
  | { type: "backgroundRemoval" };
