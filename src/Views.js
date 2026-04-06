import React, { useState } from "react";
import axios from "axios";

function Views() {
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState(null);
  const [searched, setSearched] = useState(false);
  const handleSearch = async () => {
    if (!search) {
      alert("Enter Employee ID or Email");
      return;
    }
    setSearched(true);
    try {
      let url = "";

      // ✅ Check if input is number (ID) or email
      if (!isNaN(search)) {
        url = `https://springbootbackend.up.railway.app/employee/getByEmpId/${search}`;
      } else {
        url = `https://springbootbackend.up.railway.app/employee/getByEmpEmail/${encodeURIComponent(search)}`;
      }

      const res = await axios.get(url);
      setEmployee(res.data);
      setSearch("");
    } catch (err) {
      console.error(err);
      setEmployee(null);
      setSearch("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">

        <h3 className="text-center mb-4">Search Employee</h3>

        {/* 🔍 Single Input */}
        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Employee ID or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-primary w-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* 📄 Result */}
        {employee && (
          <div className="card p-3 shadow-sm">
            <div className="row">

              {/* Photo */}
              <div className="col-md-3 text-center">
                <img
                  src={`http://localhost:9999/employee/photo/${employee.empId}`}
                  alt="emp"
                  width="120"
                  className="rounded-circle"
                />
              </div>

              {/* Details */}
              <div className="col-md-9">
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p><b>Gender:</b> {employee.gender}</p>
                <p><b>DOB:</b> {new Date(employee.dob).toLocaleDateString()}</p>
                <p><b>Phone:</b> {employee.phoneNumber}</p>
                <p><b>Email:</b> {employee.emailId}</p>
                <p><b>Address:</b> {employee.address}</p>
                <p><b>Department:</b> {employee.department}</p>
                <p><b>Designation:</b> {employee.designation}</p>
                <p><b>Salary:</b> ₹ {employee.salary}</p>
              </div>

            </div>
          </div>
        )}

        {searched && !employee && (
          <p className="text-center text-danger mt-3">
            No Data Found 
          </p>
        )}

      </div>
    </div>
  );
}

export default Views;
