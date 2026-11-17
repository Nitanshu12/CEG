import Link from "next/link";

// The band at the top of every inner page.
// trail: [{ label, href }] for the breadcrumb (Home is added automatically)
// children: optional extra content under the lead (a meta line, buttons)
export default function PageHeader({ title, lead, trail = [], children }) {
  return (
    <div className="page-header">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            {trail.map((step) => (
              <li key={step.href}>
                <Link href={step.href}>{step.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
