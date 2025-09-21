import { useEffect, useState } from "react";
import subscriptionService from "../../../services/subscription.service";

export default function CreatorSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await subscriptionService.getCreatorSubscribers();
        setSubscribers(data);
      } catch (error) {
        console.error("Error fetching subscribers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading) return <p className="text-gray-500">Loading subscribers...</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="font-semibold text-lg mb-4">Subscribers</h3>
      {subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {subscribers.map((sub) => (
            <li key={sub._id} className="flex items-center gap-3 py-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                {sub.listener?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-medium text-gray-800">{sub.listener?.name}</p>
                <p className="text-sm text-gray-500">{sub.listener?.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
