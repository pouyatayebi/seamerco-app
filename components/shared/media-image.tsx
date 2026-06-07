import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export function MediaImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaImageProps) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-muted">
      <div className="relative aspect-video w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={className ?? "object-cover"}
        />
      </div>

      <figcaption className="border-t bg-card px-4 py-2 text-sm text-muted-foreground ltr">
        {src}
      </figcaption>
    </figure>
  );
}