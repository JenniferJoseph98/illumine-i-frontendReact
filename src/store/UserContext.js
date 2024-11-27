import React, { createContext, useContext, useReducer } from "react";

// Create a context for user data
const UserContext = createContext();

// Initial state for the user
const initialState = {
  facultyUsers: [
    {
      email: "faculty1@college.com",
      password: "facultyPass1",
      name: "Dr. John Smith",
      teacherCode: "T12345",
    },
    {
      email: "faculty2@college.com",
      password: "facultyPass2",
      name: "Dr. Jane Doe",
      teacherCode: "T67890",
    },
    {
      email: "faculty3@college.com",
      password: "facultyPass3",
      name: "Dr. Alice Brown",
      teacherCode: "T54321",
    },
    {
      email: "faculty4@college.com",
      password: "facultyPass4",
      name: "Dr. Bob White",
      teacherCode: "T98765",
    },
  ],
  studentUsers: [
    {
      id: "1", 
      email: "student1@college.com",
      rollNumber: "S12345",
      password: "studentPass1",
      name: "John Doe 1",
    },
    {
      id: "2",
      email: "student2@college.com",
      rollNumber: "S67890",
      password: "studentPass2",
      name: "Jane Doe 2",
    },
  ],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FACULTY_USER":
      return {
        ...state,
        facultyUsers: [...state.facultyUsers, action.payload],
      };
    case "ADD_STUDENT_USER":
      return {
        ...state,
        studentUsers: [...state.studentUsers, action.payload],
      };
    case "UPDATE_STUDENT_USER":
      // Update only the student with the matching ID
      return {
        ...state,
        studentUsers: state.studentUsers.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
