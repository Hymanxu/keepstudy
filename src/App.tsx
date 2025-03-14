import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CommunityPage from './pages/CommunityPage';
import WorkspaceRouter from './pages/WorkspaceRouter';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Layout Component types
type AppLayoutProps = {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
};

// Layout Component with conditional navbar/footer
const AppLayout = ({ isLoggedIn, handleLogin, handleLogout }: AppLayoutProps) => {
  const location = useLocation();
  const hiddenNavbarPaths = ["/community", "/workspace", "/login", "/register"];
  const shouldShowNavbar = !hiddenNavbarPaths.some(path => location.pathname.startsWith(path));
  const shouldShowFooter = shouldShowNavbar; // 同样的逻辑应用于页脚

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/workspace/*" element={<WorkspaceRouter />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  // State to manage user authentication (simplified for prototype)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login/logout functions
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
