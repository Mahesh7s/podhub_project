// src/pages/dashboard/sections/Subscriptions.jsx
import { useEffect, useState } from "react";
import subscriptionService from "../../../services/subscription.service";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await subscriptionService.getCreatorSubscriptions();
        setSubscriptions(data);
      } catch (err) {
        console.error("Failed to load subscriptions:", err);
        setError("Failed to load subscriptions");
      }
    };
    fetchSubscriptions();
  }, []);

  if (error)
    return <div className="text-red-500 font-medium">{error}</div>;
  if (!subscriptions.length)
    return (
      <div className="text-gray-500 italic">
        No subscriptions yet
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Subscription Creators</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub._id}
            className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
          >
            {/* Creator Avatar */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-lg">
                {sub.creator?.name
                  ? sub.creator.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {sub.creator?.name || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500">
                  {sub.creator?.email || "No email"}
                </p>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium">Plan:</span>{" "}
                {sub.plan?.name || "Free"}
              </p>
              <p>
                <span className="font-medium">Price:</span>{" "}
                ₹{sub.plan?.price || "0"}
              </p>
              <p>
                <span className="font-medium">Subscribed on:</span>{" "}
                {new Date(sub.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
