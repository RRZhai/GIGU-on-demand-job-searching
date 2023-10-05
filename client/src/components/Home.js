import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="grid">
      <div className="image-card">
        <div className="image-wrapper">
          <img className="zoom" alt="jobseeker" src="Business_Contract.svg" />
          <Link
            className="content"
            to={currentUser ? "/jobs" : "/login"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="jobseeker"
          >
            Looking for a job ...
          </Link>
        </div>
      </div>
      <div className="image-card">
        <div className="image-wrapper">
          <img
            className="zoom"
            alt="employer"
            src="Business_Contract.svg"
          />
          <Link
            className="content"
            to={currentUser ? "/newjob" : "/login"}
            onClick={(e) => handleSetRole(e.target.name)}
            name="employer"
          >
            Looking for a helper ...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
