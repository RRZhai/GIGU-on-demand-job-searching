import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box align="center">
        <img className="nonimage" src="Business_Meetings.svg" />
        <Typography variant="h4">SORRY</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          The page is not found, or you are not authorized to view the page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
