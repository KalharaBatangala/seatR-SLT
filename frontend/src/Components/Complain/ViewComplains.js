import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ViewComplain.css";

function ViewComplains() {
  // Retrieve the user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");
  console.log("Retrieved email from localStorage:", userEmail);

  const [complains, setComplains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplains = async () => {
      const token = localStorage.getItem('token');
      setError(null);

      if (!userEmail) {
        setError("User email not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/complains/getcomplain?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the request headers
            },
          }
        );
        console.log("Fetched complaints data:", response.data); // Log full response

        // Assuming the backend returns an array directly
        if (Array.isArray(response.data)) {
          if (response.data.length > 0) {
            setComplains(response.data); // Set the array directly
          } else {
            setError("No complaints found for this user."); // Handle case where no complaints exist
          }
        } else {
          setError("Unexpected response structure."); // Handle unexpected response
        }
      } catch (err) {
        console.error(
          "Error fetching complaints:",
          err.response?.data || err.message
        );
        setError("Failed to fetch complaints. Please try again later.");
      }
    };

    fetchComplains();
  }, [userEmail]);

  // Conditional rendering based on error state
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Header />
      <div className="complaints-container">
        <h2>Your Complains</h2>
        {complains.length > 0 ? (
          <div className="complaints-card-grid">
            {complains.map((complain) => (
              <div className="complaint-card" key={complain._id}>
                <h3>Reference ID: {complain.comp_id}</h3>
                <p>
                  <strong>Customer Name:</strong> {complain.cus_name}
                </p>
                <p>
                  <strong>Email:</strong> {complain.cus_email}
                </p>
                <p>
                  <strong>Address:</strong> {complain.cus_address}
                </p>
                <p>
                  <strong>Contact No:</strong> {complain.cus_mobile_no}
                </p>
                <p>
                  <strong>Issue Type:</strong> {complain.issue_type}
                </p>
                <p>
                  <strong>Description:</strong> {complain.description}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(complain.date).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {complain.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No complains available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ViewComplains;
