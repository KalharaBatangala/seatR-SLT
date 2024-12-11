import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AdminDashboard.css";

import { FaBell } from "react-icons/fa";

import chart from "../../Assets/chart.png";
import employee from "../../Assets/employee.png";
import list from "../../Assets/list.png";
import work from "../../Assets/workAsign.png";

function AdminDashboard() {
  const [unviewedCount, setUnviewedCount] = useState(0);

  // Function to get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken(); // Retrieve the token from localStorage
    if (token) {
      axios
        .get("http://localhost:5000/complains/unviewed-count", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        })
        .then((res) => setUnviewedCount(res.data.count))
        .catch((err) => console.error(err));
    } else {
      console.log("No token found, please log in.");
      // Optionally, redirect to login if no token is found
      window.location.href = "/login";
    }
  }, []);

  const markAsViewed = () => {
    const token = getToken(); // Retrieve the token from localStorage
    if (token) {
      axios
        .post(
          "http://localhost:5000/complains/mark-as-viewed",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the header
            },
          }
        )
        .then(() => {
          setUnviewedCount(0); // Reset notification after marking as viewed
          window.location.href = "/complains";
        })
        .catch((err) => console.error(err));
    } else {
      console.log("No token found, please log in.");
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <h1 className="topic">ADMIN DASHBOARD</h1>
        <div className="dashboard-buttons">
          <button
            className="dashboard-button"
            onClick={markAsViewed}
            aria-label={`View Complaints${
              unviewedCount > 0 ? ` (${unviewedCount} new)` : ""
            }`}
          >
            <img src={list} alt="View Complaints" className="button-icon" />
            {unviewedCount > 0 && (
              <div className="notification-badge">
                <FaBell className="bell-icon" /> {unviewedCount}
              </div>
            )}
            <div className="button-text">View Complains</div>
          </button>

          <button
            className="dashboard-button"
            onClick={() => (window.location.href = "/employees")}
            aria-label="Manage Employees"
          >
            <img
              src={employee}
              alt="Manage Employees"
              className="button-icon"
            />
            <div className="button-text">Manage Employees</div>
          </button>

          <button
            className="dashboard-button"
            onClick={() => (window.location.href = "/incidentDetails")}
            aria-label="Work Assigned"
          >
            <img src={work} alt="Work Assigned" className="button-icon" />
            <div className="button-text">Work Assigned</div>
          </button>

          <button
            className="dashboard-button"
            onClick={() => (window.location.href = "/chart")}
            aria-label="Charts"
          >
            <img src={chart} alt="Charts" className="button-icon" />
            <div className="button-text">Charts</div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
