"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PlayButtonSize = "sm" | "md" | "lg";

type VideoLightboxProps = {
  image: string;
  video: string;
  alt: string;
  title?: string;
  playSize?: PlayButtonSize;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  dialogClassName?: string;
};

const playButtonClasses: Record<PlayButtonSize, string> = {
  sm: "size-8",
  md: "size-10 md:size-11",
  lg: "size-12 md:size-14",
};

const playIconClasses: Record<PlayButtonSize, string> = {
  sm: "size-3.5",
  md: "size-4.5 md:size-5",
  lg: "size-5 md:size-6",
};

const pulseClasses: Record<PlayButtonSize, string> = {
  sm: "size-9",
  md: "size-12",
  lg: "size-16",
};

export function VideoLightbox({
  image,
  video,
  alt,
  title = "ویدئوی سیمرکو",
  playSize = "md",
  className,
  imageClassName,
  overlayClassName,
  dialogClassName,
}: VideoLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label={title}
        className={cn(
          "group relative block overflow-hidden bg-muted p-0 text-right",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
      >
        <Image
          src={image}
          alt={alt}
          width={900}
          height={700}
          className={cn(
            "h-full w-full object-cover transition duration-500 group-hover:scale-105",
            imageClassName
          )}
        />

        <span
          className={cn(
            "absolute inset-0 bg-secondary/10 transition group-hover:bg-secondary/25",
            overlayClassName
          )}
        />

        <span
          className={cn(
            "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition group-hover:scale-110",
            playButtonClasses[playSize]
          )}
        >
          <span
            className={cn(
              "absolute animate-pulse rounded-full bg-white/25",
              pulseClasses[playSize]
            )}
          />

          <Play
            className={cn(
              "relative mr-0.5 fill-current",
              playIconClasses[playSize]
            )}
          />
        </span>
      </DialogTrigger>

      <DialogContent className={cn("max-w-4xl p-2", dialogClassName)}>
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
        </DialogHeader>

        <video
          src={video}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full rounded-xl bg-black"
        />
      </DialogContent>
    </Dialog>
  );
}