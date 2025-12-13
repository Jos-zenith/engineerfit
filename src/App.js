import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./theme.css";
import { AppProvider } from "./context/AppContext";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import AssessmentPage from "./pages/AssessmentPage";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import EmployerPage from "./pages/EmployerPage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/employer" element={<EmployerPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
