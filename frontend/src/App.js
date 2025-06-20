import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "./pages/landing-page-navbar/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import PreInterviewForm from "./pages/interview-practice/PreInterviewForm";
import StartInterview from "./pages/interview-practice/StartInterview";
import ResumeScreening from "./pages/ResumeScreening";
import PastInterviews from "./pages/PastInterviews";
import Contact from "./pages/landing-page-navbar/Contact";
import AboutPage from "./pages/landing-page-navbar/AboutPage";
import ResumeInfo from "./pages/landing-page-navbar/services/ResumeInfo";
import MockInterviewInfo from "./pages/landing-page-navbar/services/MockInterviewInfo";
import SummaryPage from './pages/interview-practice/SummaryPage';
import EditProfile from "./pages/EditProfile";
import HelpPage from "./pages/HelpPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AppWrapper() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  // Enable theme from localStorage or default to light
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update HTML class and localStorage when theme changes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const showNavbarRoutes = [
    "/",
    "/login",
    "/register",
    "/contact",
    "/about",
    "/services",
    "/resume-info",
    "/mock-interview-info",
  ];
  const showNavbar = showNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar toggleTheme={toggleTheme} currentTheme={theme} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pre-interview" element={<PreInterviewForm />} />
        <Route path="/start-interview" element={<StartInterview />} />
        <Route path="/resume-screening" element={<ResumeScreening />} />
        <Route path="/past-interviews" element={<PastInterviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume-info" element={<ResumeInfo />} />
        <Route path="/mock-interview-info" element={<MockInterviewInfo />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/help" element={<HelpPage />} />
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
