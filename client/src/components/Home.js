import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="grid">
      <div className="image-card">
        <Link
          className="content"
          to={currentUser ? "/jobs" : "/login"}
          onClick={(e) => handleSetRole(e.target.name)}
          name="jobseeker"
        >
          <div className="image-wrapper">
            <img
              className="zoom"
              alt="jobseeker"
              src="Entrepreneur_managing.svg"
            />
            <Button
              noWrap
              sx={{ flexGrow: 1 }}
              variant="button"
              color="text.primary"
            >
              Looking for a job ...
            </Button>
          </div>
        </Link>
      </div>
      <div className="image-card">
        <Link
          className="content"
          to={currentUser ? "/newjob" : "/login"}
          onClick={(e) => handleSetRole(e.target.name)}
          name="employer"
        >
          <div className="image-wrapper">
            <img className="zoom" alt="employer" src="Business_Contract.svg" />
            <Button
              noWrap
              sx={{ flexGrow: 1 }}
              variant="button"
              color="text.primary"
            >
              Looking for a helper ...
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
