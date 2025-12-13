import React from "react";

const ProgressBar = ({ step, total }) => {
  const pct = (step / total) * 100;
  return (
    <div aria-label={`Step ${step} of ${total}`}>
      <div
        className="mono-label"
        style={{ marginBottom: "0.3rem" }}
      >{`Step ${step} / ${total}`}</div>
      <div className="progress-track" role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
