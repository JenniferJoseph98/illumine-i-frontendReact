import axios from "axios";
import React, { useEffect, useState } from "react";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import Loader from "../dashboard/Layout/Loader";

const EnrolledCourse = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    //fetch all the enrolled course
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/enrolledcourse/${localStorage.getItem(
          "student"
        )}`
      )
      .then((res) => {
        console.log(res.data.data);

        setEnrolled(res.data.data);
        setModal(false);
      })
      .catch((Err) => console.log(Err));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />
          <div className="container mt-5">
            <h2 className="mb-3">Enrolled Course</h2>

            <div className="mb-4">
              {modal ? (
                <Loader />
              ) : (
                <>
                  <div className="row">
                    {/* used .map() to view all the enrolled course in card  */}

                    {enrolled.map((subject, index) => (
                      <div className="col-md-4 mb-3" key={subject.faculty.id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{subject.name}</h5>
                            <p className="card-text">
                              Faculty: {subject.faculty.name.toUpperCase()}
                            </p>
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

export default EnrolledCourse;
