import React from "react";

const ScoreCards = ({ student }) => {
  if (!student) return null;
  const p = student.personality || {};
  return (
    <div className="grid-2" style={{ marginTop: "1rem" }}>
      <div className="card">
        <div className="section-header">Aptitude</div>
        <h3>{student.aptitudeScore ?? "--"}%</h3>
        <p>Quick reasoning and quantitative comfort suitable for TN entry-level roles</p>
      </div>
      <div className="card">
        <div className="section-header">Interests (RIASEC)</div>
        <h3>{student.interestType || "Pending"}</h3>
        <p>Dominant style based on what energises you day-to-day in engineering work</p>
      </div>
      <div className="card">
        <div className="section-header">Personality snapshot</div>
        <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
          {Object.entries(p).map(([k, v]) => (
            <li key={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}: {(v * 100).toFixed(0)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScoreCards;
