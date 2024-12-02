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
  return React.useMemo(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // For debugging, log the decoded token
        return decodedToken.role; // Directly return the boolean role
      } catch (error) {
        console.error("Error decoding JWT. Ensure the token is valid.", error);
      }
    }
    return false; // Default to non-instructor if token is absent or invalid
  }, [token]);
}

// Main menu items
const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/dashboard' },
  { text: 'Courses', icon: <PeopleRoundedIcon />, route: '/dashboard/courses' },
  { text: 'Add Courses', icon: <PeopleRoundedIcon />, route: '/dashboard/add-courses' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, route: '/dashboard/tasks' },
  { text: 'Register Student', icon: <PeopleRoundedIcon/>, route: '/dashboard/registered-students' },
  { text: 'Add Course Material', icon: <AssignmentRoundedIcon />, route: '/dashboard/add-course-material' },

];

// Secondary menu items
const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, route: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, route: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, route: '/dashboard/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate(); // Initialize navigation
  const isInstructor = useUserRole(); // Get the user's role (boolean)

  // Filter main list items based on the role
  const excludedItems = ['Add Courses', 'Register Student', 'Add Course Material'];

  const filteredMainListItems = isInstructor
    ? mainListItems
    : mainListItems.filter(item => !excludedItems.includes(item.text));

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List */}
      <List dense>
        {filteredMainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.route)}
              aria-label={item.text} // Accessibility
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary List (Visible to all users) */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.route)}
              aria-label={item.text} // Accessibility
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
