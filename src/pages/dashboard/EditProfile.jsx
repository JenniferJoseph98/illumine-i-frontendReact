import React, { useState, useEffect } from "react";

const EditProfile = ({ student, onClose, onSave, modalType }) => {
  const [updatedStudent, setUpdatedStudent] = useState({});

  useEffect(() => {
    setUpdatedStudent(student);
  }, [student]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "email" || name === "first_name") value = value.toLowerCase();

    setUpdatedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedStudent);
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
      aria-labelledby="editProfileModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProfileModal">
              Edit Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  required
                  name="first_name"
                  value={updatedStudent.first_name || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={updatedStudent.last_name || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="email"
                  name="email"
                  value={updatedStudent.email || ""}
                  disabled={modalType !== "add"}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  required
                  name="dob"
                  value={updatedStudent.dob || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  required
                  value={updatedStudent.gender || ""}
                  onChange={handleInputChange}
                >
                  <option disabled value="">
                    {" "}
                    Select any one
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="bloodgroup" className="form-label">
                  Blood Group
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodgroup"
                  required
                  name="bloodgroup"
                  value={updatedStudent.bloodgroup || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contact_number" className="form-label">
                  Contact Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact_number"
                  name="contact_number"
                  required
                  value={updatedStudent.contact_number || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  required
                  value={updatedStudent.address || ""}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {modalType === "add" ? "Add Student" : "Update Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
