import { Route, Routes } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import Profile from "./sections/Profile";
import Episodes from "./sections/Episodes";
import Subscriptions from "./sections/Subscriptions";
import Comments from "./sections/Comments";

export default function UserDashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/user" element={<UserDashboard />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </Routes>
  );
}
