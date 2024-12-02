import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';  // For navigation

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Typography variant="h6" sx={{ textAlign: 'center', padding: '2rem' }}>Loading courses...</Typography>;
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ height: '175px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                  {course.description}
                </Typography>

                
                {/* Button to navigate to Course Materials */}
                <Link to={`/dashboard/course-materials/${course.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" sx={{ marginTop: '1rem' }}>
                    View Materials
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Courses;
