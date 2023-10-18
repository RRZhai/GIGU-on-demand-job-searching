import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="grid">
      <div className="image-card">
        {currentUser ? (
          <div className="image-wrapper">
            <img className="zoom" src="Entrepreneur_managing.svg" />
            <Link
              className="content"
              to={"/login"}
              color="inherit"
              onClick={(e) => handleSetRole(e.target.name)}
              name="jobseeker"
            >
              <Button size="small" variant="contained">
                Looking for a job ...
              </Button>
            </Link>
          </div>
        ) : (
          <div className="image-wrapper">
            <img className="zoom" src="Entrepreneur_managing.svg" />
            <Link
              className="content"
              component={Link}
              to={"/login"}
              color="inherit"
            >
              <Button size="small" variant="contained">
                Looking for a job ...
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="image-card">
        {currentUser ? (
          <div className="image-wrapper">
            <img className="zoom" src="Business_Contract.svg" />
            <Link
              className="content"
              component={Link}
              color="inherit"
              to={"/newjob"}
              onClick={(e) => handleSetRole(e.target.name)}
              name="employee"
            >
              <Button size="small" variant="contained">
                Looking for a helper ...
              </Button>
            </Link>
          </div>
        ) : (
          <div className="image-wrapper">
            <img className="zoom" src="Business_Contract.svg" />
            <Link
              className="content"
              component={Link}
              to={"/login"}
              color="inherit"
            >
              <Button size="small" variant="contained">
                Looking for a helper ...
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
