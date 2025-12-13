import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import JobCard from "../components/JobCard";

const JobsPage = () => {
  const { jobs } = useApp();
  const [branchFilter, setBranchFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minFit, setMinFit] = useState(75);

  const filtered = jobs
    .filter((job) => (job.bestFitPercent || 0) >= minFit)
    .filter((job) =>
      branchFilter ? job.branch?.toLowerCase().includes(branchFilter.toLowerCase()) : true
    )
    .filter((job) =>
      locationFilter ? job.location?.toLowerCase().includes(locationFilter.toLowerCase()) : true
    )
    .sort((a, b) => (b.bestFitPercent || 0) - (a.bestFitPercent || 0))
    .slice(0, 10);

  return (
    <div>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h1>Job matches</h1>
        <p>
  Only showing roles with EngineerFit score ≥ {minFit}% so alerts stay focused on
  genuinely high-fit, South Indian opportunities instead of every random listing.
</p>
        <div className="grid-2">
          <label>
            Branch
            <input
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              placeholder="CSE, ECE, Mech..."
            />
          </label>
          <label>
            Location
            <input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Chennai, Bangalore..."
            />
          </label>
          <label>
            Min Fit (%)
            <input
              type="number"
              min="50"
              max="95"
              value={minFit}
              onChange={(e) => setMinFit(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p>No roles meet the current filters. Try lowering the min fit or asking TPOs to add jobs.</p>
      ) : (
        <div className="grid-2">
          {filtered.map((job, idx) => (
            <JobCard key={job.id} job={job} showBestRibbon={idx === 0} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
