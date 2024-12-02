import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Rating,
} from "@mui/material";

const FeedBack = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: 0,
    message: "",
    courseId: "",
  });

  useEffect(() => {
    // Fetch all feedbacks
    axios.get("http://localhost:8080/api/feedbacks/all").then((response) => {
      setFeedbacks(response.data);
    });

    // Fetch all courses
    axios.get("http://localhost:8080/api/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleRatingChange = (event, value) => {
    setNewFeedback({ ...newFeedback, rating: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/feedbacks", newFeedback)
      .then((response) => {
        setFeedbacks([...feedbacks, response.data]);
        setNewFeedback({ name: "", rating: 0, message: "", courseId: "" });
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Feedback Management
      </Typography>
      <Box>
        <Typography variant="h5" gutterBottom>
          All Feedback
        </Typography>
        <Grid container spacing={2}>
          {feedbacks.map((feedback) => (
            <Grid item xs={12} sm={6} md={4} key={feedback.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{feedback.name}</Typography>
                  <Rating value={feedback.rating} readOnly />
                  <Typography variant="body1">{feedback.message}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Course: {courses.find((c) => c.id === feedback.courseId)?.title || "Unknown"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mb={4} mt={4} sx={{

        border: 1,
        borderColor: "grey",
        padding: 2,
        borderRadius: 2, // Optional, for rounded corners
      }}>
        <Typography variant="h5" gutterBottom>
          Submit Feedback
        </Typography>
        <Grid item xs={12}>
          <Rating
            name="rating"
            value={newFeedback.rating}
            onChange={handleRatingChange}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={newFeedback.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Autocomplete
              options={courses}
              getOptionLabel={(option) => option.title || ""} // Display course title
              value={courses.find((c) => c.id === newFeedback.courseId) || null} // Current selected course
              onChange={(event, value) => {
                setNewFeedback({ ...newFeedback, courseId: value?.id || "" });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Course"
                  variant="outlined"
                  fullWidth
                  required
                  
                />
              )}
            />
          </Grid>


          <Grid item xs={12} mr={5}>
            <TextField
              label="Message"
              name="message"
              value={newFeedback.message}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FeedBack;
