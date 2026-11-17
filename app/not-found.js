import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" lead="The page you were looking for has moved or does not exist." />
      <section className="section section--tight">
        <div className="container actions">
          <Link className="btn btn--primary" href="/">
            Go to the homepage
          </Link>
          <Link className="btn" href="/publications">
            Browse publications
          </Link>
        </div>
      </section>
    </>
  );
}
