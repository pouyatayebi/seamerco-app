"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type VideoLightboxProps = {
  image: string;
  video: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  playSize?: "sm" | "md";
};

export function VideoLightbox({
  image,
  video,
  alt,
  className,
  imageClassName,
  playSize = "md",
}: VideoLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block overflow-hidden bg-muted text-right",
          className,
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover transition duration-500 group-hover:scale-105",
            imageClassName,
          )}
        />

        <span
          className={cn(
            "absolute inset-0 m-auto flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition group-hover:scale-110",
            playSize === "md" ? "size-16" : "size-11",
          )}
        >
          <Play className={playSize === "md" ? "size-7" : "size-5"} />
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute left-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="بستن ویدئو"
          >
            <X className="size-5" />
          </button>

          <video
            src={video}
            controls
            autoPlay
            className="max-h-[80vh] w-full max-w-5xl rounded-2xl bg-black"
          />
        </div>
      ) : null}
    </>
  );
}
