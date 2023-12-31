import * as React from "react";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Alert from "@mui/material/Alert";
import Error from "./Error";
import Error404 from "./Error404";

const JobForm = ({ handleSubmitJob, currentUser, userRole }) => {
  const [error, setError] = useState(null);

  const jobSchema = yup.object().shape({
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be at most 200 characters")
      .required("Job description is required"),
    pay_rate: yup.number().required("Payrate is required"),
    address: yup.string().required("Please enter a valid address"),
    city: yup.string().required("Please enter a valid city"),
    state: yup.string().required("Please enter a valid state"),
    date: yup.string().required("Please enter a valid date"),
    start_time: yup.string().required("Please enter a valid start time"),
    end_time: yup.string().required("Please enter a valid end time"),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      job_type: "Babysitting",
      description: "",
      pay_rate: "",
      address: "",
      city: "",
      state: "",
      employee_id: `${currentUser.id}`,
      hire_id: null,
      date: "",
      start_time: "",
      end_time: "",
      status: "active",
    },
    validationSchema: jobSchema,
    onSubmit: (values) => {
      fetch("http://localhost:5555/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              handleSubmitJob(data);
              navigate("/jobs");
            });
          } else {
            res.json().then((error) => setError(error));
          }
        })
        .catch(setError("New job not published, please try again"));
    },
  });

  const jobTypes = [
    {
      value: "Babysitting",
      label: "Babysitting",
    },
    {
      value: "House Cleaning",
      label: "House Cleaning",
    },
    {
      value: "Tutoring",
      label: "Tutoring",
    },
    {
      value: "Dog Walking",
      label: "Dog Walking",
    },
    {
      value: "Delivery Service",
      label: "Delivery Service",
    },
    {
      value: "Event Staffing",
      label: "Event Staffing",
    },
    {
      value: "Handyman Service",
      label: "Handyman Service",
    },
    {
      value: "Modeling",
      label: "Modeling",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  return (
    <Container>
      {userRole === "employer" ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50%", position: "center" },
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="job_type"
            select
            label="Required"
            defaultValue="Babysitting"
            helperText="Please select your job type"
            onChange={formik.handleChange}
          >
            {jobTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            <TextField
              fullWidth
              required
              name="description"
              label="Description"
              placeholder="Please describe the job"
              onChange={formik.handleChange}
            />
            {formik.errors.description ? (
              <Alert severity="error" sx={{ width: "50%" }}>
                {formik.errors.description}
              </Alert>
            ) : null}
          </Box>
          <TextField
            fullWidth
            required
            name="pay_rate"
            label="Payrate"
            placeholder="Please enter the payrate. Ex: $15/hr"
            onChange={formik.handleChange}
          />
          {formik.errors.pay_rate ? (
            <Alert severity="error" sx={{ width: "50%" }}>
              {formik.errors.pay_rate}
            </Alert>
          ) : null}
          <TextField
            fullWidth
            required
            name="address"
            label="Address"
            placeholder="Please enter the address"
            onChange={formik.handleChange}
          />
          {formik.errors.address ? (
            <Alert severity="error" sx={{ width: "50%" }}>
              {formik.errors.address}
            </Alert>
          ) : null}
          <TextField
            fullWidth
            required
            name="city"
            label="City"
            placeholder="Please enter the city"
            onChange={formik.handleChange}
          />
          {formik.errors.city ? (
            <Alert severity="error" sx={{ width: "50%" }}>
              {formik.errors.city}
            </Alert>
          ) : null}
          <TextField
            fullWidth
            required
            name="state"
            label="State"
            placeholder="Please enter the state"
            onChange={formik.handleChange}
          />
          {formik.errors.state ? (
            <Alert severity="error" sx={{ width: "50%" }}>
              {formik.errors.state}
            </Alert>
          ) : null}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="date"
              label="Date"
              value={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
            />
            {formik.errors.date ? (
              <Alert severity="error" sx={{ width: "50%" }}>
                {formik.errors.date}
              </Alert>
            ) : null}
            <TimeField
              fullWidth
              name="start_time"
              value={formik.values.start_time}
              onChange={(time) => formik.setFieldValue("start_time", time)}
              format="HH:mm"
            />
            {formik.errors.start_time ? (
              <Alert severity="error" sx={{ width: "50%" }}>
                {formik.errors.start_time}
              </Alert>
            ) : null}
            <TimeField
              fullWidth
              name="end_time"
              value={formik.values.end_time}
              onChange={
                ((time) => formik.setFieldValue("end_time", time))
              }
              format="HH:mm"
            />
            {formik.errors.end_time ? (
              <Alert severity="error" sx={{ width: "50%" }}>
                {formik.errors.end_time}
              </Alert>
            ) : null}
          </LocalizationProvider>
          {error ? <Error message={error} sx={{ width: "50%" }} /> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Error404 />
      )}
    </Container>
  );
};

export default JobForm;
