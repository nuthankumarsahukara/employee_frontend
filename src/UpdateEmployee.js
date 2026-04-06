import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateEmployee() {
  const { empId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    emailId: "",
    address: "",
    department: "",
    designation: "",
    salary: "",
  });

  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load employee data
  useEffect(() => {
    axios
      .get(`https://springbootbackend.up.railway.app/employee/getByEmpId/${empId}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => console.error(err));
  }, [empId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: name === "gender" ? value.trim() : value,
    });
  };

  // ✅ File change
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(employee).forEach((key) => {
      if (key === "dob" && employee[key]) {
        const formattedDate = employee[key].split("T")[0]; // ✅ FIX DOB
        formData.append("dob", formattedDate);
      } else {
        formData.append(key, employee[key]);
      }
    });

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axios.put(
        `https://springbootbackend.up.railway.app/employee/updateEmployee/${empId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSuccess(true);
      setMessage("Employee updated successfully! ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setMessage("Failed to update Employee ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">

        <h3 className="text-center mb-4">Edit Employee</h3>

        {/* ✅ Message */}
        {message && (
          <p className={`alert ${isSuccess ? "alert-success" : "alert-danger"} text-center`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* First Name */}
            <div className="col-md-6 mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employee.firstName}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div className="col-md-6 mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employee.lastName}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* DOB */}
            <div className="col-md-6 mb-3">
              <label>DOB</label>
              <input
                type="date"
                name="dob"
                value={employee.dob}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-3">
              <label>Phone</label>
              <input
                type="number"
                name="phoneNumber"
                value={employee.phoneNumber}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                name="emailId"
                value={employee.emailId}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="col-md-6 mb-3">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={employee.address}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div className="col-md-6 mb-3">
              <label>Department</label>
              <select
                className="form-select"
                name="department"
                value={employee.department || ""}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {/* Designation */}
            <div className="col-md-6 mb-3">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={employee.designation}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Salary */}
            <div className="col-md-6 mb-3">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Upload New Photo */}
            <div className="col-md-6 mb-3">
              <label>Change Photo</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            {/* Current Image */}
            <div className="col-md-6 mb-3">
              <label>Current Photo</label><br />
              <img
                src={`https://springbootbackend.up.railway.app/employee/photo/${empId}`}
                alt="emp"
                width="80"
                className="rounded"
                onError={(e) => (e.target.src = "/no-image.png")}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label>Gender:</label><br />

              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employee.gender?.toLowerCase() === "male"}
                onChange={handleChange}
              /> Male

              <input
                type="radio"
                name="gender"
                value="Female"
                className="ms-3"
                checked={employee.gender?.toLowerCase() === "female"}
                onChange={handleChange}
              /> Female
            </div>

            {/* Buttons */}
            <div className="col-12 text-center">
              <button className="btn btn-success px-4" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
