import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";
import { PiStudentDuotone } from "react-icons/pi";
function Sidebar() {
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("faculty")) setFlag(true);
    else setFlag(false);
  }, []);
  return (
    <div
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
      style={{
        justifyContent: "center",
        backgroundColor: "#c0ffff",
      }}
    >
      <div
        className="d-flex flex-column align-items-center   min-vh-100"
        style={{
          color: "#AAAAAA",
          paddingTop: "25px",
        }}
      >
        <div
          style={{
            height: "550px",
            padding: "0 10px",
          }}
        >
          <img
            className="logo"
            alt="logo"
            style={{
              maxHeight: "35px",
              maxWidth: "35px",
            }}
            src="https://cdn5.vectorstock.com/i/1000x1000/45/29/house-gold-leaf-logo-vector-14984529.jpg"
          />
          {flag ? (
            <>
              <div>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item">
                    <a
                      href="/faculty/studentlist"
                      style={{ color: "#2289FF" }}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        {" "}
                        <FaUserCircle />
                      </i>
                      <span className="ms-1 d-none d-sm-inline">
                        Student List
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/faculty/mycourse"
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        <FaBookOpenReader />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">My Course</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/faculty/list"
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        <FaBookOpenReader />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Faculty List
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item">
                    <a
                      href="/student/dashboard"
                      style={{ color: "#2289FF" }}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        {" "}
                        <FaUserCircle />
                      </i>
                      <span className="ms-1 d-none d-sm-inline">Profile</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/student/enrolledcourse"
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        <FaBookOpenReader />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Enrolled Course
                      </span>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/student/availablecourse"
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        <FaBookOpen />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Available Course
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/student/viewstudent"
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-house">
                        <PiStudentDuotone />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        View Student
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
