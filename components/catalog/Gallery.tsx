"use client";

import { useState } from "react";

export function Gallery({ photos, videos }: { photos: number; videos: number }) {
  const [active, setActive] = useState(0);
  const thumbs = Array.from({ length: 5 });
  return (
    <div className="gal">
      <div className="main">
        <div className="sh" />
        <span className="gcount">
          ▦ {photos} фото{videos > 0 ? ` · ${videos} видео` : ""}
        </span>
      </div>
      <div className="thumbs">
        {thumbs.map((_, i) => (
          <button
            key={i}
            className={`t${i === active ? " act" : ""}${i === 4 && videos > 0 ? " vid" : ""}`}
            aria-label={`Фото ${i + 1}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
