import axios from "axios";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";
import EditProfile from "../dashboard/EditProfile";
import Loader from "../dashboard/Layout/Loader";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
function FullStudent() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(true);
  const [student, setStudent] = useState({});
  const [modalType, setModalType] = useState("");
  const [skip, setSkip] = useState(0);
  const handleCloseModal = () => {
    setStudent({});
    setIsModalOpen(false);
  };
  const handleSaveProfile = (updatedStudent) => {
    setModal(true);

    console.log(updatedStudent);
    if (modalType === "add") {
      //api to Create a student
      axios
        .post(
          `https://backend-college-wvd6.onrender.com/college/addstudent/${localStorage.getItem(
            "faculty"
          )}`,
          updatedStudent
        )
        .then((res) => {
          setData((prevData) => [...prevData, res.data.data]);
          setModal(false);
        })
        .catch((err) => console.log(err));
      setIsModalOpen(false);
    } else {
      //api to update student details
      axios
        .put(
          `https://backend-college-wvd6.onrender.com/college/update`,
          updatedStudent
        )
        .then((res) => {
          // Update the specific student in the state array
          setData((prevData) =>
            prevData.map((student) =>
              student.studentId === updatedStudent.studentId
                ? updatedStudent
                : student
            )
          );
          setIsModalOpen(false);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
          setModal(false);
        });
    }

    setIsModalOpen(false);
  };
  const handleEditDetails = () => {
    setModalType("add");
    setIsModalOpen(true);
    setStudent({});
  };
  useEffect(() => {
    //api to view all the student
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/viewstudent/${skip}`
      )
      .then((res) => {
        setData(res.data.data);
        setModal(false);
      })
      .catch((err) => {
        setModal(false);
        
      });
  }, [skip]);

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
            <h2 className="text-center">Student List</h2>
            <button onClick={handleEditDetails} className="btn btn-primary">
              Create New Student
            </button>
          </div>
          <div className="container mt-5">
            <div className="mb-4">
              <div className="row">
                {modal ? (
                  <Loader />
                ) : (
                  <>
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
                              <th scope="col">S.No</th>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">E-mail ID</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Contact Number</th>
                              <th scope="col">DOB</th>
                              <th scope="col">Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((d, index) => {
                              return (
                                <tr key={d.id}>
                                  <th scope="col">{index + 1}</th>
                                  <th scope="col">{d.first_name}</th>
                                  <th scope="col">{d.last_name}</th>
                                  <th scope="col">{d.email}</th>
                                  <th scope="col">{d.gender}</th>

                                  <th scope="col">{d.contact_number}</th>
                                  <th scope="col">{d.dob}</th>
                                  <th scope="col">
                                    <MdEdit
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setModalType("edit");
                                        setIsModalOpen(true);
                                        setStudent(d);
                                      }}
                                    />
                                  </th>
                                </tr>
                              );
                            })}
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
          {isModalOpen && (
            <EditProfile
              onClose={handleCloseModal}
              onSave={handleSaveProfile}
              modalType={modalType}
              student={student}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FullStudent;
