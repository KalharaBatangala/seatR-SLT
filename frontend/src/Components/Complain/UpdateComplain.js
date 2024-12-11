import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Complaintable.css';
import './Complain.css'
import './AddComplain.css';

function UpdateComplain() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const comp_id = useParams().comp_id;

    useEffect(() => {
        const fetchHandler = async() => {
          const token = localStorage.getItem('token'); // Retrieve token
            await axios
            .get(`http://localhost:5000/complains/${comp_id}`,{
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the Authorization header
              },
            })
            .then((res) => res.data)
            .then((data) => setInputs(data.complain));
        };
        fetchHandler();
    },[comp_id]);

    const sendRequest = async() => {
      const token = localStorage.getItem('token'); // Retrieve token
        await axios
        .put(`http://localhost:5000/complains/${comp_id}`, {
            cus_name:String(inputs.cus_name),
            cus_email:String(inputs.cus_email),
            cus_address:String(inputs.cus_address),
            cus_mobile_no:Number(inputs.cus_mobile_no),
            issue_type:String(inputs.issue_type),
            description:String(inputs.description),
            status:String(inputs.status)

        },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
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
            alert('Complain has been updated successfully!');
            history('/complains'); // Navigate to Complains page after alert
          })
          .catch((err) => {
            console.error(err);
            alert('Failed to update complain. Please try again.');
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
        <div className='AllComplains_topic'>Update the Complain</div>
          <div>
            <table>
            <thead>
              <tr >
                <th className="trupdateComplain">Field</th>
                <th className="trupdateComplain">Input</th>
              </tr>
            </thead>
           <tbody>
           <tr>
                <td>
                  <label htmlFor='cus_name'>Customer Name : </label>
                </td>
                <td><input type="text" name="cus_name" onChange={handleChange} value={inputs.cus_name} required readOnly/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='cus_email'>Customer Email : </label>
                </td>
                <td><input type="email" name="cus_email" onChange={handleChange} value={inputs.cus_email} required readOnly/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='cus_address'>Customer Address : </label>
                </td>
                <td><input type="text" name="cus_address" onChange={handleChange} value={inputs.cus_address} required readOnly/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='cus_mobile_no'>Customer Contact number : </label>
                </td>
                <td><input type="Number" name="cus_mobile_no" onChange={handleChange} value={inputs.cus_mobile_no} required readOnly/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='issue_type'>Issue Type : </label>
                </td>
                <td><input type="text" name="issue_type" onChange={handleChange} value={inputs.issue_type} required readOnly/></td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='description'>Description : </label>
                </td>
                <td><input type="text" name="description" onChange={handleChange} value={inputs.description} required readOnly/></td>
              </tr>

              <tr>
                <td>
                    <label htmlFor='status'>Status:</label>
                </td>
                <td>
                    <select name="status" onChange={handleChange} value={inputs.status} required>
                    <option value="Open">Open</option>
                        <option value="Work In Progress">Work In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </td>
              </tr>
           </tbody>

            </table>
          </div>
        <div className='button-container'>
        <button className = 'button-submit-complain' type="submit">Update</button>
        <Link to={'/complains'}>
        <button className = 'button-cancel-complain' type="submit">Cancel</button>
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

export default UpdateComplain
