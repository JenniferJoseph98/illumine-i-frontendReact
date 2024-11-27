import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/student/studentDashboard.jsx";
import Login from "./components/auth/login";
import FacultyLogin from "./components/auth/FacultyLogin.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EnrolledCourse from "./pages/student/EnrolledCourse.jsx";
import AvailableCourse from "./pages/student/AvailableCourse.jsx";
import ViewStudent from "./pages/student/ViewStudent.jsx";
import FullStudent from "./pages/faculty/FullStudent.jsx";
import MyCourse from "./pages/faculty/MyCourse.jsx";
import FacultyList from "./pages/faculty/FacultyList.jsx";
import PageNotFound from "./pages/dashboard/Layout/PageNotFound.jsx";
import FacultyProtectedRoutes from "./pages/protectedroutes/FacultyProtectedRoutes.jsx";
import StudentProtectedRoutes from "./pages/protectedroutes/StudentProtectedroutes.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/Faculty" element={<FacultyLogin />} />
        <Route
          path="/student/dashboard"
          element={
            <StudentProtectedRoutes>
              <StudentDashboard />
            </StudentProtectedRoutes>
          }
        />
        <Route
          path="/student/enrolledcourse"
          element={
            <StudentProtectedRoutes>
              <EnrolledCourse />
            </StudentProtectedRoutes>
          }
        />
        <Route
          path="/student/availablecourse"
          element={
            <StudentProtectedRoutes>
              <AvailableCourse />
            </StudentProtectedRoutes>
          }
        />
        <Route
          path="/student/viewstudent"
          element={
            <StudentProtectedRoutes>
              <ViewStudent />
            </StudentProtectedRoutes>
          }
        />
        <Route
          path="/faculty/studentlist"
          element={
            <FacultyProtectedRoutes>
              <FullStudent />
            </FacultyProtectedRoutes>
          }
        />
        <Route
          path="/faculty/mycourse"
          element={
            <FacultyProtectedRoutes>
              <MyCourse />
            </FacultyProtectedRoutes>
          }
        />
        <Route
          path="/faculty/list"
          element={
            <FacultyProtectedRoutes>
              <FacultyList />
            </FacultyProtectedRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
