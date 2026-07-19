"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";
import { validateImageFile } from "@/features/designer/utils/validateImageFile";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

type FileResult =
  | { name: string; valid: true; width: number; height: number }
  | { name: string; valid: false; reason: string };

export function ImageManagerPanel() {
  // Temporary: proves upload + validation work end to end.
  // Task 26 replaces this with the real assets store.
  const [results, setResults] = useState<FileResult[]>([]);

  const handleFiles = async (files: File[]) => {
    const validated = await Promise.all(
      files.map(async (file) => {
        const result = await validateImageFile(file);
        return result.valid
          ? {
              name: file.name,
              valid: true as const,
              width: result.width ?? 0,
              height: result.height ?? 0,
            }
          : {
              name: file.name,
              valid: false as const,
              reason: result.reason ?? "Unknown error.",
            };
      }),
    );
    setResults(validated);
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <ImageUploader
        accept={ACCEPTED_TYPES}
        multiple
        onFilesSelected={handleFiles}
      />
      {results.length > 0 && (
        <ul className="flex flex-col gap-1">
          {results.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              className={`text-xs ${
                r.valid
                  ? "text-zinc-500 dark:text-zinc-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {r.valid ? `${r.name} (${r.width}x${r.height})` : r.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
