// src/pages/dashboard/sections/Profile.jsx
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/auth.service";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser || null);
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
