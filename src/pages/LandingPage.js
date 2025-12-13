
import React from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();
  return (
  <div>
    <section className="card" style={{ marginBottom: "2rem" }}>
      <h1>EngineerFit – South Indian Engineer Persona</h1>
      <p style={{ maxWidth: 540 }}>
        A 30–40 minute online assessment in simple English with Tamil-flavoured
        examples that turns your aptitude, RIASEC interests, and behaviour into
        a clear “Engineer Persona Card” for TN engineers
      </p>
      <button className="btn btn-primary" onClick={() => navigate("/assessment")}>
        Start your EngineerFit Test
      </button>
    </section>

    <section className="grid-2">
      <div className="card">
        <div className="section-header">Why this for South TN</div>
        <p>
          Many South Indian engineering graduates get pushed into random 2–3 LPA
          roles even when their true strengths fit better dev, testing, design,
          operations or sales tracks.
        </p>
        <p>
          Traditional campus placements ignore psychometrics; EngineerFit brings
          structured aptitude, RIASEC, and behaviour data into the picture.
        </p>
      </div>
      <div className="card">
        <div className="section-header">What your Persona Card shows</div>
        <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
          <li>Branch fit (CSE / ECE / Mech / Civil style roles)</li>
          <li>Role fit: dev, testing, design, operations or sales</li>
          <li>Relocation comfort within Tamil Nadu / South India</li>
          <li>3–5 year earning potential band vs 2–3 LPA baseline</li>
        </ul>
      </div>
    </section>

    <section style={{ marginTop: "2rem" }} className="grid-2">
      <div className="card">
        <div className="section-header">Student story (demo)</div>
        <p>
          “From a 2.5 LPA generic support offer to a 3.8 LPA QA engineer role
          in Nellai SEZ after knowing my testing + detail-focus fit.”
        </p>
      </div>
      <div className="card">
        <div className="section-header">Take the free test</div>
        <p>Kick off with a free EngineerFit test – no login needed for this MVP.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/assessment")}>
          Take the free fit test
        </button>
      </div>
    </section>
  </div>
  );
}

export default LandingPage;
