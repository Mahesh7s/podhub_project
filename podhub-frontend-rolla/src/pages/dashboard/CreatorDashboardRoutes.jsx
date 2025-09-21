import { Routes, Route, Navigate } from "react-router-dom";
import CreatorProfile from "./creator/Profile";
import CreatorEpisodes from "./creator/Episodes";
import CreatorComments from "./creator/Comments";
import CreatorSubscribers from "./creator/Subscribers";
import CreatorSubscriptionLinks from "./creator/SubscriptionLinks";
import CreatorDashboard from "./CreatorDashboard";
import Home from "./creator/Home";


function CreatorDashboardRoutes() {
  return (
    <Routes>
      <Route element={<CreatorDashboard />}>
        <Route path="profile" element={<CreatorProfile />} />
        <Route path="home" element={<Home/>} />
        <Route path="episodes" element={<CreatorEpisodes />} />
        <Route path="comments" element={<CreatorComments />} />
        <Route path="subscribers" element={<CreatorSubscribers />} />
        <Route path="subscription-links" element={<CreatorSubscriptionLinks />} />

        {/* Default redirect */}
        <Route index element={<Navigate to="profile" replace />} />
      </Route>
    </Routes>
  );
}

export default CreatorDashboardRoutes;
