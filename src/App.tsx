import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CommunityPage from './pages/CommunityPage';
import WorkspaceRouter from './pages/WorkspaceRouter';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AIAssessment from './pages/AIAssessment';
import OJAssessment from './pages/OJAssessment';
import ProjectAssessment from './pages/ProjectAssessment';
import InterviewAssessment from './pages/InterviewAssessment';
import AssessmentStart from './pages/AssessmentStart';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { CartProvider } from './contexts/CartContext';

// Layout Component types
type AppLayoutProps = {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
};

// Layout Component with conditional navbar/footer
const AppLayout = ({ isLoggedIn, handleLogin, handleLogout }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hiddenNavbarPaths = ["/community", "/workspace", "/login", "/register"];
  const shouldShowNavbar = !hiddenNavbarPaths.some(path => location.pathname.startsWith(path));
  const shouldShowFooter = shouldShowNavbar; // 同样的逻辑应用于页脚
  
  // 检查登录状态，如果用户访问需要登录的页面但未登录，重定向到登录页面
  useEffect(() => {
    const protectedPaths = ["/workspace", "/cart", "/checkout", "/orders"];
    const isProtectedRoute = protectedPaths.some(path => location.pathname.startsWith(path));
    
    if (isProtectedRoute && !isLoggedIn) {
      navigate("/login");
    }
  }, [location.pathname, isLoggedIn, navigate]);

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/ai-assessment" element={<AIAssessment />} />
          <Route path="/ai-assessment/oj" element={<OJAssessment />} />
          <Route path="/ai-assessment/project" element={<ProjectAssessment />} />
          <Route path="/ai-assessment/interview" element={<InterviewAssessment />} />
          <Route path="/ai-assessment/start" element={<AssessmentStart />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  // 从本地存储中检查登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).isLoggedIn : false;
  });

  // 处理登录
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // 处理登出
  const handleLogout = () => {
    // 清除本地存储中的用户数据
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <AppLayout isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      </Router>
    </CartProvider>
  );
}

export default App;
