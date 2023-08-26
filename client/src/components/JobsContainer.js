import React from "react";
import Job from "./Job";
import { Container, Stack } from "@mui/material";
const JobsContainer = ({
  userRole,
  jobs,
  handleJobComplete,
  currentUser,
  handleApplyJob,
  handleJobDelete,
  handleProfileUser,
}) => {
  return (
    <Container >
      <Stack spacing={2}>
        {jobs
          ? jobs.map((job) => (
              <Job
                key={job.id}
                job={job}
                currentUser={currentUser}
                userRole={userRole}
                handleApplyJob={handleApplyJob}
                handleJobComplete={handleJobComplete}
                handleProfileUser={handleProfileUser}
                handleJobDelete={handleJobDelete}
              />
            ))
          : null}
      </Stack>
    </Container>
  );
};

export default JobsContainer;
