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

  // console.log("relatedJobsAsEmployer", relatedJobsAsEmployer);
  // console.log("relatedJobsAsJobseeker", relatedJobsAsJobseeker);

  return (
    <Container>
      <Stack spacing={2}>
        <div className="image-card">
          <Typography
            variant="h4"
            component="div"
            bgcolor="#ff9800
"
            align="center"
          >
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
              />
            ))}
          </Stack>
        </div>
        <div className="image-card">
          <Typography
            variant="h4"
            component="div"
            bgcolor="#2196f3"
            align="center"
          >
            My Hire
          </Typography>
          <Stack spacing={2}>
            {relatedJobsAsEmployer?.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                handleJobComplete={handleJobComplete}
                handleJobDelete={handleJobDelete}
                handleProfileUser={handleProfileUser}
              />
            ))}
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default MyJob;
