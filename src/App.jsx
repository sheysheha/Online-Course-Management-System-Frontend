import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { jwtDecode } from 'jwt-decode';

// Pages
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
import CourseMaterials from './pages/CourseMaterial';

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest-Only Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}

        {/* Protected Routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="course-materials" element={<CourseMaterials />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

        <Route path="/instructor-dashboard/*" element={<InstructorDashboard />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="add-courses" element={<AddCourses />} />
          <Route path="add-course-material" element={<AddCourseMaterial />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="register-students" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
