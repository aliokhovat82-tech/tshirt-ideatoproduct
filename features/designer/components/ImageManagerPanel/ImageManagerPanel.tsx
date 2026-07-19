"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";
import { validateImageFile } from "@/features/designer/utils/validateImageFile";
import { useAssetsStore } from "@/stores/assetsStore";
import { AssetLibrary } from "@/features/designer/components/AssetLibrary/AssetLibrary";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function ImageManagerPanel() {
  const addAsset = useAssetsStore((s) => s.addAsset);
  const [rejections, setRejections] = useState<string[]>([]);

  const handleFiles = async (files: File[]) => {
    const outcomes = await Promise.all(
      files.map(async (file) => ({
        file,
        result: await validateImageFile(file),
      })),
    );

    const newRejections: string[] = [];
    for (const { file, result } of outcomes) {
      if (result.valid) {
        addAsset({
          file,
          objectUrl: URL.createObjectURL(file),
          name: file.name,
          width: result.width ?? 0,
          height: result.height ?? 0,
          fileSize: file.size,
        });
      } else {
        newRejections.push(result.reason ?? "Unknown error.");
      }
    }
    setRejections(newRejections);
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <ImageUploader
        accept={ACCEPTED_TYPES}
        multiple
        onFilesSelected={handleFiles}
      />
      <AssetLibrary />
      {rejections.length > 0 && (
        <ul className="flex flex-col gap-1">
          {rejections.map((reason, i) => (
            <li key={i} className="text-xs text-red-600 dark:text-red-400">
              {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
