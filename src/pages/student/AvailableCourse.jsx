import axios from "axios";
import React, { useEffect, useState } from "react";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import Loader from "../dashboard/Layout/Loader";
const AvailableCourse = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [modal, setModal] = useState(true);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    //fetch available course for student
    axios
      .get(
        `https://collegemanagement-x1m6.onrender.com/college/availablecourse/${localStorage.getItem(
          "student"
        )}`
      )
      .then((res) => {
        setEnrolled(res.data.data);
        setModal(false);
      })
      .catch((Err) => console.log(Err));
  }, [flag]);

  function enrollCourse(id) {
    setModal(true);
    //api for enroll course
    axios
      .post(`https://collegemanagement-x1m6.onrender.com/college/enroll`, {
        subjectId: id,
        studentId: localStorage.getItem("student"),
      })
      .then((res) => {
        setFlag(!flag);
      })
      .catch((err) => console.log(err.response));
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />
          <div className="container mt-5">
            <div className="mb-4">
              <h2 className="mb-3">Available Course</h2>

              {modal ? (
                <Loader />
              ) : (
                <>
                  <div className="row">
                    {/* used .map() to view all the available course in card  */}
                    {enrolled.map((subject, index) => (
                      <div className="col-md-4 mb-3" key={subject.faculty.id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{subject.name}</h5>
                            <p className="card-text">
                              Faculty: {subject.faculty.name.toUpperCase()}
                            </p>
                            <button
                              onClick={() => enrollCourse(subject.subjectId)}
                              className="btn btn-primary"
                            >
                              Enroll
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableCourse;
