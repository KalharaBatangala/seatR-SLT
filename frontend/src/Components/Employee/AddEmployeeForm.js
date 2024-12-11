import React, { useState } from 'react'
import './Employee.css'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './AddEmployee.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddEmployeeForm() {

  const history = useNavigate();
  const [inputs,setInputs] = useState({
    emp_name:"",
    emp_email:"",
    emp_contact_no:"",
    emp_role:""
  });

  const handleChange =(e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => {
        alert('Employee has been added successfully!');
        history('/employees'); // Navigate to Employees page after alert
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to add employee. Please try again.');
      });
  }

  const sendRequest = async() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    await axios.post("http://localhost:5000/employees",{
      emp_name:String(inputs.emp_name),
      emp_email:String(inputs.emp_email),
      emp_contact_no:Number(inputs.emp_contact_no),
      emp_role:String(inputs.emp_role)
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the request headers
      },
    }).then(res => res.data);
  }

  return (
    <div className='page-container'>
      <Header/>
      <div className="app-container">
      <Sidebar/>
      <div className="content">
        <div>
        <form className='form-container-add-employee' onSubmit={handleSubmit}>
        <div className='AddEmploeeopic'>Employee Form</div>
          <div>
            <table>
            <thead>
              <tr >
                <th className="trEmployee">Field</th>
                <th className="trEmployee">Input</th>
              </tr>
            </thead>
              <tbody>
              <tr>
                <td>
                  <label htmlFor='emp_name'>Employee Name : </label>
                </td>
                <td><input type="text" name="emp_name" onChange={handleChange} value={inputs.emp_name} required/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='emp_email'>Employee Email : </label>
                </td>
                <td><input type="email" name="emp_email" onChange={handleChange} value={inputs.emp_email} required/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='emp_contact_no'>Employee Contact number : </label>
                </td>
                <td><input type="text" name="emp_contact_no" onChange={handleChange} value={inputs.emp_contact_no} required/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='emp_role'>Employee Role : </label>
                </td>
                <td><input type="text" name="emp_role" onChange={handleChange} value={inputs.emp_role} required/></td>
              </tr>
              </tbody>

            </table>
          </div>
        <div className='button-container'>
        <button className = 'button-submit-employee' type="submit">Submit</button>
        </div>
      </form>
        </div>
        </div>
      </div>
      <div className='footer'>
            <Footer/>
      </div>
    </div>
  )
}

export default AddEmployeeForm
