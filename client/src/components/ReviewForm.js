import * as React from "react";
import { Rating, TextField, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useContext } from "react";
import { ReviewContext } from "../context/reviewContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Error from "./Error";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ReviewForm({ currentUser, userRole, job, handleProfileUser }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { dispatch: reviewDispatch } = useContext(ReviewContext);
  const reviewSchema = yup.object().shape({
    content: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be at most 200 characters")
      .required("Review content is required"),
  });

  const reviewerId = job?.employee_id === currentUser.id ? job.hires?.job_seeker_id : job.employee_id;

  const formik = useFormik({
    initialValues: {
      job_id: job.id,
      rating: value,
      reviewer_id:reviewerId,
      content: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              debugger
              reviewDispatch({ type: "add", payload: data });
              handleProfileUser(data.user)
              navigate(`/profile/:name`)
            });
          } else {
            res.json().then((error) => setError(error.message));
          }
        })
        .catch(setError("New review not published, please try again"));
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            formik.setFieldValue("rating", newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="review"
        multiline
        name="content"
        placeholder="Please leave a review..."
        onChange={formik.handleChange}
        maxRows={4}
      />
      {formik.errors.content ? <Alert severity="error">{formik.errors.content}</ Alert> : null}
      {error ? <Error error={error} /> : null}
      <Button variant="contained" type="submit" size="small">
        submit
      </Button>
    </Box>
  );
}

export default ReviewForm;