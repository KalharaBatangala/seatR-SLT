import React from "react";
import "./UserHome.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import viewC from "../../Assets/make1.png";
import fd from "../../Assets/fdImage.png";
import list from "../../Assets/list.png";

//

function UserHome() {
  return (
    <div>
      <Header />
      <main className="main-content">
        <h1 className="topic1">Welcome to the Incident Management System</h1>
        <div className="button-container">
          <button
            className="home-button"
            onClick={() => (window.location.href = "/addComplain")}
          >
            <div>
              <img src={viewC} alt="Make Complain" className="button-icons" />
            </div>
            <div className="button-texts">Make Complain</div>
          </button>

          <button
            className="home-button"
            onClick={() => (window.location.href = "/viewComplain")}
          >
            <img src={list} alt="View Complain" className="button-icons" />
            <div className="button-texts">View Complain</div>
          </button>

          <button
            className="home-button"
            onClick={() => (window.location.href = "/feedback")}
          >
            <img src={fd} alt="Send Feedback" className="button-icons" />
            <div className="button-texts">Send Feedback</div>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserHome;
