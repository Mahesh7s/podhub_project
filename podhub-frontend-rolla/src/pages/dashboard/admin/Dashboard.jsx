// src/pages/admin/AdminHome.jsx
import { useEffect, useState } from "react";
import analyticsService from "../../../services/analytics.service";

export default function AdminHome() {
  const [allAnalytics, setAllAnalytics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await analyticsService.getAllUsersAnalytics();
      setAllAnalytics(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allAnalytics.map((user) => (
          <div
            key={user.userId}
            className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-3">{user.email}</p>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div className="bg-blue-50 p-2 rounded text-center">
                <p className="text-sm">Episodes</p>
                <p className="font-bold text-lg">{user.totalEpisodes}</p>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <p className="text-sm">Plays</p>
                <p className="font-bold text-lg">{user.totalPlays}</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center">
                <p className="text-sm">Downloads</p>
                <p className="font-bold text-lg">{user.totalDownloads}</p>
              </div>
              <div className="bg-purple-50 p-2 rounded text-center">
                <p className="text-sm">Comments</p>
                <p className="font-bold text-lg">{user.commentsCount}</p>
              </div>
              <div className="bg-pink-50 p-2 rounded text-center col-span-2">
                <p className="text-sm">Subscriptions</p>
                <p className="font-bold text-lg">{user.subscriptionsCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
