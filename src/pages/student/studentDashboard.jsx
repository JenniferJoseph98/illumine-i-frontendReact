import EditProfileModal from "../dashboard/EditProfile";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../dashboard/Layout/table.css";
import Details from "../dashboard/Layout/Details";
import Sidebar from "../dashboard/Layout/Sidebar";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../dashboard/Layout/Loader";
const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(true);
  const [image, setImage] = useState(
    "https://www.quigleyspharmacy.ie/wp-content/uploads/2020/08/Web_OurTeam_Dalton-Placeholder.png"
  );
  useEffect(() => {
    //fetch my details view my student dashboard
    axios
      .get(
        `https://backend-college-wvd6.onrender.com/college/viewsinglestudent/${localStorage.getItem(
          "student"
        )}`
      )
      .then((res) => {
        setStudent(res.data.data);
        var profilePicture = res.data.data.profile_pic;
        console.log(profilePicture);
        if (profilePicture != null)
          setImage("http://res.cloudinary.com/dwwtxueyi/" + profilePicture);
        setModal(false);
      })
      .catch((Err) => console.log(Err));
  }, []);

  const handleEditDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (updatedStudent) => {
    console.log(updatedStudent);
    // api for update my details
    axios
      .put(
        `https://backend-college-wvd6.onrender.com/college/update`,
        updatedStudent
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setStudent(updatedStudent);
    setIsModalOpen(false);
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Handle the uploaded file (e.g., display it or send it to the server)
  //     const previewUrl = URL.createObjectURL(file);
  //     setImage(previewUrl);
  //   }
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeInMB > 2) {
        alert("File size must be less than 2MB.");
        return; // Exit the function if the file is too large
      }
      // Preview the selected image
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      // Create FormData for the file
      const formData = new FormData();
      formData.append("profile_pic", file);

      // Get studentId from localStorage or the current student data

      // Make the API call to update the profile picture
      //api for upload and view my profile picture
      axios
        .put(
          `https://backend-college-wvd6.onrender.com/college/students/update-profile-pic/${localStorage.getItem(
            "student"
          )}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Profile picture updated:", response.data);
          alert("Profile picture updated successfully!");
        })
        .catch((error) => {
          console.error(
            "Error updating profile picture:",
            error.response || error
          );
          alert("Failed to update profile picture. Please try again.");
        });
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  // function editImage() {}
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />

          {modal ? (
            <Loader />
          ) : (
            <>
              <div className="container mt-5">
                {student && (
                  <div className="card mb-4">
                    <div className="card-header">
                      <h3>Student details</h3>
                    </div>

                    <div className="card-body">
                      <div>
                        <div style={{ position: "relative" }}>
                          <img
                            style={{
                              borderRadius: "58%",
                              width: "150px",
                              height: "150px",
                              marginBottom: "25px",
                            }}
                            src={image}
                            alt="profile pic"
                          />
                          <FaRegEdit
                            onClick={triggerFileInput}
                            style={{
                              fontSize: "30px",
                              position: "relative",
                              left: "-40px",
                              top: "40px",
                              color: "black",
                              cursor: "pointer",
                            }}
                          />
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                        <p>
                          <strong>First Name:</strong> {student.first_name}
                        </p>
                        <p>
                          <strong>Last Name:</strong> {student.last_name}
                        </p>
                        <p>
                          <strong>E-mail:</strong> {student.email}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {student.dob}
                        </p>
                        <p>
                          <strong>Gender:</strong> {student.gender}
                        </p>
                        <p>
                          <strong>Blood Group:</strong> {student.bloodgroup}
                        </p>
                        <p>
                          <strong>Contact Number:</strong>{" "}
                          {student.contact_number}
                        </p>
                        <p>
                          <strong>Address:</strong> {student.address}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={handleEditDetails}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Profile Modal */}
                {isModalOpen && (
                  <EditProfileModal
                    student={student}
                    onClose={handleCloseModal}
                    onSave={handleSaveProfile}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
