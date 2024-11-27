import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    axios
      .post(`https://backend-college-wvd6.onrender.com/college/student/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("student", res.data.student_id);
        localStorage.setItem("name", res.data.name);
        navigate("/student/dashboard");
      })
      .catch((err) => setError(err.response.data.error));
  };
  useEffect(() => {
    if (localStorage.getItem("student")) {
      console.log("enter");

      navigate("/student/dashboard");
    } else if (localStorage.getItem("faculty"))
      navigate("/faculty/studentlist");
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="form-label">
              Password:(First 4 letter of your email and last 4 letter of your
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
          <button type="submit" className="btn btn-primary w-100 mb-4">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          <a href="/login/faculty">(Faculty Login)</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
