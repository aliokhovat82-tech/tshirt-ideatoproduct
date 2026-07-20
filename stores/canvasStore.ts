import { create } from "zustand";

export interface CanvasObject {
  id: string;
  assetId: string;
  // Center position and dimensions, normalized 0-1 relative to the stage
  // size — not absolute pixels, so placement stays correct if the stage
  // is resized (matches the pattern used for crop rects in image-processing).
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees
}

interface CanvasState {
  objects: CanvasObject[];
  selectedObjectId: string | null;
  addObject: (object: Omit<CanvasObject, "id">) => string;
  updateObject: (
    id: string,
    changes: Partial<Omit<CanvasObject, "id">>,
  ) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  objects: [],
  selectedObjectId: null,
  addObject: (object) => {
    const id = crypto.randomUUID();
    set((state) => ({ objects: [...state.objects, { ...object, id }] }));
    return id;
  },
  updateObject: (id, changes) =>
    set((state) => ({
      objects: state.objects.map((o) =>
        o.id === id ? { ...o, ...changes } : o,
      ),
    })),
  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((o) => o.id !== id),
      selectedObjectId:
        state.selectedObjectId === id ? null : state.selectedObjectId,
    })),
  selectObject: (id) => set({ selectedObjectId: id }),
}));
