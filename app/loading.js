// Shown in the page area while a page's content is still on its way
// (mostly once pages load from a CMS). The header and footer stay in place.
export default function Loading() {
  return (
    <div className="page-loading" role="status">
      <span className="page-loading__bar" aria-hidden="true" />
      <p>Loading</p>
    </div>
  );
}
