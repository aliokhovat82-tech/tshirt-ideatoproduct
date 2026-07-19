"use client";

import { useEffect, useState } from "react";

export function useHtmlImage(src: string | undefined) {
  const [state, setState] = useState<{
    src: string;
    image: HTMLImageElement;
  } | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (!cancelled) setState({ src, image: img });
    };
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [src]);

  return state && state.src === src ? state.image : undefined;
}
