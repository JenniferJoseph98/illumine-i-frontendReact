import axios from "axios";
import { useEffect, React, useState } from "react";
import Modal from "react-modal";
import { Navigate, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");
//This modal is used to add the subject for the user
function SubjectModal({ refresh, setRefresh }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [subject, setSubject] = useState("");
  const closeModal = () => {
    //api to add subject for the faculty
    axios
      .post(`https://collegemanagement-x1m6.onrender.com/college/addsubject`, {
        name: subject,
        facultyId: localStorage.getItem("faculty"),
      })
      .then((res) => {
        localStorage.setItem("subject", "true");
        setModalIsOpen(false);
        setRefresh(!refresh);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "450px",
            height: "200px",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Add Subject</h2>
        <div class="input-group mb-3 mt-3">
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            class="form-control"
            placeholder="Please enter subject name"
            aria-label="Subject"
            aria-describedby="basic-addon1"
          />
        </div>
        <button
          disabled={subject.length < 5}
          type="submit"
          className="btn btn-info"
          onClick={closeModal}
        >
          Submit
        </button>
      </Modal>
    </div>
  );
}
//This modal used protect faculty routes from children
const FacultyProtectedRoutes = ({ children }) => {
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("student")) navigate("/student/dashboard");
  }, [navigate, refresh]);
  let name = localStorage.getItem("faculty");
  if (name === null) {
    name = "";
  }
  return (
    <div>
      {
      // check the user already have subject or not, if not modal will open
      localStorage.getItem("subject") === "true" ? (
        <>{name.length ? children : <Navigate to="/login/faculty" />}</>
      ) : (
        <>
          <SubjectModal setRefresh={setRefresh} refresh={refresh} />
        </>
      )}
    </div>
  );
};
export default FacultyProtectedRoutes;
