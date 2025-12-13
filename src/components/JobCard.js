import React from "react";

const JobCard = ({ job, showBestRibbon }) => {
  return (
    <article className="card" style={{ position: "relative" }}>
      {showBestRibbon && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: -10,
            background: "#7A2F2F",
            color: "#fff",
            padding: "0.15rem 0.8rem",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderRadius: "999px 0 0 999px",
          }}
        >
          Best match
        </div>
      )}
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ marginBottom: 4 }}>{job.title}</h3>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            {job.company} · {job.location}
          </p>
        </div>
        <div
          className="chip"
          style={{
            background: "#1F3B4D",
            color: "#fff",
            border: "none",
            fontWeight: 600,
          }}
        >
          Fit {job.bestFitPercent ?? "--"}%
        </div>
      </header>
      <p style={{ marginTop: "0.7rem", fontSize: "0.9rem" }}>
        Branch: {job.branch} · Min salary: {job.minSalaryLPA} LPA
      </p>
      <div style={{ marginTop: "0.5rem" }}>
        {job.skills?.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      <button
        className="btn btn-secondary"
        style={{ marginTop: "0.9rem" }}
        type="button"
      >
        Apply (coming soon)
      </button>
    </article>
  );
};

export default JobCard;
