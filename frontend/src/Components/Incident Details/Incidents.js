import React, { useEffect, useState } from "react";
import axios from "axios";
import "./incidents.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { FaEdit, FaTrash } from "react-icons/fa";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";

const URL = "http://localhost:5000/users_A";

// Function to fetch incidents from the API
const fetchHandler = async () => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  return await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${token}`, // Add token to the request headers
    },
  }).then((res) => res.data);
};

function Incidents() {
  const [incidents, setIncidents] = useState([]); // Default as empty array

  // Fetch incidents when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        console.log(data); // Check the structure of the response
        setIncidents(data.incidents); // Set the correct array
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    await axios.delete(`http://localhost:5000/users_A/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the request headers
      },
    }).then(() => {
      // Update the incidents state to remove the deleted incident
      setIncidents(incidents.filter((incident) => incident._id !== id));
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await fetchHandler();
      const filteredIncidents = filterIncidents(data.incidents, searchQuery);
      updateIncidentsState(filteredIncidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };
  
  // Helper function to filter incidents based on the search query
  const filterIncidents = (incidents, query) => {
    return incidents.filter((incident) => isMatch(incident, query));
  };
  
  // Helper function to check if any field of the incident matches the search query
  const isMatch = (incident, query) => {
    return Object.values(incident).some((field) =>
      field.toString().toLowerCase().includes(query.toLowerCase())
    );
  };
  
  // Helper function to update state after filtering
  const updateIncidentsState = (filteredIncidents) => {
    setIncidents(filteredIncidents);
    setNoResults(filteredIncidents.length === 0);
  };
  

  return (
    <div>
      <Header />
      <div className="incident-container">
        <Sidebar />
        <div className="content">
        <div className="IncidentTopic">Incident Details Page</div>
        {/*<Link to="/AddIncident">
          <button className="add-Incident-button">Add Incident</button>
        </Link>*/}

        <div>
        <SearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
        </div>
        {noResults ? (
          <div>
            <p>No Incidents Found</p>
          </div>
        ) : (
          <div className="incident-table-wrapper">
            <table className="incident-table">
              <thead>
                <tr>
                  {/*<th>ID</th>*/}
                  <th>Complain ID</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Customer Mobile</th>
                  <th>Customer Address</th>
                  <th>Issue Type</th>
                  <th>Issue Date</th>
                  <th>Description</th>
                  <th>Assigned to Employee</th>
                  <th>Employee Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident._id}>
                    {/*<td>{incident._id}</td>*/}
                    <td>{incident.complain_id}</td>
                    <td>{incident.customer_name}</td>
                    <td>{incident.customer_email}</td>
                    <td>{incident.customer_mobile}</td>
                    <td>{incident.customer_address}</td>
                    <td>{incident.issue_type}</td>
                    <td>{incident.issue_date}</td>
                    <td>{incident.description}</td>
                    <td>{incident.employee_name}</td>
                    <td>{incident.employee_email}</td>
                    <td>
                      <Link to={`/incidentDetails/${incident._id}`}>
                        <FaEdit className="update-employee-icon  " />
                      </Link>
                      <FaTrash
                        onClick={() => deleteHandler(incident._id)}
                        className="delete-employee-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Incidents;
