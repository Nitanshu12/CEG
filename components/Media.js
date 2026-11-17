import Image from "next/image";
import { getImage } from "@/lib/images";

// A picture frame. Give it an image key from content/images.js; when the
// key is empty it shows `label` set in type on navy instead, so a missing
// photo never leaves a grey box.
//
// shape:    "wide" | "banner" | "tall" | "square" (default is 3:2)
// sizes:    how wide the image is shown, for responsive loading
// priority: true only for the first large image on a page
export default function Media({ image, label, shape, sizes = "(min-width: 60rem) 33vw, 100vw", priority = false }) {
  const record = getImage(image);
  const shapeClass = shape ? ` media--${shape}` : "";

  if (!record) {
    return (
      <div className={`media media--type${shapeClass}`} aria-hidden="true">
        <span className="media__label">{label}</span>
      </div>
    );
  }

  return (
    <figure className={`media${shapeClass}`} data-slot={image}>
      <Image src={record.src} alt={record.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: record.position ?? "50% 50%" }} />
    </figure>
  );
}
