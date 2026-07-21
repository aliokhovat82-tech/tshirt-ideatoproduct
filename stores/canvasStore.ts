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
  opacity: number; // 0-1
  hidden: boolean;
  locked: boolean;
}

const MAX_HISTORY = 50; // docs/SPECS.md §7

interface History {
  past: CanvasObject[][];
  future: CanvasObject[][];
}

interface CanvasState {
  objects: CanvasObject[];
  selectedObjectId: string | null;
  history: History;
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
  undo: () => void;
  redo: () => void;
}

// Called from every mutating action with the state *before* that action's
// change, so `past` always holds snapshots to go back to. Making a new
// change after an undo clears `future` — the standard undo/redo rule that
// once you branch off in a new direction, the old "redo" path is gone.
function pushHistory(state: CanvasState): History {
  return {
    past: [...state.history.past, state.objects].slice(-MAX_HISTORY),
    future: [],
  };
}

export const useCanvasStore = create<CanvasState>((set) => ({
  objects: [],
  selectedObjectId: null,
  history: { past: [], future: [] },
  addObject: (object) => {
    const id = crypto.randomUUID();
    set((state) => ({
      objects: [...state.objects, { ...object, id }],
      history: pushHistory(state),
    }));
    return id;
  },
  updateObject: (id, changes) =>
    set((state) => ({
      objects: state.objects.map((o) =>
        o.id === id ? { ...o, ...changes } : o,
      ),
      history: pushHistory(state),
    })),
  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((o) => o.id !== id),
      selectedObjectId:
        state.selectedObjectId === id ? null : state.selectedObjectId,
      history: pushHistory(state),
    })),
  selectObject: (id) => set({ selectedObjectId: id }),
  // Object array order IS stacking order (rendered bottom to top), per
  // docs/project-architecture.md §3.5 — no separate z-index field needed.
  reorderObjects: (fromIndex, toIndex) =>
    set((state) => {
      const objects = [...state.objects];
      const [moved] = objects.splice(fromIndex, 1);
      objects.splice(toIndex, 0, moved);
      return { objects, history: pushHistory(state) };
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
      return { objects, history: pushHistory(state) };
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
      return { objects, history: pushHistory(state) };
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
      return { objects, selectedObjectId, history: pushHistory(state) };
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
      return { objects, selectedObjectId, history: pushHistory(state) };
    }),
  renameObject: (id, name) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, name } : o)),
      history: pushHistory(state),
    })),
  undo: () =>
    set((state) => {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      return {
        objects: previous,
        selectedObjectId: null,
        history: {
          past: state.history.past.slice(0, -1),
          future: [state.objects, ...state.history.future],
        },
      };
    }),
  redo: () =>
    set((state) => {
      if (state.history.future.length === 0) return state;
      const [next, ...restFuture] = state.history.future;
      return {
        objects: next,
        selectedObjectId: null,
        history: {
          past: [...state.history.past, state.objects],
          future: restFuture,
        },
      };
    }),
}));
