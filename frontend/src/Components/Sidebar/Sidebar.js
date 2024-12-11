import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

import chart from "../../Assets/chart.png";
import employee from "../../Assets/employee.png";
import list from "../../Assets/list.png";
import work from "../../Assets/workAsign.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>

      <div className="liT">
        <li>
          <Link to="/adminDashboard" className="nav-button">
            Dashboard
          </Link>
        </li>
        </div>


      
          <li>
            <div className="item">
              <Link to="/complains" className="nav-button">
                <img className="icon" src={list} alt="img"></img>
              </Link>
            </div>
          </li>
       

       
          <li>
            <div className="item2">
              <Link to="/employees" className="nav-button">
                <img className="icon" alt="img" src={employee}></img>
              </Link>
            </div>
          </li>
        

        <li>
          <div className="item3">
            <Link to="/incidentDetails" className="nav-button">
              <img className="icon" alt="img" src={work}></img>
            </Link>
          </div>
        </li>

        <li>
          <div className="item4">
            <Link to="/chart" className="nav-button">
              <img className="icon" alt="img" src={chart}></img>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
