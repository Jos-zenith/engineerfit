import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import EmployerForm from "../components/EmployerForm";

const EmployerPage = () => {
  const { students, jobs } = useApp();
  const [justCreatedJobId, setJustCreatedJobId] = useState(null);

  const latestJob = useMemo(
    () => jobs.find((j) => j.id === justCreatedJobId) || jobs[jobs.length - 1],
    [jobs, justCreatedJobId]
  );

  const topMatches = useMemo(() => {
    if (!latestJob) return [];
    const threshold = 75;
    
    return students
      .map((s) => ({
        student: s,
        fit: latestJob.bestFitPercent || 0,
      }))
      .filter((x) => x.fit >= threshold)
      .slice(0, 5);
  }, [latestJob, students]);

  return (
    <div>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h1>Employer / TPO console</h1>
        <p>
  Designed for Nellai pilot colleges like GCE / PSNCET: see good-fit students for each role,
  then track cohort uplift vs traditional 2–3 LPA placement outcomes over time.
</p>

        <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          College view (demo): average PE Fit, % high-fit offers, and median CTC uplift will be
          shown here once more students complete the EngineerFit test.
        </p>
      </div>

      <EmployerForm onCreated={() => setJustCreatedJobId(null)} />

      {latestJob && (
        <section className="card">
          <div className="section-header">Latest job profile summary</div>
          <p>
            {latestJob.title} at {latestJob.company} – branch {latestJob.branch || "Any"} –
            min {latestJob.minSalaryLPA} LPA – location {latestJob.location}.
          </p>
          <p className="mono-label">
            Current best fit in pool: {latestJob.bestFitPercent ?? "--"}%
          </p>

          <h3 style={{ marginTop: "1rem" }}>Top-fit students</h3>
          {topMatches.length === 0 ? (
            <p>No students cross the 75% fit mark yet for this role.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                    Name / ID
                  </th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                    Branch
                  </th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                    Fit %
                  </th>
                </tr>
              </thead>
              <tbody>
                {topMatches.map(({ student, fit }) => (
                  <tr key={student.id}>
                    <td style={{ padding: "0.4rem 0" }}>{student.name}</td>
                    <td>{student.branch}</td>
                    <td>{fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
};

export default EmployerPage;
