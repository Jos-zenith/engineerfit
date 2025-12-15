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
          examples that turns your aptitude, RIASEC interests and behaviour into
          a clear “Engineer Persona Card” for TN engineers
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/assessment")}
        >
          Start your EngineerFit Test
        </button>
      </section>

      <section className="grid-2">
        <div className="card">
          <div className="section-header">Why this for South TN</div>
          <p>
            Many South Indian engineering graduates get pushed into random 2–3 LPA
            roles even when their true strengths fit better dev, testing, design,
            operations or sales tracks
          </p>
          <p>
            Traditional campus placements ignore psychometrics; EngineerFit brings
            structured aptitude, RIASEC and behaviour data into the picture
          </p>
        </div>
        <div className="card">
          <div className="section-header">What your Persona Card shows</div>
          <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
            <li>Branch fit (CSE / ECE / Mech / Civil style roles)</li>
            <li>Role fit: dev, testing, design, operations or sales</li>
            <li>Relocation comfort within Tamil Nadu / South India</li>
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
          <p>
            Kick off with a free EngineerFit test – no login needed for this MVP
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/assessment")}
          >
            Take the free fit test
          </button>
        </div>
      </section>

      {/* Static Persona Card + Job Alert mocks */}
      <section
        className="grid-2"
        style={{ marginTop: "2rem", marginBottom: "2rem", alignItems: "stretch" }}
      >
        <div className="card">
          <div className="section-header">Demo · Engineer Persona Card</div>
          <h2>EBV · Analytical Problem Solver</h2>
          <p style={{ fontSize: "0.9rem" }}>
            Branch fit: <strong>CSE / QA / Support Engineering</strong>
            <br />
            Role fit: <strong>Testing · Support · Product Ops</strong>
            <br />
            Relocation comfort:{" "}
            <strong>Nellai / tuty · Coimbatore · Chennai (OK)</strong>
          </p>
          <p className="mono-label" style={{ marginTop: "0.75rem" }}>
            3–5 year earning band: Aim for ≥3–5 LPA roles
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
            Built from a 30–40 minute adaptive EngineerFit test (aptitude + RIASEC +
            behaviour) designed for South Indian engineering students
          </p>
        </div>

        <div className="card" style={{ position: "relative" }}>
          <div className="section-header">Demo · High-signal Job Alert</div>
          <p className="mono-label">WhatsApp / App Alert · Fit ≥ 75%</p>
          <h3 style={{ marginBottom: 4 }}>New match: QA Engineer – Nellai SEZ</h3>
          <p style={{ fontSize: "0.9rem", marginTop: 0 }}>
            Company: Tier‑3 IT Services, Tirunelveli
            <br />
            CTC: <strong>3.6 LPA</strong> · Branch: <strong>CSE / ECE</strong>
          </p>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              background: "rgba(31,59,77,0.06)",
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
            }}
          >
            Career Fit Snapshot:
            <br />
            • Top role cluster: <strong>Testing / QA</strong>
            <br />
            • Strength vs demand: strong detail‑focus, needs upskilling in automation.
          </p>
          <div
            className="chip"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "#1F3B4D",
              color: "#fff",
              border: "none",
              fontWeight: 600,
            }}
          >
            PE Fit 82%
          </div>
        </div>
      </section>

      {/* Innovation section */}
      <section style={{ marginTop: "2rem" }} className="card">
        <div className="section-header">Innovation · How EngineerFit is different</div>
        <h2>Adaptive Psychometrics + Career Fit Snapshot</h2>
        <ul style={{ paddingLeft: "1.1rem" }}>
          <li>
            <strong>Adaptive psychometric testing:</strong> instead of a long static
            test, question difficulty adjusts to your answers, keeping the assessment
            shorter and more engaging while still precise
          </li>
          <li>
            <strong>Career Fit Snapshot (single page):</strong> no 20‑page reports.
            Students and recruiters get a one‑page view with:
            <br />
            – Top 3 role clusters aligned to psychometric fit (e.g., dev, testing, design).
            <br />
            – Strength vs role‑demand gap (ready‑now vs needs‑upskilling).
          </li>
          <li>
            <strong>Efficiency gains:</strong> recruiters can shortlist in seconds,
            students stop mass‑applying, and placement success improves per
            application instead of just chasing volume
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;

