import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="grid">
      <div className="image-card">
        {currentUser ? (
          <div className="image-wrapper">
            <img className="zoom" src="Entrepreneur_managing.svg" />
            <div className="content" color="inherit">
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/jobs"
                onClick={(e) => handleSetRole(e.target.name)}
                name="jobseeker"
              >
                Looking for a job ...
              </Button>
            </div>
          </div>
        ) : (
          <div className="image-wrapper">
            <img className="zoom" src="Entrepreneur_managing.svg" />
            <div className="content" color="inherit">
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/login"
              >
                Looking for a job ...
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="image-card">
        {currentUser ? (
          <div className="image-wrapper">
            <img className="zoom" src="Business_Contract.svg" />
            <div className="content" color="inherit">
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/newjob"
                onClick={(e) => handleSetRole(e.target.name)}
                name="employer"
              >
                Looking for a helper ...
              </Button>
            </div>
          </div>
        ) : (
          <div className="image-wrapper">
            <img className="zoom" src="Business_Contract.svg" />
            <div className="content" component={Link} color="inherit">
              <Button
                size="small"
                variant="contained"
                component={Link}
                to="/login"
              >
                Looking for a helper ...
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
