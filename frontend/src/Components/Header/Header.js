import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../Assets/slt_logo.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientId = "346768134358-plvhkl1bjjvt7b39uvekv2qg5cno5091.apps.googleusercontent.com";

function Header() {
  const history = useNavigate();

  // State to manage the user information
  const [user, setUser] = useState({
    email: localStorage.getItem("userEmail"),
    image: localStorage.getItem("userImage"),
    name: localStorage.getItem("userName"),
  });

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userName");

    // Clear state and sign out via Google
    setUser({ email: null, image: null, name: null });
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log("Google sign out successful");
      history("/login");
    });
  };

  const handleDashboardClick = () => {
    if (user.email === "admin@gmail.com") {
      history("/adminDashboard");
    } else {
      history("/userHome");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <nav className="nav-links">

     
      <button
  className="link underline"
  onClick={() => window.location.href = '/'}
>
  Home
</button>


{user.email && (
  <button
    className="link underline"
    onClick={(e) => {
      e.preventDefault();
      handleDashboardClick();
    }}
  >
    Dashboard
  </button>
)}

<button
  className="link underline"
  onClick={() => window.location.href = '/about'}
>
  About Us
</button>

        {!user.email ? (
         <button
         className="link underline"
         onClick={() => window.location.href = '/login'}
       >
         Login
       </button>
       
        ) : (
          
          <div className="nav-links">
           
            {user.image && (
              <img
                 
                src={user.image}
                alt="Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  marginTop:"6px"

                 
                }}
              />
            )}
<button className="proName" style={{ background: "none", border: "none", color: "#white", padding: 0,marginTop:"21px" }}>
  {(user.email && user.name) || (user.email || user.name)}
</button>
           <div className="log"> 
            <GoogleLogout
         
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              render={(renderProps) => (
                <button
                className="link underline"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Logout
              </button>
              
              )}
            />
           </div>
          
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
