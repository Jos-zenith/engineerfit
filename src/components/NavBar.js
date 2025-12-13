import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const NavBar = () => {
  const { notifications } = useApp();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button
          onClick={() => navigate("/")}
          className="nav-brand btn-ghost"
          style={{ border: "none", padding: 0, background: "transparent" }}
        >
          EngineerFit
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "nav-link-active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/assessment"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "nav-link-active" : "")
            }
          >
            Assessment
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "nav-link-active" : "")
            }
          >
            Dashboard
            {notifications.newMatchesCount > 0 && (
              <span aria-label={`${notifications.newMatchesCount} new matches`}>
                <span className="badge">{notifications.newMatchesCount}</span>
              </span>
            )}
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "nav-link-active" : "")
            }
          >
            Jobs
          </NavLink>
          <NavLink
            to="/employer"
            className={({ isActive }) =>
              "nav-link " + (isActive ? "nav-link-active" : "")
            }
          >
            Employer / TPO
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
