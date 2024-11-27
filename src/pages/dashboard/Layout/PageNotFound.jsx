import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        src="https://onextrapixel.com/wp-content/uploads/2018/11/oxp-404-pages.jpg"
        alt="page not found  Background"
      />
      {/* Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
        }}
        className="btn btn-info"
      >
        <FaArrowLeft style={{ fontSize: "20px" }} /> Home
      </button>
    </div>
  );
}
