// src/pages/dashboard/sections/Profile.jsx
// src/pages/dashboard/sections/Profile.jsx
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/auth.service";

export default function CreatorProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This hook will now run whenever the component mounts
    // and correctly fetches the user data from localStorage
    const currentUser = getCurrentUser();
    console.log("User from Creator Profile:", currentUser); // ✅ This will show the updated data
    setUser(currentUser || null);
  }, []); // The empty array makes it run only once on mount

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import analyticsService from "../../../services/analytics.service";

// function CreatorProfile() {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadAnalytics = async () => {
//       setLoading(true);
//       try {
//         const data = await analyticsService.getCreatorAnalytics();
//         setAnalytics(data);
//       } catch {
//         setAnalytics(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadAnalytics();
//   }, []);

//   return (
//     <div className="mb-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-xl shadow">
//       <h3 className="font-semibold mb-2">Analytics</h3>
//       {loading ? (
//         <p>Loading analytics...</p>
//       ) : analytics ? (
//         <>
//           <p>Total Episodes: {analytics.totalEpisodes || 0}</p>
//           <p>Total Plays: {analytics.totalPlays || 0}</p>
//           <p>Total Downloads: {analytics.totalDownloads || 0}</p>
//           <p>Total Comments: {analytics.commentsCount || 0}</p>
//           <p>Total Subscribers: {analytics.subscriptionsCount || 0}</p>
//         </>
//       ) : (
//         <p>No analytics available</p>
//       )}
//     </div>
//   );
// }

// export default CreatorProfile;
