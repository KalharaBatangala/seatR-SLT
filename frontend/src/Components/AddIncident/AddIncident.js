import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import './Addinciden.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddIncident() {
  const history = useNavigate();
  const location = useLocation(); // Get passed state
  const complain = location.state?.complain; // Extract complain details if available

  const [inputs, setInputs] = useState({
    complain_id:complain?.comp_id,
    customer_name:complain?.cus_name,
    customer_email:complain?.cus_email,
    customer_mobile:complain?.cus_mobile_no,
    customer_address:complain?.cus_address,
    issue_type:complain?.issue_type,
    issue_date:complain?.date,
    description:complain?.description,
    employee_name:"",
    employee_email:"",
  });
  const [employees, setEmployees] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token'); // Retrieve token
      try {
        const response = await axios.get("http://localhost:5000/employees", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        });
        setEmployees(response.data.employees); // Assuming the response format
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployee = employees.find(emp => emp.emp_name === e.target.value);
    if (selectedEmployee) {
      setInputs(prev => ({
        ...prev,
        employee_name: selectedEmployee.emp_name,
        employee_email: selectedEmployee.emp_email,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/incidentDetails'));
  };

  const sendRequest = async () => {
    const token = localStorage.getItem('token');
    try {
      // Submit incident details
      const res = await axios.post("http://localhost:5000/users_A", {
        complain_id: String(inputs.complain_id),
        customer_name: String(inputs.customer_name),
        customer_email: String(inputs.customer_email),
        customer_mobile: String(inputs.customer_mobile),
        customer_address: String(inputs.customer_address),
        issue_type: String(inputs.issue_type),
        issue_date: String(inputs.issue_date),
        description: String(inputs.description),
        employee_name: String(inputs.employee_name),
        employee_email: String(inputs.employee_email),
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request header
        },
      });
  
      // Send email notification
      await axios.post("http://localhost:5000/send-email", {
        employeeEmail: inputs.employee_email,
        employeeName: inputs.employee_name,
        complainDetails: `
          Complain ID: ${inputs.complain_id}
          Customer Name: ${inputs.customer_name}
          Issue Type: ${inputs.issue_type}
          Description: ${inputs.description}
        `,
      });
  
      return res.data;
    } catch (error) {
      console.error("Error during request:", error);
    }
  };
  

  return (
    <div>
      <Header />
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <h1>Add Incident</h1>

          <div>
          <form onSubmit={handleSubmit} className="form-table_add">
            <div className="table-row_add">
              <label htmlFor="complainID">Complain ID</label>
              <input type="text" onChange={handleChange} name="complain_id" value={inputs.complain_id} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="customer_name">Customer Name</label>
              <input type="text" onChange={handleChange} name="customer_name" value={inputs.customer_name} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="customer_email">Customer Email</label>
              <input type="text" onChange={handleChange} name="customer_email" value={inputs.customer_email} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="customer_mobile">Customer Mobile</label>
              <input type="text" onChange={handleChange} name="customer_mobile" value={inputs.customer_mobile} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="customer_address">Customer Address</label>
              <input type="text" onChange={handleChange} name="customer_address" value={inputs.customer_address} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="issue_type">Issue Type</label>
              <input type="text" onChange={handleChange} name="issue_type" value={inputs.issue_type} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="issue_date">Issue Date</label>
              <input type="text" onChange={handleChange} name="issue_date" value={inputs.issue_date} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="description">Description</label>
              <input type="text" onChange={handleChange} name="description" value={inputs.description} required readOnly/>
            </div>

            <div className="table-row_add">
              <label htmlFor="employee_name">Employee Name</label>
              <select onChange={handleEmployeeSelect} required>
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.emp_id} value={emp.emp_name}>
                    {emp.emp_name} - {emp.emp_role}
                  </option>
                ))}
              </select>
            </div>

            <div className="table-row_add">
              <label htmlFor="employee_email">Employee Email</label>
              <input type="text" readOnly value={inputs.employee_email} />
            </div>

            <div className="submit-row_add">
              <button type="submit">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default AddIncident;
