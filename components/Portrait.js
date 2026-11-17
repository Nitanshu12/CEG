import Image from "next/image";
import { getImage } from "@/lib/images";
import { initials } from "@/lib/format";

// A person's photo, or their initials while no photo has been added.
export default function Portrait({ person, sizes = "(min-width: 60rem) 25vw, 50vw" }) {
  const photo = getImage(person.photo);

  return (
    <figure className="portrait">
      {photo ? (
        <Image src={photo.src} alt={`Portrait of ${person.name}`} fill sizes={sizes} style={{ objectFit: "cover" }} />
      ) : (
        <span className="portrait__initials" aria-hidden="true">
          {initials(person.name)}
        </span>
      )}
    </figure>
  );
}
