import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// User dashboard
import UserDashboard from "./pages/dashboard/UserDashboard";
import Profile from "./pages/dashboard/sections/Profile";
import Episodes from "./pages/dashboard/sections/Episodes";
import Subscriptions from "./pages/dashboard/sections/Subscriptions";
import Comments from "./pages/dashboard/sections/Comments";

// Creator dashboard
import CreatorDashboard from "./pages/dashboard/CreatorDashboard";
import CreatorProfile from "./pages/dashboard/creator/Profile";
import CreatorEpisodes from "./pages/dashboard/creator/Episodes";
import CreatorComments from "./pages/dashboard/creator/Comments";
import CreatorSubscribers from "./pages/dashboard/creator/Subscribers";
import CreatorSubscriptionLinks from "./pages/dashboard/creator/SubscriptionLinks";

// Admin dashboard
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminHome from "./pages/dashboard/admin/Dashboard";
import AdminUsers from "./pages/dashboard/admin/Users";
import AdminEpisodes from "./pages/dashboard/admin/Episodes";
import AdminComments from "./pages/dashboard/admin/Comments";
import AdminSettings from "./pages/dashboard/admin/Settings";
import Home from "./pages/dashboard/creator/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-grow">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* ✅ User routes */}
          <Route element={<PrivateRoute role="user" />}>
            <Route path="/dashboard/user" element={<UserDashboard />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="episodes" element={<Episodes />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>

          {/* ✅ Creator routes */}
          <Route element={<PrivateRoute role="creator" />}>
            <Route path="/dashboard/creator" element={<CreatorDashboard />}>
              <Route index element={<CreatorProfile />} />
              <Route path="home" element={<Home/>} />
              <Route path="profile" element={<CreatorProfile />} />
              <Route path="episodes" element={<CreatorEpisodes />} />
              <Route path="comments" element={<CreatorComments />} />
              <Route path="subscribers" element={<CreatorSubscribers />} />
              <Route path="subscription-links" element={<CreatorSubscriptionLinks />} />
            </Route>
          </Route>

          {/* ✅ Admin routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="episodes" element={<AdminEpisodes />} />
              <Route path="comments" element={<AdminComments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    
    </div>
  );
}

export default App;
