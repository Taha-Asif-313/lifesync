import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import ProtectedLayout from "./layouts/ProtectedLayout";
import SiteLayout from "./layouts/SiteLayout";

// Pages
import LandingPage from "./pages/site/LandingPage";
import TasksPage from "./pages/site/TasksPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProfilePage from "./pages/auth/ProfilePage";
import { ReactSignedIn, setSdkConfig } from "@neuctra/authix";
import PrivacyPage from "./pages/site/PrivacyPage";
import TermsPage from "./pages/site/TermsPage";
import AboutPage from "./pages/site/AboutPage";
import ContactPage from "./pages/site/ContactPage";

const App = () => {
  setSdkConfig({
    baseUrl: import.meta.env.VITE_AUTHIX_BASE_URL,
    apiKey: import.meta.env.VITE_AUTHIX_API_KEY,
    appId: import.meta.env.VITE_AUTHIX_APP_ID,
  });
  return (
    <Router>
      {/* Global Background + Toaster */}
      <div className="min-h-screen w-full bg-linear-to-b from-zinc-950 via-black to-zinc-900 text-white">
        <Routes>
          {/* 🏠 Public / Site Layout */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* 🔐 Auth Layout */}
          <Route
            element={
              <ReactSignedIn
                fallback={<Navigate to={"/"} />}
                width={"100%"}
                height={"100%"}
              >
                <ProtectedLayout />
              </ReactSignedIn>
            }
          >
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        <Toaster containerClassName="!text-sm" position="top-right" />
      </div>
    </Router>
  );
};

export default App;
