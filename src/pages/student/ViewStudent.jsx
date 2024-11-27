import axios from "axios";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import Loader from "../dashboard/Layout/Loader";
import React, { useEffect, useState } from "react";
function Table() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    //api to fetch all the student
    axios
      .get(`https://collegemanagement-x1m6.onrender.com/college/viewstudent`)
      .then((res) => {
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
          <Details data="View Student" />
          <hr />
          <h2 className="mb-3">Student List</h2>

          {modal ? (
            <Loader />
          ) : (
            <>
              <div className="container mt-5">
                <div className="mb-4">
                  <div className="row">
                    {data.length === 0 ? (
                      <>
                        <h1 style={{ marginTop: "15px" }}>No student found</h1>
                      </>
                    ) : (
                      <>
                        <table
                          className="table table-hover table-responsive-xl"
                          style={{ marginTop: "15px" }}
                        >
                          <thead style={{ color: "#4C57B6" }}>
                            <tr>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">E-mail ID</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Contact Number</th>
                              <th scope="col">DOB</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* used .map() to view all the students in table  */}

                            {data.map((d) => {
                              return (
                                <tr key={d.ppdId}>
                                  <th scope="col">{d.first_name}</th>
                                  <th scope="col">{d.last_name}</th>
                                  <th scope="col">{d.email}</th>
                                  <th scope="col">{d.gender}</th>

                                  <th scope="col">{d.contact_number}</th>
                                  <th scope="col">{d.dob}</th>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
