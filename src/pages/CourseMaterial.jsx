import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get route params
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

function CourseMaterials() {
  const { courseId } = useParams();  // Get courseId from the URL
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/files?courseId=${courseId}`);
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching course materials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', paddingTop: '2rem' }} />;
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Course Materials for Course ID: {courseId}
      </Typography>
      <Card sx={{ padding: '1rem' }}>
        <CardContent>
          {materials.length > 0 ? (
            <List>
              {materials.map((material) => (
                <ListItem key={material.id}>
                  <ListItemText primary={material.title} secondary={material.description} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No materials available for this course.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default CourseMaterials;
