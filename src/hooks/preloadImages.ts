import { useEffect } from "react";

export default function preloadImages(imgSrcs: (string | undefined)[] = []) {
    useEffect(() => {
    const urls = Array.from(new Set((imgSrcs || []).filter(Boolean) as string[]));
    if (urls.length === 0) return;

    const imgs: HTMLImageElement[] = urls.map((u) => {
      const img = new Image();
      img.src = u;
      return img;
    });

    return () => {
      imgs.forEach((i) => {
        try {
          i.src = "";
        } catch {}
      });
    };
  }, [JSON.stringify(imgSrcs)]);
};
