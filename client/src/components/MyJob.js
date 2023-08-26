import * as React from "react";
import { Typography, Container, Grid, Stack } from "@mui/material";
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
  const relatedJobsAsEmployer = jobs?.filter(
    (job) => job.employee_id === currentUser?.id
  );

  const relatedJobsAsJobseeker = jobs?.filter(
    (job) => job.hires?.job_seeker_id === currentUser?.id
  );

  console.log("relatedJobsAsEmployer", relatedJobsAsEmployer);
  console.log("relatedJobsAsJobseeker", relatedJobsAsJobseeker);
  if (userRole === "employer") {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Hire
        </Typography>
        <Stack spacing={2}>
        {relatedJobsAsEmployer.map((job) => (
          <Job
            key={job.id}
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
            handleJobComplete={handleJobComplete}
            handleProfileUser={handleProfileUser}
          />
        ))}
        </Stack>
      </Container>
    );
  } else if (userRole === "jobseeker") {
    return (
      <Container>
        <Stack spacing={2}>
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
        </Stack>
      </Container>
    );
  } else {
    return (
      <Container>
        <Stack direction="row" spacing={2}>
          <div className="image-card" >
            <Typography variant="h5" component="div">
              My Work
            </Typography>
            <Stack spacing={2}>
            {relatedJobsAsJobseeker?.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobDelete={handleJobDelete}
                handleProfileUser={handleProfileUser}
                handleJobComplete={handleJobComplete}
              />
            ))}
            </Stack>
          </div>
          <div className="image-card">
            <Typography variant="h5" component="div">
              My Hire
            </Typography>
            <Stack spacing={2}>
            {relatedJobsAsEmployer?.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobDelete={handleJobDelete}
                handleProfileUser={handleProfileUser}
              />
            ))}
            </Stack>
          </div>
        </Stack>
      </Container>
    );
  }
};

export default MyJob;
