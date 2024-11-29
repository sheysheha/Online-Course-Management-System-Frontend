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

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/dashboard' },
  { text: 'Courses', icon: <AnalyticsRoundedIcon />, route: '/dashboard/courses' },
  { text: 'Class Details', icon: <PeopleRoundedIcon />, route: '/dashboard/class-details' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, route: '/dashboard/tasks' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, route: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, route: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, route: '/dashboard/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => navigate(item.route)}> {/* Navigate on click */}
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
            <ListItemButton onClick={() => navigate(item.route)}> {/* Navigate on click */}
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
