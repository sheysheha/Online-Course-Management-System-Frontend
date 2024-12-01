import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import AboutPage from './pages/About';
import FeedbackPage from './pages/Feedback';
import TasksPage from './pages/Tasks';
import SettingsPage from './pages/Settings';
import AddCourses from './pages/AddCourses';
import CoursesPage from './pages/Courses';
import InstructorDashboard from './pages/InstructorDashboard';
import RegisterStudents from './pages/RegisterStudents';
import AddCourseMaterial from './pages/AddCourseMaterial';

// Utility function to get token and decode JWT
const getTokenData = () => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;

  try {
    // Decode the token (basic implementation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // Contains { sub, role, iat, exp }
  } catch {
    return null;
  }
};

// Wrapper for protected routes
const ProtectedRoute = ({ children, roleRequired }) => {
  const tokenData = getTokenData();

  // If no valid JWT, redirect to sign-in
  if (!tokenData) return <Navigate to="/sign-in" replace />;

  // If a specific role is required, check the role
  if (roleRequired && !tokenData.role) return <Navigate to="/sign-in" replace />;

  return children;
};

// Wrapper for guest-only routes
const GuestRoute = ({ children }) => {
  const tokenData = getTokenData();

  // If already logged in, redirect to dashboard
  if (tokenData) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest-Only Routes */}
        <Route
          path="/"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          
        </Route>
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute roleRequired={true}>
               <SignUp/>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/instructor-dashboard/*"
          element={
            <ProtectedRoute roleRequired={true}>
              <InstructorDashboard />
              <Route path="register-student" element={<RegisterStudents />} />
              <Route path="add-courses" element={<AddCourses/>} />
              <Route path="add-course-material" element={<AddCourseMaterial/>} />
            </ProtectedRoute>
          }
        >
          
        
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="add-courses" element={<AddCourses />} />
          
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
