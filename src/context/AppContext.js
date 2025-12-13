import React, { createContext, useContext, useEffect, useState } from "react";
import { computeFitForAllJobs, createMockStudent } from "../utils/matching";


const ARCHETYPES = [
  {
    id: "arch-chennai-it-service-dev",
    label: "Chennai IT Service – Dev",
    location: "Chennai",
    roleType: "Developer",
    minAptitude: 70,
    interestType: "IR",
  },
  {
    id: "arch-product-bangalore",
    label: "Chennai / Bangalore Product Engineer",
    location: "Chennai / Bangalore",
    roleType: "Product Engineer",
    minAptitude: 80,
    interestType: "IE",
  },
  {
    id: "arch-coimbatore-mfg",
    label: "Coimbatore Manufacturing Engineer",
    location: "Coimbatore",
    roleType: "Manufacturing / Plant",
    minAptitude: 65,
    interestType: "RC",
  },
  {
    id: "arch-nellai-site",
    label: "Nellai / CBE Civil Site Engineer",
    location: "Nellai / Coimbatore",
    roleType: "Site Engineer",
    minAptitude: 60,
    interestType: "RS",
  },
  {
    id: "arch-sales-eng",
    label: "South TN Sales Engineer",
    location: "Tier-2 TN cities",
    roleType: "Sales / Field",
    minAptitude: 60,
    interestType: "ES",
  },
];


function computeArchetypeFitForStudent(student) {
  if (!student) return [];

  const { aptitudeScore = 0, interestType = "" } = student;

  return ARCHETYPES.map((arch) => {
    let score = 0;

    if (aptitudeScore >= arch.minAptitude) score += 0.5;
    else if (aptitudeScore >= arch.minAptitude - 10) score += 0.3;

    if (interestType && arch.interestType && interestType[0] === arch.interestType[0]) {
      score += 0.5;
    } else if (interestType.includes(arch.interestType[0])) {
      score += 0.3;
    }

    return { ...arch, fitPercent: Math.round(score * 100) };
  })
    .sort((a, b) => b.fitPercent - a.fitPercent)
    .slice(0, 3);
}

const STORAGE_KEY = "engineerfit-state-v1";
const AppContext = createContext(null);


export function AppProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [notifications, setNotifications] = useState({
    newMatchesCount: 0,
    lastJobIdNotified: null,
  });

  
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setStudents(parsed.students || []);
        setJobs(parsed.jobs || []);
        setActiveStudentId(parsed.activeStudentId || null);
        setNotifications(parsed.notifications || { newMatchesCount: 0 });
      } catch {
    
      }
    } else {
      const mock = createMockStudent();
      setStudents([mock]);
      setActiveStudentId(mock.id);
    }
  }, []);

  useEffect(() => {
    const state = {
      students,
      jobs,
      activeStudentId,
      notifications,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [students, jobs, activeStudentId, notifications]);

  const activeStudent = students.find((s) => s.id === activeStudentId) || null;

  const recomputeMatches = (newJobs = jobs, newStudents = students) => {
    const { jobsWithFit, studentsWithFlags, newMatchesCount } =
      computeFitForAllJobs(newStudents, newJobs);

    setJobs(jobsWithFit);
    setStudents(studentsWithFlags);
    setNotifications((prev) => ({
      ...prev,
      newMatchesCount: prev.newMatchesCount + newMatchesCount,
    }));
  };

  const saveAssessmentForActiveStudent = (assessment) => {
    if (!activeStudent) return;
    const updated = students.map((s) =>
      s.id === activeStudent.id ? { ...s, ...assessment } : s
    );
    recomputeMatches(jobs, updated);
  };

  const addJob = (jobInput) => {
    const id = `job-${Date.now()}`;
    const job = { id, ...jobInput };
    const newJobs = [...jobs, job];
    recomputeMatches(newJobs, students);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => ({ ...prev, newMatchesCount: 0 }));
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        newMatches: 0,
      }))
    );
  };

  const value = {
    students,
    jobs,
    activeStudent,
    setActiveStudentId,
    saveAssessmentForActiveStudent,
    addJob,
    notifications,
    markNotificationsRead,
    archetypeTop3: computeArchetypeFitForStudent(activeStudent),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
