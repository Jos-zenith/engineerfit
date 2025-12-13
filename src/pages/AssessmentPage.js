import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";
import { deriveTargetSalaryBand, derivePersonaLabel } from "../utils/matching";

const AssessmentPage = () => {
  const { activeStudent, saveAssessmentForActiveStudent } = useApp();
  const [step, setStep] = useState(1);

  const aptitudeQs = [
    { id: "apt1", text: "If 2x = 10, what is x?", options: [2, 3, 5, 10], correct: 5 },
    { id: "apt2", text: "Which is largest?", options: ["0.5", "1/4", "0.75", "0.2"], correct: "0.75" },
    { id: "apt3", text: "Sequence: 2, 4, 8, 16, ?", options: [18, 24, 32, 20], correct: 32 },
    { id: "apt4", text: "10% of 450 is", options: [35, 40, 45, 60], correct: 45 },
    { id: "apt5", text: "If A=3, B=9, then B/A is", options: [1, 2, 3, 4], correct: 3 },
  ];

  const [aptAnswers, setAptAnswers] = useState({});
  const [interestScores, setInterestScores] = useState({});
  const [personalityScores, setPersonalityScores] = useState({});

  const interestItems = [
    { id: "R1", code: "R", text: "I enjoy fixing lab equipment or hardware issues." },
    { id: "I1", code: "I", text: "I like solving tricky logical or coding problems." },
    { id: "A1", code: "A", text: "I enjoy presenting ideas visually or creatively." },
    { id: "S1", code: "S", text: "I like mentoring juniors or helping classmates." },
    { id: "E1", code: "E", text: "I enjoy convincing people or leading a small team." },
    { id: "C1", code: "C", text: "I like organising files, marksheets, or data cleanly." },
    { id: "R2", code: "R", text: "I prefer hands-on lab / workshop over long theory." },
    { id: "I2", code: "I", text: "I enjoy debugging and tracing why a system fails." },
    { id: "S2", code: "S", text: "Friends come to me when they feel stuck or tense." },
    { id: "E2", code: "E", text: "I am excited by campus events where I can coordinate." },
    { id: "C2", code: "C", text: "I like working with Excel sheets or structured tables." },
    { id: "A2", code: "A", text: "I enjoy sketching diagrams or UI layouts." },
  ];

  const personalityItems = [
    { id: "P1", dim: "conscientiousness", text: "I prepare for tests and interviews well in advance." },
    { id: "P2", dim: "teamwork", text: "I enjoy doing projects as a team instead of solo." },
    { id: "P3", dim: "openness", text: "I am curious to try new tools, languages, or domains." },
    { id: "P4", dim: "resilience", text: "I bounce back quickly after a bad exam or interview." },
    { id: "P5", dim: "communication", text: "I can explain a concept clearly to non-technical people." },
    { id: "P6", dim: "conscientiousness", text: "I keep my commitments to friends and faculty." },
    { id: "P7", dim: "teamwork", text: "I resolve conflicts calmly when working in a group." },
    { id: "P8", dim: "openness", text: "I am fine moving to a nearby city if role fit is good." },
    { id: "P9", dim: "resilience", text: "I keep applying even after multiple rejections." },
    { id: "P10", dim: "communication", text: "I am comfortable speaking in English in a group." },
  ];

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const computeAptitudeScore = () => {
    let correct = 0;
    aptitudeQs.forEach((q) => {
      if (aptAnswers[q.id] === String(q.correct)) correct++;
    });
    return Math.round((correct / aptitudeQs.length) * 100);
  };

  const computeRIASEC = () => {
    const agg = {};
    interestItems.forEach((item) => {
      const v = Number(interestScores[item.id] || 0);
      agg[item.code] = (agg[item.code] || 0) + v;
    });
    const entries = Object.entries(agg);
    if (!entries.length) return "";
    entries.sort((a, b) => b[1] - a[1]);
    return entries
      .slice(0, 2)
      .map(([code]) => code)
      .join("");
  };

  const computePersonality = () => {
    const sums = {};
    const counts = {};
    personalityItems.forEach((item) => {
      const v = Number(personalityScores[item.id] || 0);
      if (!v) return;
      sums[item.dim] = (sums[item.dim] || 0) + v;
      counts[item.dim] = (counts[item.dim] || 0) + 1;
    });
    const result = {};
    Object.keys(sums).forEach((dim) => {
      const avg = sums[dim] / (counts[dim] || 1);
      result[dim] = avg / 5; // 1–5 -> 0–1
    });
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const aptitudeScore = computeAptitudeScore();
    const interestType = computeRIASEC();
    const personality = computePersonality();
    const personaLabel = derivePersonaLabel(aptitudeScore, personality);
    const targetSalaryBand = deriveTargetSalaryBand(aptitudeScore);
    saveAssessmentForActiveStudent({
      aptitudeScore,
      interestType,
      personality,
      personaLabel,
      targetSalaryBand,
    });
    setStep(3);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h1>EngineerFit Assessment</h1>
        <p style={{ maxWidth: 560 }}>
  A 3-part EngineerFit assessment tuned for South Indian engineering students:
  aptitude, RIASEC interests and localized behaviour. Use Tab / Shift+Tab to
  move across questions
</p>
        <ProgressBar step={step} total={3} />
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <section className="card">
            <div className="section-header">Step 1 · Aptitude mini-test</div>
            {aptitudeQs.map((q, idx) => (
              <fieldset key={q.id} style={{ marginBottom: "0.9rem" }}>
                <legend>
                  Q{idx + 1}. {q.text}
                </legend>
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    style={{ display: "block", fontWeight: "normal" }}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={String(opt)}
                      checked={aptAnswers[q.id] === String(opt)}
                      onChange={(e) =>
                        setAptAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                    />{" "}
                    {opt}
                  </label>
                ))}
              </fieldset>
            ))}
          </section>
        )}

        {step === 2 && (
          <section className="card">
            <div className="section-header">Step 2 · Interests (RIASEC)</div>
            <p style={{ fontSize: "0.9rem" }}>
              Rate each statement from 1 (strongly disagree) to 5 (strongly agree).
            </p>
            {interestItems.map((item) => (
              <div key={item.id} style={{ marginBottom: "0.7rem" }}>
                <label>
                  {item.text}
                  <select
                    value={interestScores[item.id] || ""}
                    onChange={(e) =>
                      setInterestScores((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select 1–5</option>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </section>
        )}

        {step === 3 && (
          <section className="card">
            <div className="section-header">Step 3 · Personality</div>
            <p style={{ fontSize: "0.9rem" }}>
              Again, rate 1–5. This shapes traits like conscientiousness, teamwork, and resilience.
            </p>
            {personalityItems.map((item) => (
              <div key={item.id} style={{ marginBottom: "0.7rem" }}>
                <label>
                  {item.text}
                  <select
                    value={personalityScores[item.id] || ""}
                    onChange={(e) =>
                      setPersonalityScores((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select 1–5</option>
                    {[1, 2, 3, 4, 5].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </section>
        )}

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 3 && (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="btn btn-primary">
              Submit &amp; Build Persona
            </button>
          )}
        </div>
      </form>

      {activeStudent && activeStudent.personaLabel && (
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Latest persona: <strong>{activeStudent.personaLabel}</strong>
        </p>
      )}
    </div>
  );
};

export default AssessmentPage;
