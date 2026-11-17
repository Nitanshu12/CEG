import Link from "next/link";

// The CEG wordmark. When the final logo file is ready, replace the two
// spans with an <Image> and keep the link.
export default function Logo({ onInk = false }) {
  return (
    <Link href="/" className={onInk ? "logo logo--on-ink" : "logo"} aria-label="Centre for Economic Growth, home">
      <span className="logo__mark">CEG</span>
      <span className="logo__name">
        Centre for
        <br />
        Economic Growth
      </span>
    </Link>
  );
}
