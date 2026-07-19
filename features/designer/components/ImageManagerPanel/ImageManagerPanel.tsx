"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function ImageManagerPanel() {
  // Temporary: just proves the upload flow works end to end.
  // Task 26 replaces this with the real assets store.
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2 p-3">
      <ImageUploader
        accept={ACCEPTED_TYPES}
        multiple
        onFilesSelected={(files) => setSelectedNames(files.map((f) => f.name))}
      />
      {selectedNames.length > 0 && (
        <ul className="flex flex-col gap-0.5">
          {selectedNames.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="truncate text-xs text-zinc-500 dark:text-zinc-400"
            >
              Selected: {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
