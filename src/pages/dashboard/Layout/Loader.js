import { BallTriangle } from "react-loader-spinner";
import "./table.css";
export default function Loader() {
  return (
    <div className="loader-overlay">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
}
