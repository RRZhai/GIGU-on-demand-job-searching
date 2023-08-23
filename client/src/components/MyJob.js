import * as React from "react";
import { Typography, Container, Grid } from "@mui/material";
import Job from "./Job";

const MyJob = ({
  currentUser,
  userRole,
  handleJobDelete,
  jobs,
  handleProfileUser,
  pendingJobs,
  handleJobComplete,
}) => {
  const relatedJobsAsEmployee = jobs?.filter(
    (job) => job.employee_id === currentUser?.id
  );

  const relatedJobsAsJobseeker = jobs?.filter(
    (job) => job.hires?.job_seeker_id === currentUser?.id
  );
  if (userRole === "employer") {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Hire
        </Typography>
        {relatedJobsAsEmployee.map((job) => (
          <Job
            key={job.id}
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
            handleJobComplete={handleJobComplete}
            handleProfileUser={handleProfileUser}
          />
        ))}
      </Container>
    );
  } else if (userRole === "jobseeker") {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Work
        </Typography>
        {relatedJobsAsJobseeker.map((job) => (
          <Job
            key={job.id}
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
            handleProfileUser={handleProfileUser}
          />
        ))}
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid container>
          <div className="image-card">
            <Typography variant="h5" component="div">
              My Work
            </Typography>
            {relatedJobsAsEmployee?.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobDelete={handleJobDelete}
                handleProfileUser={handleProfileUser}
                handleJobComplete={handleJobComplete}
              />
            ))}
          </div>
          <div className="image-card">
            <Typography variant="h5" component="div">
              My Hire
            </Typography>
            {relatedJobsAsJobseeker?.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobDelete={handleJobDelete}
                handleProfileUser={handleProfileUser}
              />
            ))}
          </div>
        </Grid>
      </Container>
    );
  }
};

export default MyJob;
