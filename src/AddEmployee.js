import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployee(){
    const[message,setMessage]=useState('');
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
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "https://springbootbackend.up.railway.app/employee/addEmployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Employee Added successfully!");
      console.log(response.data);
      setEmployee({
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
        })
      setTimeout(()=>{
                navigate('/');
            },2000)
    } catch (error) {
      console.error("Error adding Employee:", error);
      setMessage('Failed to add Employee. Please try again.');
    }
  };
   return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Employee Registration</h3>
        {message && <p className="alert alert-info text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">         
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="emailId"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="col-md-6 mb-3">
              <label className="form-label">DOB</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                placeholder="Enter DOB"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="form-control"
                name="phoneNumber"
                placeholder="Enter mobile Number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter the Address"
                onChange={handleChange}
                required
              />
            </div>


            {/* Department */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                name="department"
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                placeholder="Enter the Designation"
                onChange={handleChange}
                required
              />
            </div>

              <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input
                type="text"
                className="form-control"
                name="salary"
                placeholder="Enter the Salary"
                onChange={handleChange}
                required
              />
            </div>
              <div className="col-md-6 mb-3">
              <label className="form-label">Employee Photo</label>
              <input
                type="file"
                className="form-control"
                name="photo"
                placeholder="upload your Photo"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="col-12 mb-3">
              <label className="form-label me-3">Gender:</label>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-check-input"
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>

            {/* Submit */}
            <div className="col-12 text-center">
              <button className="btn btn-primary px-4">
                Submit
              </button>
              <button type="reset" className="btn btn-secondary ms-3">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
