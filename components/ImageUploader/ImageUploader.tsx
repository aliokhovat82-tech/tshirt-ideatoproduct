"use client";

import { useRef, useState } from "react";

export function ImageUploader({
  accept,
  multiple = false,
  onFilesSelected,
}: {
  accept: string[];
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(Array.from(fileList));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed p-4 text-center text-sm transition-colors ${
        isDragOver
          ? "border-foreground bg-zinc-100 dark:bg-zinc-800"
          : "border-black/[.15] text-zinc-500 dark:border-white/[.2] dark:text-zinc-400"
      }`}
    >
      <span>Click or drag {multiple ? "images" : "an image"} here</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(",")}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
