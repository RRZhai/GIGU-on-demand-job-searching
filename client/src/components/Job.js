import * as React from "react";
import { Stack, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ReviewForm from "./ReviewForm";

const Job = ({
  job,
  currentUser,
  userRole,
  handleApplyJob,
  handleJobDelete,
  handleProfileUser,
  handleJobComplete,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [viewApplicant, setViewApplicant] = useState(false);

  const handleReadMore = () => {
    setReadMore((current) => !current);
  };
  const handleAddReview = () => {
    setAddReview((current) => !current);
  };
  const handleViewApplicant = () => {
    setViewApplicant((current) => !current);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const convertDate = (date) => {
    return date?.slice(0, 10).replaceAll("-", "/");
  };

  const convertTime = (time) => {
    return time?.slice(11, 16);
  };

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Job of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {convertDate(job.date)}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" component="div">
              {job.job_type}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {job.city}, {job.state}
            </Typography>
          </Box>
          <Box ml="auto" sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={(e) => handleProfileUser(job.user)}
              component={Link}
              to="/profile/:name"
            >
              <Avatar alt={job.user?.name} src={job.user?.profile_pic_url} />
            </IconButton>
          </Box>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 4 }}
        >
          <Item>${job.pay_rate}/hr</Item>
          <Item>{convertTime(job.start_time)}</Item>
          <Item>{convertTime(job.end_time)}</Item>
          <Item>{job?.status?.toUpperCase()}</Item>
        </Stack>
      </CardContent>
      <CardActions>
        {userRole === "jobseeker" &&
        job.status === "active" &&
        job.employee_id !== currentUser.id ? (
          <Button
            size="small"
            variant="contained"
            onClick={(e) => {
              handleApplyJob(e, job);
            }}
          >
            Apply
          </Button>
        ) : (
          <Button disabled>Apply</Button>
        )}
        <Button
          onClick={(e) => {
            if (addReview) {
              handleReadMore();
              handleAddReview();
            } else if (viewApplicant) {
              handleReadMore();
              handleViewApplicant();
            } else {
              handleReadMore();
            }
          }}
          size="small"
        >
          Learn More
        </Button>
        {job?.employee_id === currentUser?.id ? (
          <>
            <Button
              onClick={(e) => {
                if (readMore) {
                  handleReadMore();
                  handleViewApplicant();
                } else if (addReview) {
                  handleAddReview();
                  handleViewApplicant();
                } else {
                  handleViewApplicant();
                }
              }}
              size="small"
            >
              View Applicant
            </Button>
            {job?.status !== "completed" ? (
              <Button
                variant="contained"
                onClick={(e) => handleJobDelete(job)}
                size="small"
              >
                Cancel
              </Button>
            ) : null}
            {!job.hires ? <Button disabled>complete</Button> : null}
            {job.hires && job?.status === "pending" ? (
              <Button
                variant="contained"
                onClick={(e) => handleJobComplete(job)}
                size="small"
              >
                Complete
              </Button>
            ) : null}
            {job?.status === "completed" ? (
              <Button
                onClick={(e) => {
                  if (readMore) {
                    handleReadMore();
                    handleAddReview();
                  } else if (viewApplicant) {
                    handleViewApplicant();
                    handleAddReview();
                  } else {
                    handleAddReview();
                  }
                }}
                size="small"
              >
                add review
              </Button>
            ) : null}
          </>
        ) : null}
        {job?.status === "completed" &&
        job?.hires?.job_seeker_id === currentUser?.id ? (
          <Button
            onClick={(e) => {
              if (readMore || viewApplicant) {
                handleReadMore();
                handleAddReview();
                handleViewApplicant();
              } else {
                handleAddReview();
              }
            }}
            size="small"
          >
            add review
          </Button>
        ) : null}
      </CardActions>
      <CardContent>
        {readMore ? (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {job.description}
          </Typography>
        ) : null}
        {addReview ? (
          <ReviewForm
            job={job}
            currentUser={currentUser}
            userRole={userRole}
            handleProfileUser={handleProfileUser}
          />
        ) : null}
        {viewApplicant && job.hires ? (
          <IconButton
            onClick={(e) => handleProfileUser(job.hires.user)}
            component={Link}
            to="/profile/:name"
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                alt={job.hires?.user.name}
                src={job.hires?.user.profile_pic_url}
              />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {job.hires?.user.name}
              </Typography>
            </Stack>
          </IconButton>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Job;
