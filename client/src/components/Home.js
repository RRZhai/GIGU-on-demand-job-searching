import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="grid">
      <div className="image-card">
      {currentUser ? (
            <div className="image-wrapper">
              <img className='zoom' src="Entrepreneur_managing.svg" />
              <Link
                className="content"
                to={"/jobs"}
                onClick={(e) => handleSetRole(e.target.name)}
                name="jobseeker"
              >
                Looking for a job ...
              </Link>
            </div>
          ) : (
            <div className="image-wrapper">
              <img className='zoom' src="Entrepreneur_managing.svg" />
              <Link
                className="content"
                to={"/login"}
                onClick={(e) => handleSetRole(e.target.name)}
                name="jobseeker"
              >
                Looking for a job ...
              </Link>
            </div>
          )}
      </div>
      <div className="image-card">
      {currentUser ? (
            <div className="image-wrapper">
              <img className='zoom' src="Business_Contract.svg" />
              <Link
                className="content"
                to={"/newjob"}
                onClick={(e) => handleSetRole(e.target.name)}
                name="employee"
              >
                Looking for a helper ...
              </Link>
            </div>
          ) : (
            <div className="image-wrapper">
              <img className='zoom' src="Business_Contract.svg" />
              <Link
                className="content"
                to={"/login"}
                onClick={(e) => handleSetRole(e.target.name)}
                name="employee"
              >
                Looking for a helper ...
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
