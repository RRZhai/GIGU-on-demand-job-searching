import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import Reviews from "./Reviews";

import { Typography, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { ReviewContext } from "../context/reviewContext";
import { useFormik } from "formik";
import { dark } from "@mui/material/styles/createPalette";

const Profile = ({ profileUser, updateCurrentUser, currentUser }) => {
  const { reviews } = useContext(ReviewContext);
  const [isEdit, setIsEdit] = useState(false);

  const [updateData, setUpdateData] = useState(currentUser);

  const filterReview = reviews.filter(
    (review) => review.reviewer_id === profileUser?.id
  );

  const aveRating = (user, reviews) => {
    let sum = 0;
    if (user && reviews?.length !== 0) {
      reviews?.forEach((review) => {
        sum += review.rating;
      });
      return sum / reviews?.length;
    }
  };

  const handleEdit = () => {
    setIsEdit((current) => !current);
  };

  const handleUpdateData = (e) => {
    setUpdateData(current => [...current, e.target.value]);
  }

  return (
    <Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            height: 250,
            boxSizing: "border-box",
            marginTop: "60px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "none",
            width: "100vw",
            position: "sticky",
          },
        }}
        variant="permanent"
      >
        <Box sx={{ display: "flex", width: "800px" }}>
          <Avatar
            alt={profileUser?.username}
            src={profileUser?.profile_pic_url}
            sx={{ width: 100, height: 100 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 150,
              maxWidth: 350,
              alignItems: "left",
              mx: "auto",
              my: "auto",
            }}
          >
            <Typography variant="h5" component="div">
              {profileUser?.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {profileUser?.email}
            </Typography>
            <Rating
              name="text-feedback"
              value={aveRating(profileUser, filterReview)}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {profileUser === currentUser ? (
                <EditIcon onClick={handleEdit} fontSize="small" />
              ) : (
                ""
              )}
              Bio:
            </Typography>
            {isEdit ? (
              <Box onSubmit={formik.handleSubmit}>
                <TextField
                  multiline
                  variant="standard"
                  fullWidth
                  placeholder="Please enter your bio ..."
                  sx={{ width: "250px" }}
                  onChange={formik.handleChange}
                />
                <Button type='submit' variant="contained" size="small">
                  SAVE
                </Button>
              </Box>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{
                  width: 300,
                  my: "auto",
                  mx: "auto",
                  alignContent: "center",
                }}
              >
                {profileUser?.bio}
              </Typography>
            )}
          </Box>
        </Box>
      </Drawer>
      <Reviews profileUser={profileUser} filterReview={filterReview} />
    </Box>
  );
};

export default Profile;
