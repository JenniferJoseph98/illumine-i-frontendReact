import axios from "axios";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import React, { useEffect, useState } from "react";
import Loader from "../dashboard/Layout/Loader";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
function FacultyList() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(true);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    //Api to fetch all the faculty details
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/viewfaculty/${skip}`
      )
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setModal(false);
      })
      .catch((err) => console.log(err));
  }, [skip]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />

          <div className="container mt-5">
            <div className="mb-4">
              <div className="row">
                <h2>Faculty List</h2>
                {modal ? (
                  <Loader />
                ) : (
                  <>
                    {data.length === 0 ? (
                      <>
                        <h4 style={{ marginTop: "15px" }}>No Faculty found</h4>
                      </>
                    ) : (
                      <>
                        <table
                          className="table table-hover table-responsive-xl"
                          style={{ marginTop: "15px" }}
                        >
                          <thead style={{ color: "#4C57B6" }}>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">E-mail ID</th>
                              <th scope="col">Contact Number</th>
                              <th scope="col">Course</th>
                              <th scope="col">No. of Student</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* used .map() to view all the faculty in card  */}

                            {data.length !== 0 && (
                              <>
                                {data.map((d, index) => {
                                  const subjectDetails = d.subjects[0];
                                  console.log(subjectDetails);
                                  console.log(d);

                                  return (
                                    <tr key={d.facultyId}>
                                      <th scope="col">{index + 1}</th>
                                      <th scope="col">{d.name}</th>
                                      <th scope="col">{d.email}</th>

                                      <th scope="col">{d.contact_number}</th>
                                      {subjectDetails ? (
                                        <>
                                          <th scope="col">
                                            {subjectDetails.name
                                              ? subjectDetails.name
                                              : "-"}
                                          </th>
                                          <th scope="col">
                                            {subjectDetails.students
                                              ? subjectDetails.students.length
                                              : "-"}
                                          </th>
                                        </>
                                      ) : (
                                        <>
                                          <th scope="col">-</th>
                                          <th scope="col">-</th>
                                        </>
                                      )}
                                    </tr>
                                  );
                                })}
                              </>
                            )}
                          </tbody>
                        </table>

                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        >
                          {skip !== 0 && (
                            <div style={{ marginRight: "50px" }}>
                              <FaArrowAltCircleLeft
                                onClick={() => {
                                  setSkip((prevState) => prevState - 5);
                                  setModal(true);
                                }}
                                style={{
                                  marginRight: "10px",
                                  fontSize: "20px",
                                }}
                              />
                              <span
                                style={{ marginLeft: "10px", fontSize: "17px" }}
                              >
                                Previous
                              </span>
                            </div>
                          )}
                          {data.length !== 0 && (
                            <>
                              {data.length < 5 ? (
                                <> </>
                              ) : (
                                <div>
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "17px",
                                    }}
                                  >
                                    Next
                                  </span>
                                  <FaArrowAltCircleRight
                                    onClick={() => {
                                      setSkip((prevState) => prevState + 5);
                                      setModal(true);
                                    }}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "20px",
                                    }}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyList;
