import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";

export default function AddCourseMaterial() {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Use course ID as value
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false); // for fetching courses

  const authHeader = {
    headers: {
      Authorization: `Basic ${btoa("instructor:instructor")}`,
    },
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setCourseLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/courses", authHeader);
        const courses = response.data;
        const options = courses.map((course) => ({
          value: course.id,
          label: course.title,
        }));
        setCourseOptions(options);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses. Please try again later.");
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    const courseMaterial = {
      fileName,
      fileUrl,
      courseId: selectedCourse,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/files", courseMaterial, authHeader);
      alert("Course material added successfully!");
      setFileName("");
      setFileUrl("");
      setSelectedCourse(""); // Reset to an empty string after submission
    } catch (error) {
      console.error("Error adding course material:", error);
      alert("Failed to add course material. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Course Material
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Course
        </Typography>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Course"
            disabled={courseLoading}
          >
            {courseLoading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              courseOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}> {/* Use the course id as value */}
                  {option.label}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Course Material"}
        </Button>
      </Box>
    </div>
  );
}
