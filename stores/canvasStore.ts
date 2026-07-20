import { create } from "zustand";

export interface CanvasObject {
  id: string;
  assetId: string;
  name: string;
  // Center position and dimensions, normalized 0-1 relative to the stage
  // size — not absolute pixels, so placement stays correct if the stage
  // is resized (matches the pattern used for crop rects in image-processing).
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees
  hidden: boolean;
  locked: boolean;
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
  reorderObjects: (fromIndex: number, toIndex: number) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  toggleHidden: (id: string) => void;
  toggleLocked: (id: string) => void;
  renameObject: (id: string, name: string) => void;
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
  // Object array order IS stacking order (rendered bottom to top), per
  // docs/project-architecture.md §3.5 — no separate z-index field needed.
  reorderObjects: (fromIndex, toIndex) =>
    set((state) => {
      const objects = [...state.objects];
      const [moved] = objects.splice(fromIndex, 1);
      objects.splice(toIndex, 0, moved);
      return { objects };
    }),
  bringForward: (id) =>
    set((state) => {
      const index = state.objects.findIndex((o) => o.id === id);
      if (index === -1 || index === state.objects.length - 1) return state;
      const objects = [...state.objects];
      [objects[index], objects[index + 1]] = [
        objects[index + 1],
        objects[index],
      ];
      return { objects };
    }),
  sendBackward: (id) =>
    set((state) => {
      const index = state.objects.findIndex((o) => o.id === id);
      if (index <= 0) return state;
      const objects = [...state.objects];
      [objects[index], objects[index - 1]] = [
        objects[index - 1],
        objects[index],
      ];
      return { objects };
    }),
  toggleHidden: (id) =>
    set((state) => {
      const objects = state.objects.map((o) =>
        o.id === id ? { ...o, hidden: !o.hidden } : o,
      );
      const toggled = objects.find((o) => o.id === id);
      // A hidden object can't stay selected — nothing would show handles for.
      const selectedObjectId =
        toggled?.hidden && state.selectedObjectId === id
          ? null
          : state.selectedObjectId;
      return { objects, selectedObjectId };
    }),
  toggleLocked: (id) =>
    set((state) => {
      const objects = state.objects.map((o) =>
        o.id === id ? { ...o, locked: !o.locked } : o,
      );
      const toggled = objects.find((o) => o.id === id);
      // A locked object can't stay selected — nothing to drag/resize/rotate.
      const selectedObjectId =
        toggled?.locked && state.selectedObjectId === id
          ? null
          : state.selectedObjectId;
      return { objects, selectedObjectId };
    }),
  renameObject: (id, name) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, name } : o)),
    })),
}));
