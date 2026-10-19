// Generic Placeholder for Team routes
export default function PlaceholderPage({ title, roadmapWeek, description }) {
  return (
    <div className="page-container">
      <div className="placeholder-page">
        <span className="placeholder-badge">{roadmapWeek || "Roadmap Deliverable"}</span>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-desc">
          {description ||
            "This view is connected to the SNARP routing architecture. In future weeks, teammates will integrate live backend APIs and database queries."}
        </p>
        <div className="roadmap-ref-box">
          <strong>📋 SNARP Roadmap Reference:</strong>
          <span>
            Refer to <code>social_Academic_Research_Platform_Roadmap.docx</code> for database schema,
            PostgreSQL BYTEA storage, and authentication contracts.
          </span>
        </div>
      </div>
    </div>
  );
}
