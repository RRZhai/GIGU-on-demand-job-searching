import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Home = ({ handleSetRole, currentUser }) => {
  return (
    <div className="home">
      <div className="grid">
        <div>
          {currentUser ? (
            <div className="image-wrapper">
              <img className='zoom' src="https://www.betterup.com/hs-fs/hubfs/group%20of%20business%20people%20having%20a%20meeting.jpg?width=964&name=group%20of%20business%20people%20having%20a%20meeting.jpg" />
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
              <img className='zoom' src="https://www.betterup.com/hs-fs/hubfs/group%20of%20business%20people%20having%20a%20meeting.jpg?width=964&name=group%20of%20business%20people%20having%20a%20meeting.jpg" />
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
        <div>
          {currentUser ? (
            <div className="image-wrapper">
              <img className='zoom' src="https://content.fortune.com/wp-content/uploads/2022/07/Babysitter-Hybrid-Work-GettyImages-1028379220.jpg?w=1440&q=75" />
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
              <img className='zoom' src="https://content.fortune.com/wp-content/uploads/2022/07/Babysitter-Hybrid-Work-GettyImages-1028379220.jpg?w=1440&q=75" />
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
    </div>
  );
};

export default Home;
