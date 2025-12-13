import React from "react";

const PersonaCard = ({ student }) => {
  if (!student) return null;
  return (
    <div className="card">
      <div className="section-header">Your Fit Persona</div>
      <h2>{student.personaLabel || "Complete your test to unlock persona"}</h2>
      <p style={{ maxWidth: 480 }}>
        Tailored for TN engineering talent, this persona blends your
        aptitude, interests, and behavior to suggest practical, better-fit entry roles.
      </p>
      <p className="mono-label" style={{ marginTop: "1rem" }}>
        Target band: {student.targetSalaryBand || "Aim for ≥3 LPA roles"}
      </p>
    </div>
  );
};

export default PersonaCard;
