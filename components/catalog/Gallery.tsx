"use client";

import { useState } from "react";
import { ImageSquare } from "@phosphor-icons/react";

export function Gallery({
  photos,
  videos,
  cover,
}: {
  photos: number;
  videos: number;
  cover?: string | null;
}) {
  const [active, setActive] = useState(0);
  const thumbs = Array.from({ length: 5 });
  return (
    <div className="gal">
      <div className="main">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cover" src={cover} alt="Фото автомобиля" />
        ) : (
          <div className="sh" />
        )}
        <span className="gcount">
          <ImageSquare size={14} /> {photos || (cover ? 1 : 0)} фото
          {videos > 0 ? ` · ${videos} видео` : ""}
        </span>
      </div>
      <div className="thumbs">
        {thumbs.map((_, i) => (
          <button
            key={i}
            className={`t${i === active ? " act" : ""}${i === 4 && videos > 0 ? " vid" : ""}`}
            aria-label={`Фото ${i + 1}`}
            onClick={() => setActive(i)}
          >
            {i === 0 && cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="cover" src={cover} alt="" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
