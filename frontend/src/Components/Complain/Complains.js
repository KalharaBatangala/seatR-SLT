import React, { useEffect, useState } from "react";
import axios from "axios";
import Complain from "./Complain";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import "./Complain.css";
import "./Complaintable.css";

const URL = "http://localhost:5000/complains";

 // Function to get token from localStorage
 const getToken = () => {
  return localStorage.getItem("token");
};

const fetchHandler = async () => {
  const token = getToken();
  return await axios.get(URL,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => res.data);
};

function Complains() {
  const [complains, setComplains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const complainsPerPage = 5; // Adjust this value for number of complaints per page
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setComplains(data.complains));
  }, []);

  // Calculate total pages
  

  // Get current complaints based on the current page
  const indexOfLastComplain = currentPage * complainsPerPage;
  const indexOfFirstComplain = indexOfLastComplain - complainsPerPage;
  const currentComplains = complains.slice(
    indexOfFirstComplain,
    indexOfLastComplain
  );
  const totalPages = Math.ceil(complains.length / complainsPerPage);

  //Search Bar


  const handleSearch = async () => {
    try {
      const data = await fetchHandler();
      const filteredComplains = filterComplains(data.complains, searchQuery);
      updateComplainsState(filteredComplains);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };
  
  // Helper function to filter complaints based on the search query
  const filterComplains = (complains, query) => {
    return complains.filter((complain) =>
      Object.values(complain).some((field) =>
        field.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  
  // Helper function to update state after filtering
  const updateComplainsState = (filteredComplains) => {
    setComplains(filteredComplains);
    setNoResults(filteredComplains.length === 0);
  };
  

  return (
    <div className="page-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <div className="AllComplains_topic">All Complains</div>
          <br></br>

          <SearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
          {noResults ? (
            <div>
              <p>No Complains Found</p>
            </div>
          ) : (
            <div>
              {currentComplains.length > 0 ? (
                <table className="complain-table">
                  <thead>
                    <tr>
                      <th>Complain ID</th>
                      <th>Customer Name</th>
                      <th>Customer Email</th>
                      <th>Customer Address</th>
                      <th>Customer Contact No</th>
                      <th>Issue Type</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentComplains.map((complain) => (
                      <Complain key={complain.comp_id} complain={complain} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No complaints available.</p>
              )}
            </div>
          )}
          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Complains;
