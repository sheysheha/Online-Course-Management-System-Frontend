import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import Select from "react-select";

const AddCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructorOptions, setInstructorOptions] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [loading, setLoading] = useState(false);

  const authHeader = {
    headers: {
      Authorization: `Basic ${btoa("instructor:instructor")}`,
    },
  };

  useEffect(() => {
    // Fetch instructors where role is "Instructor"
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/users",
          authHeader
        );
        const instructors = response.data.filter(
          (user) => user.role === "INSTRUCTOR"
          
        );
        const options = instructors.map((instructor) => ({
          value: instructor.id,
          label: instructor.fullName,
          
        }));
        setInstructorOptions(options);
        console.log(instructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedInstructor) {
      alert("Please select an instructor");
      return;
    }

    const courseData = {
      title,
      description,
      instructorId: selectedInstructor.value,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/courses", courseData, authHeader);
      alert("Course added successfully!");
      setTitle("");
      setDescription("");
      setSelectedInstructor(null);
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Instructor
      </Typography>
      <Select
        options={instructorOptions}
        value={selectedInstructor}
        className="text-black"
        onChange={setSelectedInstructor}
        placeholder="Select an Instructor"
        isSearchable
        styles={{
          option: (provided) => ({
            ...provided,
            color: 'black', // Set font color of the dropdown options
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'black', // Set font color of the selected value
          }),
          placeholder: (provided) => ({
            ...provided,
            color: 'black', // Set font color of the placeholder text
          }),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Add Course"}
      </Button>
    </Box>
  );
};

export default AddCourses;
