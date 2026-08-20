"use client";

import { useState } from "react";
import { ImageSquare } from "@phosphor-icons/react";

export function Gallery({ images, videos = 0 }: { images: string[]; videos?: number }) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="gal">
      <div className="main">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cover" src={images[active]} alt="Фото автомобиля" />
        ) : (
          <div className="sh" />
        )}
        <span className="gcount">
          <ImageSquare size={14} /> {images.length} фото{videos > 0 ? ` · ${videos} видео` : ""}
        </span>
      </div>
      {hasImages && images.length > 1 && (
        <div className="thumbs">
          {images.slice(0, 6).map((url, i) => (
            <button
              key={url}
              className={`t${i === active ? " act" : ""}`}
              aria-label={`Фото ${i + 1}`}
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cover" src={url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
