import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, LinearProgress } from '@mui/material';

const courses = [
  { title: "Introduction to TalentLMS", status: "Completed" },
  { title: "Advanced Features of TalentLMS", status: "Completed" },
  { title: "Content and TalentLMS", status: "Completed" },
  { title: "Getting Started With eLearning", status: "Completed" },
  { title: "Employee Training 101", status: "Completed" },
  { title: "SCORM Example Course", status: "0%" },
];

function Home() {


  return (
    <Box sx={{ padding: '2rem' }}>
      {/* Statistics Panel */}
      <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ height: `100px` }}>
            <CardContent>
              <Typography variant="h6" align="center">1</Typography>
              <Typography variant="body2" align="center">Courses available</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ height: `100px` }}>
            <CardContent>
              <Typography variant="h6" align="center">5</Typography>
              <Typography variant="body2" align="center">Joined Courses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ height: `100px` }}>
            <CardContent>
              <Typography variant="h6" align="center">5h 39m</Typography>
              <Typography variant="body2" align="center">Course Materials</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ height: `100px` }}>
            <CardContent>
              <Typography variant="h6" align="center">850</Typography>
              <Typography variant="body2" align="center">Tasks to be done</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Courses */}
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className='bg-blue-400' sx={{ height: `150px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">{course.status}</Typography>
                {course.status === "0%" && (
                  <LinearProgress variant="determinate" value={0} sx={{ marginTop: '1rem' }} />
                )}
                {course.status === "Completed" && (
                  <Button variant="contained" color="success" sx={{ marginTop: '1rem' }}>
                    Join
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
