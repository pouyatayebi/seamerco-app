import Link from "next/link";
import { ArrowLeft} from "lucide-react";

import { VideoLightbox } from "@/components/shared/video-lightbox";

type VideoGuideCardProps =
  | {
      variant: "text";
      titleTop: string;
      titleBottom: string;
      description: string;
      buttonTextTop: string;
      buttonTextBottom: string;
      href: string;
    }
  | {
      variant: "media";
      title: string;
      image: string;
      video: string;
    };

export function VideoGuideCard(props: VideoGuideCardProps) {
  if (props.variant === "media") {
    return (
      <VideoLightbox
        image={props.image}
        video={props.video}
        alt={props.title}
        playSize="sm"
        className="h-full min-h-[18rem] rounded-2xl shadow-md"
      />
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl bg-card p-6 text-right shadow-md ring-1 ring-border">
      <p className="text-sm font-medium text-primary">{props.titleTop}</p>

      <h3 className="mt-1 text-xl font-semibold leading-10 text-foreground">
        {props.titleBottom}
      </h3>

      <p className="mt-4 text-justify text-sm leading-8 text-content-muted">
        {props.description}
      </p>

      <Link
        href={props.href}
        className="mt-auto inline-flex w-fit items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-right text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        <span className="flex flex-col">
          <span>{props.buttonTextTop}</span>
          <span className="text-white/70">{props.buttonTextBottom}</span>
        </span>

        <ArrowLeft className="size-4" />
      </Link>
    </div>
  );
}