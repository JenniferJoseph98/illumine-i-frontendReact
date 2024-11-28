import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "bootstrap";
import Loader from "../../pages/dashboard/Layout/Loader";
const FacultyLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("student")) navigate("/student/dashboard");
    else if (localStorage.getItem("faculty")) navigate("/faculty/studentlist");
  }, [navigate]);
  const handleSignup = (e) => {
    setIsModalOpen(true);

    e.preventDefault();

    if (!email || !password || !teacherCode) {
      setError("All fields are required!");
      return;
    }
    axios
      .post(`https://backend-college-wvd6.onrender.com/college/faculty/login`, {
        email: email.toLowerCase(),
        password: password,
        code: teacherCode,
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);

        localStorage.setItem("faculty", res.data.faculty_id);
        localStorage.setItem("subject", res.data.subject);
        localStorage.setItem("name", res.data.name);

        navigate("/faculty/studentlist");
      })
      .catch((err) => {
        setIsModalOpen(false);

        setError(err.response.data.error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Faculty Sign Up</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="form-label">
              Password: (First 4 letter of your email and last 4 letter of your
              contact number)
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Teacher Code:(1234)</label>
            <input
              type="text"
              className="form-control"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
              placeholder="Enter your Teacher Code"
            />
          </div>
          <button className="btn btn-primary w-100 mb-4">Login</button>
        </form>
        <p className="mt-3 text-center">
          <a href="/">(Student Login)</a>
        </p>

        {isModalOpen && <Loader />}
      </div>
    </div>
  );
};

export default FacultyLogin;
