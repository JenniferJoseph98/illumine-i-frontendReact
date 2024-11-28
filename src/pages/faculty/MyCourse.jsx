import axios from "axios";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Loader from "../dashboard/Layout/Loader";
import Sidebar from "../dashboard/Layout/Sidebar";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MyCourse() {
  const [student, setStudent] = useState([]);
  const [subject, setSubject] = useState("");
  const [addFlag, setAddFlag] = useState(null);
  const [modal, setModal] = useState(true);
  const facultyId = localStorage.getItem("faculty");
  const showToastMessage = () => {
    toast.success("Student Added!", { autoClose: 1000 });
  };

  useEffect(() => {
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/viewsubject/${facultyId}`
      )
      .then((res) => {
        const details = res.data.data[0];
        console.log(details);
        setSubject(details.name);
        setStudent(details.students);
        setModal(false);
      })
      .catch((err) => console.log(err));
  }, [facultyId]);
  function enrolledStudent() {
    setModal(true);

    setStudent([]);

    setAddFlag(false);

    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/viewsubject/${facultyId}`
      )
      .then((res) => {
        const details = res.data.data[0];
        console.log(details);
        setSubject(details.name);
        setStudent(details.students);
        setModal(false);
      })
      .catch((err) => {console.log(err)

        setModal(false);

      });
  }
  function unEnrolledStudent() {
    setModal(true);

    setStudent([]);
    setAddFlag(true);
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/unenrolledstudent/${facultyId}`
      )
      .then((res) => {
        const details = res.data.data;
        setStudent(details);
        setModal(false);
      })
      .catch((err) => {console.log(err)
        setModal(false);

      });
  }
  function addStudentToMySubject(id) {
    setModal(true);

    axios
      .post(
        `https://backend-college-wvd6.onrender.com/college/enrollbyfaculty`,
        {
          studentId: id,
          facultyId: facultyId,
        }
      )
      .then((res) => {
        showToastMessage();

        setStudent((prevData) =>
          prevData.filter((student) => student.studentId !== id)
        );
        setModal(false);
      })
      .catch((err) => {console.log(err)
        setModal(false);

      });
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>My Course {subject}</h2>
            {addFlag ? (
              <button
                onClick={() => enrolledStudent()}
                className="btn btn-primary"
              >
                En-Rolled Student
              </button>
            ) : (
              <button
                onClick={() => unEnrolledStudent()}
                className="btn btn-primary"
              >
                Add Student
              </button>
            )}
          </div>
          <ToastContainer />
          {modal ? (
            <Loader />
          ) : (
            <>
              <div className="container mt-5">
                <div className="mb-4">
                  <div className="row">
                    {student.length === 0 ? (
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
                              {addFlag && (
                                <th
                                  style={{
                                    textAlign: "center",
                                  }}
                                  scope="col"
                                >
                                  Add to Course
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {student.map((d) => {
                              return (
                                <tr key={d.studentId}>
                                  <th scope="col">{d.first_name}</th>
                                  <th scope="col">{d.last_name}</th>
                                  <th scope="col">{d.email}</th>
                                  <th scope="col">{d.gender}</th>
                                  <th scope="col">{d.contact_number}</th>
                                  {addFlag && (
                                    <th
                                      scope="col"
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      <IoMdAddCircle
                                        onClick={() =>
                                          addStudentToMySubject(d.studentId)
                                        }
                                        style={{
                                          fontSize: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </th>
                                  )}
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
