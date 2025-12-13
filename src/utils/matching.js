const TRAITS = [
  "conscientiousness",
  "teamwork",
  "openness",
  "resilience",
  "communication",
];
export function createMockStudent() {
  return {
    id: "student-1",
    name: "EBV (Sample)",
    branch: "IT",
    aptitudeScore: 72,
    interestType: "IR",
    personality: {
      conscientiousness: 0.7,
      teamwork: 0.8,
      openness: 0.6,
      resilience: 0.65,
      communication: 0.7,
    },
    personaLabel: "Analytical Problem Solver",
    targetSalaryBand: "Aim for ≥3 LPA roles",
    newMatches: 0,
  };
}

export function derivePersonaLabel(aptitudeScore, personality) {
  const c = personality.conscientiousness ?? 0.5;
  const t = personality.teamwork ?? 0.5;
  const o = personality.openness ?? 0.5;
  const r = personality.resilience ?? 0.5;

  if (aptitudeScore >= 75 && c > 0.7 && o > 0.6) {
    return "Analytical Problem Solver";
  }
  if (t > 0.75 && (personality.communication ?? 0.5) > 0.7) {
    return "Collaborative Communicator";
  }
  if (r > 0.7 && c > 0.6) {
    return "Steady Execution Partner";
  }
  return "Emerging Engineer in Progress";
}

export function deriveTargetSalaryBand(aptitudeScore) {
  // Placeholder implementation
  if (aptitudeScore >= 90) return '$100k+';
  if (aptitudeScore >= 75) return '$80k-$100k';
  if (aptitudeScore >= 60) return '$60k-$80k';
  return '<$60k';
}




function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function interestMatch(studentType, jobInterestType) {
  if (!studentType || !jobInterestType) return 0.4;
  if (studentType[0] === jobInterestType[0]) return 1;
  if (studentType.includes(jobInterestType[0])) return 0.7;
  return 0.3;
}

function aptitudeMatch(studentApt, minApt) {
  if (!minApt) return studentApt / 100;
  if (studentApt < minApt) return studentApt / 100 * 0.6;
  return Math.min(1, studentApt / 100 + 0.1);
}



export function computeFitForAllJobs(students, jobs) {
  const wA = 0.3;
  const wI = 0.2;
  const wP = 0.5;
  const threshold = 0.65;

  const jobsWithFit = jobs.map((job) => {
    const desiredVec = TRAITS.map((t) => job.desiredTraits?.[t] ?? 0.5);
    let bestFit = 0;

    students.forEach((s) => {
      const persVec = TRAITS.map((t) => s.personality?.[t] ?? 0.5);
      const pCos = cosineSimilarity(persVec, desiredVec);
      const aMatch = aptitudeMatch(s.aptitudeScore ?? 0, job.minAptitude || 0);
      const iMatch = interestMatch(s.interestType || "", job.interestType || "");
      const fit = wA * aMatch + wI * iMatch + wP * pCos;
      if (fit > bestFit) bestFit = fit;
    });

    return { ...job, bestFitPercent: Math.round(bestFit * 100) };
  });

  let newMatchesCount = 0;

  const studentsWithFlags = students.map((s) => {
    let matchesAbove = 0;
    jobsWithFit.forEach((job) => {
      const desiredVec = TRAITS.map((t) => job.desiredTraits?.[t] ?? 0.5);
      const persVec = TRAITS.map((t) => s.personality?.[t] ?? 0.5);
      const pCos = cosineSimilarity(persVec, desiredVec);
      const aMatch = aptitudeMatch(s.aptitudeScore ?? 0, job.minAptitude || 0);
      const iMatch = interestMatch(s.interestType || "", job.interestType || "");
      const fit = wA * aMatch + wI * iMatch + wP * pCos;
      if (fit >= threshold) matchesAbove++;
    });

    const prev = s.newMatches || 0;
    const delta = Math.max(0, matchesAbove - prev);
    newMatchesCount += delta;

    return {
      ...s,
      personaLabel: s.personaLabel || derivePersonaLabel(s.aptitudeScore ?? 0, s.personality || {}),
      targetSalaryBand:
        s.targetSalaryBand || deriveTargetSalaryBand(s.aptitudeScore ?? 0),
      newMatches: matchesAbove,
    };
  });

  return { jobsWithFit, studentsWithFlags, newMatchesCount };
}
