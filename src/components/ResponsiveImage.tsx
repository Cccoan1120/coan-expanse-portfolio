import type { ImageAsset } from "../types/content";

interface ResponsiveImageProps extends ImageAsset {
  className?: string;
  eager?: boolean;
  fallback?: "webp" | "jpg";
}

export function ResponsiveImage({
  base,
  alt,
  sizes = "(max-width: 768px) 92vw, 50vw",
  portrait = false,
  className = "",
  eager = false,
  fallback = "webp",
  fullWidth = 1400,
  mobileBase,
}: ResponsiveImageProps) {
  return (
    <picture className={className} data-portrait={portrait ? "true" : "false"}>
      {mobileBase ? (
        <>
          <source
            media="(max-width: 48rem)"
            type="image/avif"
            srcSet={`${mobileBase}-sm.avif 640w, ${mobileBase}.avif 900w`}
            sizes="100vw"
          />
          <source
            media="(max-width: 48rem)"
            type="image/webp"
            srcSet={`${mobileBase}-sm.webp 640w, ${mobileBase}.webp 900w`}
            sizes="100vw"
          />
        </>
      ) : null}
      <source
        type="image/avif"
        srcSet={`${base}-sm.avif 640w, ${base}.avif ${fullWidth}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-sm.webp 640w, ${base}.webp ${fullWidth}w`}
        sizes={sizes}
      />
      <img
        src={`${base}.${fallback}`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
      />
    </picture>
  );
}
