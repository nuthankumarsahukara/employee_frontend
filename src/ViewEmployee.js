import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage]=useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "https://springbootbackend.up.railway.app/employee/AllEmployees"
      );
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete employee
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `https://springbootbackend.up.railway.app/employee/deleteEmployee/${id}`
        );
        setMessage("Employee Deleted Successfully ");
        fetchEmployees();
      } catch (err) {
        console.error(err);
        setMessage("Failed to Delete Employee. Please try again.");
      }
    }
  };

  return (
    <div className="container-fuild mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Employee List</h3>
        {message && <p className="alert alert-info text-center">{message}</p>}
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Photo</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.empId}>
                    <td>{emp.empId}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.gender}</td>
                    <td>
                      {new Date(emp.dob).toLocaleDateString()}
                    </td>
                    <td>{emp.phoneNumber}</td>
                    <td>{emp.emailId}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>₹ {emp.salary}</td>
                    <td>
                      <img
                        src={`https://springbootbackend.up.railway.app/employee/photo/${emp.empId}`}
                        alt="emp"
                        width="150"
                        height="100"
                      />
                    </td>
                    {/* ✅ Actions */}
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/update/${emp.empId}`)}
                        >
                        Edit
                        </button>
                    </td>
                    <td><button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteEmployee(emp.empId)}
                      >
                        Delete
                      </button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployees;
