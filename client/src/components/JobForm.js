import { useForm } from "react-hook-form";
import * as React from "react";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
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
import Error from "./Error";

const JobForm = ({ handleSubmitJob, currentUser }) => {
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
      employee_id: currentUser?.id,
      hire_id: null,
      date: "",
      start_time: "",
      end_time: "",
      status: "active",
    },
    validationSchema: jobSchema,
    onSubmit: (values) => {
      fetch("/jobs", {
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
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
      <TextField
        fullWidth
        required
        name="description"
        label="Description"
        placeholder="Please describe the job"
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        name="pay_rate"
        label="Payrate"
        placeholder="Please enter the payrate. Ex: $15/hr"
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        name="address"
        label="Address"
        placeholder="Please enter the address"
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        name="city"
        label="City"
        placeholder="Please enter the city"
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        required
        name="state"
        label="State"
        placeholder="Please enter the state"
        onChange={formik.handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker name="date" label="Date" value={formik.values.date} onChange={date => formik.setFieldValue('date', date)} />
        <TimeField
          fullWidth
          name="start_time"
          value={formik.values.start_time}
          onChange={time => formik.setFieldValue('start_time', time)}
          format="HH:mm"
        />
        <TimeField
          fullWidth
          name="end_time"
          value={formik.values.end_time}
          onChange={time => formik.setFieldValue('end_time', time)}
          format="HH:mm"
        />
      </LocalizationProvider>
      {error ? <Error message={error} /> : null}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default JobForm;
