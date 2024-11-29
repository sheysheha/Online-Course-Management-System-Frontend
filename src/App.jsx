import { useState } from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import AboutPage from './pages/About'
import FeedbackPage from './pages/Feedback'
import TasksPage from './pages/Tasks'
import SettingsPage from './pages/Settings';
import ClassDetailsPage from './pages/ClassDetails'
import CoursesPage from './pages/Courses';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="class-details" element={<ClassDetailsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
