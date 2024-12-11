import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Importing Font Awesome edit icon
import { MdPersonAdd } from "react-icons/md";
import "./Complaintable.css";

function Complain(props) {
  const {
    comp_id,
    cus_name,
    cus_email,
    cus_address,
    cus_mobile_no,
    issue_type,
    description,
    date,
    status,
  } = props.complain;

  // Convert createdAt to a date string without time
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <tr>
      <td>{comp_id}</td>
      <td>{cus_name}</td>
      <td>{cus_email}</td>
      <td>{cus_address}</td>
      <td>{cus_mobile_no}</td>
      <td>{issue_type}</td>
      <td>{description}</td>
      <td>{formattedDate}</td>
      <td>{status}</td>
      <td>
        <Link to={`/complains/${comp_id}`}>
          <FaEdit className="update-complain-icon" />
        </Link>
        <Link to={`/addincident`} state={{ complain: props.complain }}>
          <MdPersonAdd className="update-complain-icon" />
        </Link>
      </td>
    </tr>
  );
}

// Define PropTypes for the Complain component
Complain.propTypes = {
  complain: PropTypes.shape({
    comp_id: PropTypes.string.isRequired,
    cus_name: PropTypes.string.isRequired,
    cus_email: PropTypes.string.isRequired,
    cus_address: PropTypes.string.isRequired,
    cus_mobile_no: PropTypes.number.isRequired,
    issue_type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Complain;
