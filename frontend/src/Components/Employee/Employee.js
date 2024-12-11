import React from "react";
import "./Employeetable.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing edit and delete icons
import PropTypes from "prop-types"; // Import PropTypes for validation

function Employee(props) {
  const { emp_id, emp_name, emp_email, emp_contact_no, emp_role } =
    props.employee;

  const history = useNavigate();

  const deleteHandler = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const confirmDelete = window.confirm(
      `Are you sure you want to delete employee ${emp_name}?`
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the delete action
    }

    try {
      await axios.delete(`http://localhost:5000/employees/${emp_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      });
      alert(`Employee ${emp_name} has been deleted successfully.`); // Alert after deletion
      window.location.reload();
      history("/employees"); // Redirect to employees page after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again."); // Alert if there's an error
    }
  };

  return (
    <tr>
      <td>{emp_id}</td>
      <td>{emp_name}</td>
      <td>{emp_email}</td>
      <td>{emp_contact_no}</td>
      <td>{emp_role}</td>
      <td>
        <Link to={`/employees/${emp_id}`}>
          <FaEdit className="update-employee-icon" />
        </Link>

        <FaTrash onClick={deleteHandler} className="delete-employee-icon" />
      </td>
    </tr>
  );
}

// Define PropTypes for the Employee component
Employee.propTypes = {
  employee: PropTypes.shape({
    emp_id: PropTypes.string.isRequired,
    emp_name: PropTypes.string.isRequired,
    emp_email: PropTypes.string.isRequired,
    emp_contact_no: PropTypes.number.isRequired,
    emp_role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Employee;
