// The opening screen: the CEG wordmark on navy with a thin progress line.
// It shows once when the site is first opened (or refreshed) and fades out
// by itself after about a second. It is pure CSS (see "Opening screen" in
// styles/layout.css), so the page is never blocked if a script fails.
// To remove it, delete <PageLoader /> from app/layout.js.
export default function PageLoader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__mark">CEG</span>
        <span className="loader__name">Centre for Economic Growth</span>
        <span className="loader__bar" />
      </div>
    </div>
  );
}
