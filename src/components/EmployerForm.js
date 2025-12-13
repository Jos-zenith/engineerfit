import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const traitList = [
  "conscientiousness",
  "teamwork",
  "openness",
  "resilience",
  "communication",
];

const EmployerForm = ({ onCreated }) => {
  const { addJob, students } = useApp();
  const [form, setForm] = useState({
    title: "",
    company: "",
    branch: "",
    skills: "",
    location: "Chennai",
    minSalaryLPA: 3,
    minAptitude: 60,
  });
  const [desiredTraits, setDesiredTraits] = useState(
    traitList.reduce((acc, t) => ({ ...acc, [t]: 0.6 }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTrait = (name, value) => {
    setDesiredTraits((prev) => ({ ...prev, [name]: Number(value) / 100 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      title: form.title,
      company: form.company,
      branch: form.branch,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      location: form.location,
      minSalaryLPA: Number(form.minSalaryLPA),
      minAptitude: Number(form.minAptitude),
      desiredTraits,
      interestType: "", 
    };
    addJob(job);
    if (onCreated) onCreated();
  };

  const poolSize = students.length;

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: "1.5rem" }}>
      <div className="section-header">Post a role</div>
      <div className="grid-2">
        <div>
          <label>
            Role title
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="QA Engineer – Entry"
            />
          </label>
          <label>
            Company
            <input
              required
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Tier-3 firm in Nellai"
            />
          </label>
          <label>
            Branch focus
            <input
              name="branch"
              value={form.branch}
              onChange={handleChange}
              placeholder="CSE / ECE / Mech"
            />
          </label>
          <label>
            Skills (comma separated)
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Testing, SQL, Python"
            />
          </label>
        </div>
        <div>
          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter the location"
            />
          </label>
          <label>
            Min salary (LPA)
            <input
              type="number"
              name="minSalaryLPA"
              min="2"
              step="0.25"
              value={form.minSalaryLPA}
              onChange={handleChange}
            />
          </label>
          <label>
            Min aptitude (%)
            <input
              type="number"
              name="minAptitude"
              min="0"
              max="100"
              value={form.minAptitude}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="section-header">Desired behaviour traits</div>
      <p style={{ fontSize: "0.9rem" }}>
        Slide up traits that matter most for this role (0–100). This powers psychometric fit.
      </p>
      <div className="grid-2">
        {traitList.map((t) => (
          <div key={t}>
            <label>
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <input
                type="range"
                min="20"
                max="100"
                value={Math.round((desiredTraits[t] || 0) * 100)}
                onChange={(e) => handleTrait(t, e.target.value)}
              />
            </label>
            <div className="mono-label">
              {Math.round((desiredTraits[t] || 0) * 100)}%
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button className="btn btn-primary" type="submit">
          Create Job Profile
        </button>
        <span className="mono-label">
          Good-fit students in pool: {poolSize}
        </span>
      </div>
    </form>
  );
};

export default EmployerForm;
