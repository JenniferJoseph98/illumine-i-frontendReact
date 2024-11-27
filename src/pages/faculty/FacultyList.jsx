import axios from "axios";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import React, { useEffect, useState } from "react";
import Loader from "../dashboard/Layout/Loader";
function FacultyList() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(true);
  useEffect(() => {
    //Api to fetch all the faculty details
    axios
      .get(`https://collegemanagement-x1m6.onrender.com/college/viewfaculty`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setModal(false);
      })
      .catch((err) => console.log(err));
  }, []);

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

                                  return (
                                    <tr key={d.facultyId}>
                                      <th scope="col">{index + 1}</th>
                                      <th scope="col">{d.name}</th>
                                      <th scope="col">{d.email}</th>

                                      <th scope="col">{d.contact_number}</th>
                                      <th scope="col">{subjectDetails.name}</th>
                                      <th scope="col">
                                        {subjectDetails.students.length}
                                      </th>
                                    </tr>
                                  );
                                })}
                              </>
                            )}
                          </tbody>
                        </table>
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
