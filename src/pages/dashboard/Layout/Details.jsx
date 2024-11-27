import React from "react";
import { useNavigate } from "react-router-dom";

function Details({ data }) {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{ fontSize: "larger", fontWeight: "bolder" }}
    >
      <ul className="nav nav-pills details" id="menu">
        <li className="nav-item">
          <h2 className="text-center">
            {localStorage.getItem("name").toUpperCase()}
          </h2>
        </li>
        <li className="nav-item">
          <span
            className="nav-link align-middle px-0"
            style={{ display: "flex", marginRight: "8%" }}
          >
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Details;
