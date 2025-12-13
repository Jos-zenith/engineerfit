import React from "react";
import { useApp } from "../context/AppContext";
import PersonaCard from "../components/PersonaCard";
import ScoreCards from "../components/ScoreCards";
import PersonalityRadar from "../components/PersonalityRadar";
import JobCard from "../components/JobCard";

const DashboardPage = () => {
  const { activeStudent, jobs, notifications, markNotificationsRead } = useApp();
  const threshold = 65;

  const matched = jobs
    .filter((j) => (j.bestFitPercent || 0) >= threshold)
    .sort((a, b) => (b.bestFitPercent || 0) - (a.bestFitPercent || 0));

  return (
    <div>
      <div
        className="card"
        style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h1>Student Dashboard</h1>
          <p>
            Welcome, {activeStudent?.name || "Engineer"} – track your EngineerFit persona and
            high-fit
          </p>
        </div>
        <div>
          <div className="section-header">Alerts</div>
          <p style={{ fontSize: "0.9rem" }}>
  {notifications.newMatchesCount > 0
    ? `${notifications.newMatchesCount} new high-signal matches (Fit ≥ 75%) in your preferred TN hubs.`
    : "No new high-signal matches (Fit ≥ 75%) today for your branch and location filters."}
</p>
<div style={{ marginTop: "0.75rem" }}>
  <div className="section-header">Your outcomes (demo)</div>
  <p style={{ fontSize: "0.9rem" }}>
    High-fit opportunities seen: <strong>{matched.length}</strong> · Applied (demo):{" "}
    <strong>{Math.min(matched.length, 2)}</strong> · Interviews/offers (demo):{" "}
    <strong>{matched.length > 0 ? 1 : 0}</strong>
  </p>
  <p style={{ fontSize: "0.9rem" }}>
    District baseline CTC: <strong>2–3 LPA</strong> · Your projected path from EngineerFit persona:
    <strong> {activeStudent?.targetSalaryBand || "Aim for ≥3 LPA roles"}</strong>
  </p>
</div>

          {notifications.newMatchesCount > 0 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={markNotificationsRead}
            >
              Mark as read
            </button>
          )}
        </div>
      </div>

      <PersonaCard student={activeStudent} />
      <div className="grid-2" style={{ marginTop: "1.5rem" }}>
        <ScoreCards student={activeStudent} />
        <div className="card">
          <div className="section-header">Personality radar</div>
          <PersonalityRadar traits={activeStudent?.personality || {}} />
        </div>
      </div>

      <section style={{ marginTop: "2rem" }}>
        <div className="section-header">Matching jobs</div>
        {matched.length === 0 ? (
          <p>No jobs above 65% fit yet. Ask your TPO/employer to add roles in the Employer tab.</p>
        ) : (
          <div className="grid-2">
            {matched.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                showBestRibbon={idx === 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
