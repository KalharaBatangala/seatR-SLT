import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AddComplainForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddComplain() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    cus_name: "",
    cus_email: "",
    cus_address: "",
    cus_mobile_no: "",
    issue_type: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => {
        alert("Your Complain is Successfully maked!");
        history("/viewComplain"); // Navigate to View Complain page after alert
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to make the Complain. Please try again.");
      });
  };

  const sendRequest = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    await axios
      .post("http://localhost:5000/complains", {
        cus_name: String(inputs.cus_name),
        cus_email: String(inputs.cus_email),
        cus_address: String(inputs.cus_address),
        cus_mobile_no: Number(inputs.cus_mobile_no),
        issue_type: String(inputs.issue_type),
        description: String(inputs.description),
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Header />
      <div className="bodyd">
        <form className="form-container-add-complain " onSubmit={handleSubmit}>
          <div className="make-complain">Make Your Complain Here</div>

          <table>
            <thead>
              <tr >
                <th className="trComplain">Field</th>
                <th className="trComplain">Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="cus_name">Customer Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="cus_name"
                    name="cus_name"
                    onChange={handleChange}
                    value={inputs.cus_name}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cus_email">Customer Email:</label>
                </td>
                <td>
                  <input
                    type="email"
                    id="cus_email"
                    name="cus_email"
                    onChange={handleChange}
                    value={inputs.cus_email}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cus_address">Customer Address:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="cus_address"
                    name="cus_address"
                    required
                    onChange={handleChange}
                    value={inputs.cus_address}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cus_mobile_no">Customer Mobile No:</label>
                </td>
                <td>
                  <input
                    type="tel"
                    id="cus_mobile_no"
                    name="cus_mobile_no"
                    required
                    onChange={handleChange}
                    value={inputs.cus_mobile_no}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="issue_type">Issue Type:</label>
                </td>
                <td>
                  <select
                    id="issue_type"
                    name="issue_type"
                    required
                    onChange={handleChange}
                    value={inputs.issue_type}
                  >
                    <option value="">Select Issue Type</option>
                    <option value="Billing Problem">Billing Problem</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Network Issue">Network Issue</option>
                    <option value="Service Outage">Service Outage</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="description">Description:</label>
                </td>
                <td>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    required
                    onChange={handleChange}
                    value={inputs.description}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="complain-submit-button" type="submit">
                    Submit Complain
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddComplain;
