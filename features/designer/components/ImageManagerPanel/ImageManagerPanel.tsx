"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function ImageManagerPanel() {
  // Temporary: just proves the upload flow works end to end.
  // Task 26 replaces this with the real assets store.
  const [lastFileName, setLastFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2 p-3">
      <ImageUploader
        accept={ACCEPTED_TYPES}
        onFilesSelected={(files) => setLastFileName(files[0]?.name ?? null)}
      />
      {lastFileName && (
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          Selected: {lastFileName}
        </p>
      )}
    </div>
  );
}
