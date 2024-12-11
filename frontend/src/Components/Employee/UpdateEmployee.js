import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css'
import './Employee.css'


function UpdateEmployee() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const emp_id = useParams().emp_id;

    useEffect(() => {
        const fetchHandler = async() => {
          const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await axios
            .get(`http://localhost:5000/employees/${emp_id}`,{
              headers: {
                Authorization: `Bearer ${token}`, // Add token to the request headers
              },
            })
            .then((res) => res.data)
            .then((data) => setInputs(data.employee));
        };
        fetchHandler();
    },[emp_id]);

    const sendRequest = async() => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
        await axios
        .put(`http://localhost:5000/employees/${emp_id}`, {
            emp_id:String(inputs.emp_id),
            emp_name:String(inputs.emp_name),
            emp_email:String(inputs.emp_email),
            emp_contact_no:Number(inputs.emp_contact_no),
            emp_role:String(inputs.emp_role)
        },{
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request headers
          },
        })
        .then((res) => res.data);
    };

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
            alert('Employee has been updated successfully!');
            history('/employees'); // Navigate to Employees page after alert
          })
          .catch((err) => {
            console.error(err);
            alert('Failed to update employee. Please try again.');
          });
      }

  return (
    <div className='page-container'>
      <Header/>
      <div className="app-container">
      <Sidebar/>
      <div className="content">
        <div>
        <form className='form-container-add-employee' onSubmit={handleSubmit}>
        <div className='AddEmploeeopic'>Update the Employee Form</div>
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
                  <label htmlFor='emp_id'>Employee ID : </label>
                </td>
                <td><input type="text" name="emp_id" onChange={handleChange} value={inputs.emp_id} required readOnly/></td>
              </tr>

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
        <button className = 'button-submit-employee' type="submit">Update</button>
        <br></br>
        <Link to={'/employees'}>
        <button className = 'button-cancel-employee' type="submit">Cancel</button>
        </Link>
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

export default UpdateEmployee
