// UpdateIncident.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import './UpdateIncident.css'

function UpdateIncident() {
  const [inputs, setInputs] = useState({
    customer_name: "",
    employee_name: "",
    employee_email: "",
    description: "",
  });

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      try {
        const res = await axios.get(`http://localhost:5000/users_A/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request headers
          },
        });
        if (res.data?.user_A) {
          // Check if the response contains data
          setInputs(res.data.user_A);
        } else {
          console.error("Data not found or response is empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    try {
      await axios.put(`http://localhost:5000/users_A/${id}`, {
        customer_name: String(inputs.customer_name),
        employee_name: String(inputs.employee_name),
        employee_email: String(inputs.employee_email),
        description: String(inputs.description),
      },{
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/incidentDetails"); // Redirect to main Incidents page
  };

  return (
    <div>
      <Header />
      <div className="app-container">
        <Sidebar />
        <div className="content">
        
        <div>
        <form onSubmit={handleSubmit} className="update-incident-form">
        <div className="update-incident-topic">Update Incident</div>
          <label htmlFor="customer_name">Customer Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="customer_name"
            value={inputs.customer_name || ""}
            required
            readOnly
          />
          <br />
          <br />
          <label htmlFor="employee_name">Employee Name : </label>
          <input
            type="text"
            onChange={handleChange}
            name="employee_name"
            value={inputs.employee_name || ""}
            required
            readOnly
          />
          <br />
          <br />
          <label htmlFor="employee_email">Employee Email : </label>
          <input
            type="email"
            onChange={handleChange}
            name="employee_email"
            value={inputs.employee_email || ""}
            required
            readOnly
          />
          <br />
          <br />
          <label htmlFor="description">Description : </label>
          <textarea
            type="text"
            onChange={handleChange}
            name="description"
            value={inputs.description || ""}
            required
          />
          <br />
          <br />
          <button type="submit" className="updateIncidentButton">Update</button>
        </form>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateIncident;
