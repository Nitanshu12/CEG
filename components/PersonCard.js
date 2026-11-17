import Link from "next/link";
import Portrait from "./Portrait";

export default function PersonCard({ person }) {
  return (
    <Link className="person-card" href={`/people/${person.slug}`}>
      <Portrait person={person} />
      <div>
        <h3 className="person-card__name">{person.name}</h3>
        <p className="person-card__role">
          {person.role}
          {person.lead && (
            <>
              <br />
              Lead, {person.lead}
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
