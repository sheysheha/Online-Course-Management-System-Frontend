import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import

// Hook to determine user role
function useUserRole() {
  const token = localStorage.getItem('jwt');
  const [isInstructor, setIsInstructor] = React.useState(false);

  React.useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Log decoded token for debugging
        if (decodedToken.role !== undefined) {
          setIsInstructor(decodedToken.role); // Set role as boolean (true/false)
        } else {
          console.error('Role not found in token');
          setIsInstructor(false); // Default to non-instructor
        }
      } catch (error) {
        console.error("Error decoding JWT.", error);
        setIsInstructor(false); // Default to non-instructor on error
      }
    } else {
      console.log('No token found, defaulting to non-instructor');
      setIsInstructor(false); // Default to non-instructor
    }
  }, [token]);

  return isInstructor;
}

// Main menu items
const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/dashboard' },
  { text: 'Courses', icon: <PeopleRoundedIcon />, route: '/dashboard/courses' },
  { text: 'Add Courses', icon: <PeopleRoundedIcon />, route: '/instructor-dashboard/add-courses' },
  { text: 'Register Student', icon: <PeopleRoundedIcon />, route: '/instructor-dashboard/register-students' },
  { text: 'Add Course Material', icon: <AssignmentRoundedIcon />, route: '/instructor-dashboard/add-course-material' },
];

// Secondary menu items (visible to all users)
const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, route: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, route: '/dashboard/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const isInstructor = useUserRole();
  

  // Filter menu items based on role
  const excludedItems = ['Add Courses', 'Register Student', 'Add Course Material'];
  const filteredMainListItems = isInstructor
    ? mainListItems // Show all items for instructors
    : mainListItems.filter(item => !excludedItems.includes(item.text)); // Filter out specific items for non-instructors

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List */}
      <List dense>
        {filteredMainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => navigate(item.route)} aria-label={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary List */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => navigate(item.route)} aria-label={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}