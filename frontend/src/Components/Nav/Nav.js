import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; 

const Nav = () => {
  return (
    <nav className="navbarx">
      <Link to="/" className="linkx">
        <button className="nav-buttonx">Home</button>
      </Link>
      <Link to="/addincident" className="linkx">
        <button className="nav-buttonx">Add Insidents</button>
      </Link>
      <Link to="/incidentDetails" className="linkx">
        <button className="nav-buttonx">Incident Details</button>
      </Link>
      
    </nav>
  );
};

export default Nav;
