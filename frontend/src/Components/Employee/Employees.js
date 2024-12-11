import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Employee from './Employee'
import SearchBar from '../SearchBar/SearchBar'
import './Employee.css'
import './Employeetable.css'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
//import { useReactToPrint } from 'react-to-print';


const URL = "http://localhost:5000/employees";

const fetchHandler = async() => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the request headers
      },
    }).then((res) => res.data);
}

function Employees() {

  const [employees, setEmployees] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setEmployees(data.employees));
  },[])

  /*const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle:"Employees Report",
        onAfterPrint:() => alert("Users Report Successfully Downlaod !")
  })*/


  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await fetchHandler();
      const filteredEmployees = filterEmployees(data.employees, searchQuery);
      updateEmployeeState(filteredEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  
  // Helper function to filter employees based on the search query
  const filterEmployees = (employees, query) => {
    return employees.filter((employee) => isMatch(employee, query));
  };
  
  // Helper function to check if the employee matches the search query
  const isMatch = (employee, query) => {
    return Object.values(employee).some((field) =>
      field.toString().toLowerCase().includes(query.toLowerCase())
    );
  };
  
  // Helper function to update state after filtering
  const updateEmployeeState = (filteredEmployees) => {
    setEmployees(filteredEmployees);
    setNoResults(filteredEmployees.length === 0);
  };
  

  return (
    <div className='page-container'>
      <Header />
      <div className="app-container">
      
    
      <Sidebar/>
        <div className="content">
            <div className="employeeDetailsTopic">Employee Details</div>
            <br></br>
            <div className="add-employee-search-container">
              <Link to='/addEmployee'>
                <button className="add-employee-button">
                  Add Employee
                </button>
              </Link>
              <SearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
            </div>
            {noResults ?(
          <div>
            <p>No Employees Found</p>
          </div>
        ):(
          <div>
          {employees && (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map each employee to a table row */}
                  {employees.map((employee) => (
                    <Employee key={employee.emp_id} employee={employee}/>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        </div>

        
          
          
          {/*<div align='right'>
          <button className='download-employee-button' onClick={handlePrint}>
              Download Report
            </button>
          </div>*/}
        
      </div>
      <div className='footer'>
            <Footer/>
      </div>
    </div>
  )
}

export default Employees
