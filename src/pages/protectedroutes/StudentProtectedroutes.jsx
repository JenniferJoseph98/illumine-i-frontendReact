import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//This modal used protect faculty routes from children

const StudentProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("faculty")) navigate("/faculty/studentlist");
  }, [navigate]);
  let name = localStorage.getItem("student");
  if (name === null) {
    name = "";
  }
  return <div>{name.length ? children : <Navigate to="/" />}</div>;
};
export default StudentProtectedRoutes;
