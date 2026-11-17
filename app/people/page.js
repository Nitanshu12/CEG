import PageHeader from "@/components/PageHeader";
import PersonCard from "@/components/PersonCard";
import { getPeopleGroups } from "@/lib/content";

export const metadata = {
  title: "People",
  description: "The advisors, fellows and researchers of the Centre for Economic Growth.",
};

export default async function PeoplePage() {
  const groups = await getPeopleGroups();

  return (
    <>
      <PageHeader title="People" lead="Academicians, technologists, industry leaders, former officials and policymakers on a common platform." />
      <section className="section section--tight">
        <div className="container">
          {groups.map((group) => (
            <section className="people-group" key={group.id}>
              <h2>{group.title}</h2>
              <div className="card-grid card-grid--4">
                {group.members.map((person) => (
                  <PersonCard person={person} key={person.slug} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
