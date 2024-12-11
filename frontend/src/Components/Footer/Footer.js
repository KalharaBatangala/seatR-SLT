import React from "react";
import "./Footer.css";
import logo from "../../Assets/slt_logo.png";
import Insta from "../../Assets/social1.png";
import fb from "../../Assets/social2.png";
import yt from "../../Assets/social3.png";

function Footer() {
  return (
    <footer className="footer_f">
      {" "}
      {/* Use the 'footer' class */}
      <div className="footer-content_f">
        <div className="footer-logo_f">
          {/* Replace this with your logo image */}
          <img src={logo} alt="Company Logo" />
        </div>

        <div className="footer-services_f">
          {/* Section for Service Domain */}
          <div className="service-section_f">
            <h3>TELEPHONE</h3>
            <ul>
              <li>Fiber</li>
              <li>Megaline</li>
              <li>4G/LTE</li>
              
            </ul>
          </div>

          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>BROADBAND</h3>
            <ul>
              <li>New Cannection</li>
              <li>Packages</li>
              <li>Wi-Fi</li>
              <li>Hosting Service</li>
            </ul>
          </div>
          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>PEO TV</h3>
            <ul>
              <li>Packages</li>
              <li>Channels</li>
              <li>Video on Demand</li>
            </ul>
          </div>

          {/* Section for Hosting */}
          <div className="service-section_f">
            <h3>Help</h3>
            <ul>
              <li>FAQ</li>
              <li>Help Support</li>
            </ul>
          </div>
          <div className="service-section_f">
        <ul className="ic">
          <img src={fb}   className="iconS"/> <br></br>
          <img src={Insta}  className="iconS" /><br></br>
          <img src={yt}   className="iconS"/>
        </ul>
      </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
