import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./SignUpandLogin.css";
import axios from "axios";

function SignUp() {
  const history = useNavigate();
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => {
        alert("Register Success");
        history("/login");
      })
      .catch((err) => {
        // Use the error message from the response
        alert(err.response?.data?.message || "Registration failed");
      });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/register", {
        full_name: String(user.full_name),
        email: String(user.email),
        phone: String(user.phone),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Header />
      <div className="signup-login-content-container">
        <form className="signup-login-container" onSubmit={handleSubmit}>
          <div className="LoginTopic">Sign Up</div>
          <table>
          <thead>
              <tr >
                <th className="trLogin">Field</th>
                <th className="trLogin">Input</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Full Name : </td>
              <td>
                <input
                  type="text"
                  name="full_name"
                  placeholder="John Doe"
                  required
                  value={user.full_name}
                  onChange={handleInputsChange}
                />
              </td>
            </tr>
            <tr>
              <td>Email : </td>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  required
                  value={user.email}
                  onChange={handleInputsChange}
                />
              </td>
            </tr>
            <tr>
              <td>Mobile No : </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0777777777"
                  required
                  value={user.phone}
                  onChange={handleInputsChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password : </td>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={user.password}
                  onChange={handleInputsChange}
                />
              </td>
            </tr>
            </tbody>
          </table>
          <button type="submit">Register</button>
          <div className="signup-login-container-login-link">
            <p>
              Already have an Account? <a href="/login">Login</a>
            </p>

           
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
////