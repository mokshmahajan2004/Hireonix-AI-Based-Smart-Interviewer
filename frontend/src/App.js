import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import StartInterview from './pages/StartInterview';
import ResumeScreening from './pages/ResumeScreening';
import PastInterviews from './pages/PastInterviews';
import Contact from './pages/Contact';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppWrapper() {
  const location = useLocation();

  // Define all routes where you want to show the navbar and footer
  const showNavbarRoutes = [
    '/',
    '/login',
    '/register',
    '/contact',
    '/about',
    '/services'
  ];
  const showNavbar = showNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-interview" element={<StartInterview />} />
        <Route path="/resume-screening" element={<ResumeScreening />} />
        <Route path="/past-interviews" element={<PastInterviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      {showNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;