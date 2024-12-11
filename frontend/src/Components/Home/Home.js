import React, { useEffect } from "react";
import Header from "../Header/Header";
import image2 from "../../Assets/Employees.png";
import f1 from "../../Assets/f1.png";
import f2 from "../../Assets/f2.png";
import f3 from "../../Assets/f3.png";
import f4 from "../../Assets/f44.png";
import man from "../../Assets/problemMan2.png";
import Worrkman from "../../Assets/HomeImage.png";
import Search from "../../Assets/search1.png";
import sup from "../../Assets/sup33.jpg";
import bill1 from "../../Assets/bill1.png";
import ss from "../../Assets/ss.jpg";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <Header />

      <div className="video-section fade-in" style={animationStyle}>
        <section className="content-container_h">
          <div className="overlay"></div>
          <div className="text-container_h">
            <div>
              <h1 className="main-title_h">Incident Management System</h1>
            </div>
            <div className="description_h">
              <p>
                Our Incident Management System offers a streamlined platform to
                efficiently report, track, and resolve incidents in real-time.
                Designed with a focus on security, collaboration, and ease of
                use, our system ensures rapid response, clear communication, and
                thorough documentation to minimize downtime and improve
                operational resilience.
              </p>
            </div>
            <div className="description_h2">
              <img className="search" alt="imgd" src={Search} />
              <span>Contact us & solve your problems...</span>
            </div>
          </div>
          <div className="btnRegister">
            <Link to="/login">
              <button className="startbtn">
                <span>Register Now </span>
              </button>
            </Link>
          </div>
        </section>
      </div>

      <div className="ser fade-in" style={animationStyle}>
        <div>
          <h1 className="hedService">Services</h1>
        </div>
        <div className="ss">
          <div>
            <img src={man} alt="poto" className="manImge" />
            <div className="what">
              <p>
                <h2> What services do we provide?</h2>
              </p>
            </div>
            <div className="description_h3">
              <p>
                SLT-MOBITEL is the National Information and Communications
                Technology (ICT) Solutions Provider has served the Nation’s need
                for connectivity, operating on fixed, mobile, and other
                operational segments by offering a range of ICT solutions...
              </p>
            </div>
          </div>
          <img src={Worrkman} alt="poto" className="workMan" />
        </div>

        {/* Image Gallery */}
        <section className="image-gallery_h fade-in" style={animationStyle}>
          <div className="gallery-image_h">
            <img src={image2} alt="Employees" className="gallery-image" />
            <div className="serv">
              <h2 className="serviceType">Network Issue</h2>
            </div>
          </div>
          <div className="gallery-image_h">
            <img src={bill1} alt="Billing Issue" className="gallery-image" />
            <div className="serv">
              <h2 className="serviceType">Billing Issue</h2>
            </div>
          </div>
          <div className="gallery-image_h">
            <img src={sup} alt="Technical Support" className="gallery-image" />
            <div className="serv">
              <h2 className="serviceType">Technical Support</h2>
            </div>
          </div>
          <div className="gallery-image_h">
            <img src={ss} alt="Service Outage" className="gallery-image" />
            <div className="serv">
              <h2 className="serviceType">Service Outage</h2>
            </div>
          </div>
        </section>

        <div className="cs fade-in" style={animationStyle}>
          <button className="see">
            <spam>Other services</spam>
          </button>
        </div>
      </div>

      <div className="serCont fade-in" style={animationStyle}>
        {/* About Us Section */}
        <section className="about">
          <div className="topic">
            {" "}
            <h1 className="hedService">About Us</h1>
          </div>
          <div className="pAbout">
            <div className="pAbout">
              <p className="p1">
                With a history of over 163 years, SLT-MOBITEL is the National
                Information and Communications Technology (ICT) Solutions
                Provider has served the Nation’s need for connectivity,
                operating on fixed, mobile, and other operational segments by
                offering a range of ICT solutions that cater to consumers with a
                digital lifestyle including Voice, Fiber, ADSL, 4G LTE, Cloud
                Services, Enterprise Solutions, wholesale, international ICT
                solutions, IPTV services, eChannelling and a host of Value-added
                services. In its journey of transformation into a digital
                service provider, SLT-MOBITEL has expanded beyond ICT services
                to deliver products and services that utilize its core
                strengths.
              </p>
            </div>
            <div className="pAbout">
              {" "}
              <p>
                SLT-MOBITEL is positioned as a key global player by connecting
                Sri Lanka to the world through international submarine cable
                systems. The group also offers Submarine cable maintenance,
                Human Resources solutions, Directory services, Digital marketing
                solutions, and software solutions etc. Having established strong
                local heritage, SLT-MOBITEL Mobile was the first network to
                launch the Super-3.5G HSPA network in South Asia in 2007 and
                subsequently trialed HSPA+, MIMO (Multiple Input Multiple
                Output) in 2009, another first in the region. SLT-MOBITEL Mobile
                went on to demonstrate 4G-LTE technology also for the first time
                in South Asia in 2011 and trialed 4.5G LTE-Advanced Pro
                Technology with CA (Carrier Aggregation) of three bands.
              </p>
            </div>
            <div className="pAbout">
              {" "}
              <p>
                In 2017, SLT-MOBITEL Mobile deployed the first Sub-1G Mobile
                Broadband Network in Sri Lanka based on a 900MHz spectrum to
                provide superior coverage to rural areas in the country.
                Continuing the leadership, in 2018, SLT-MOBITEL Mobile launched
                the First Commercial 4.5G/4G+ Mobile Network in South Asia and
                successfully trialed 5G by connecting a commercial Mobile
                smartphone to its 5G network. Further, SLT-MOBITEL Mobile has
                been recognized by Ookla®, the global leader in fixed broadband
                and mobile network testing applications, data, and analysis as
                the Fastest Mobile Network consecutively for 2019, 2020, and
                2021. A growing customer base stands testament to SLT-MOBITEL’s
                strong focus laid on National vision, Customer centricity,
                emulating its credo of ‘The Connection.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Feedback Section */}
      <section className="feedback fade-in" style={animationStyle}>
        <div className="topic">
          <h1 className="hedService">Feedback</h1>
        </div>
        <p className="fdDescription">
          We value your input! Our Feedback page is designed to gather your
          thoughts, suggestions, and experiences with our services...
        </p>
        <div className="image-container">
          <div className="fdImage">
            <img src={f1} className="ab1" alt="Feedback 1" />
          </div>
          <div className="fdImage">
            <img src={f2} className="ab2" alt="Feedback 2" />
          </div>
          <div className="fdImage">
            <img src={f3} className="ab3" alt="Feedback 3" />
          </div>
          <div className="fdImage">
            <img src={f4} className="ab3" alt="Feedback 4" />
          </div>
        </div>

        <div className="fdBtn">
          <button className="seec">
            <spam>See More</spam>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Animation style for fade-in
const animationStyle = {
  opacity: 0,
  transform: "translateY(20px)",
  transition: "opacity 1s ease-out, transform 1s ease-out",
};

export default Home;
