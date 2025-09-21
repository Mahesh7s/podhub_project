import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import subscriptionLinkService from "../../../services/subscriptionLink.service";

function CreatorSubscriptionLinks() {
  const [linkDiscount, setLinkDiscount] = useState("");
  const [linkExpiry, setLinkExpiry] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLinks = async () => {
    setLoading(true);
    try {
      const data = await subscriptionLinkService.getLinks();
      setLinks(data || []);
    } catch {
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleGenerateLink = async () => {
    if (!linkDiscount) return toast.error("Enter discount value");
    try {
      const data = await subscriptionLinkService.generateLink(
        Number(linkDiscount),
        linkExpiry ? Number(linkExpiry) : null
      );
      toast.success("Link generated");
      setLinks((prev) => [...prev, data]);
      setLinkDiscount("");
      setLinkExpiry("");
    } catch {
      toast.error("Failed to generate link");
    }
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h3 className="font-semibold mb-4 text-lg sm:text-xl text-gray-800 dark:text-gray-100">
        🔗 Generate Subscription Link
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-4">
        <input
          type="number"
          placeholder="Discount %"
          value={linkDiscount}
          onChange={(e) => setLinkDiscount(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Expires in hours (optional)"
          value={linkExpiry}
          onChange={(e) => setLinkExpiry(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleGenerateLink}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded border border-blue-600 transition w-full sm:w-auto"
        >
          Generate
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading links...</p>
      ) : links.length === 0 ? (
        <p className="text-gray-500">No active links</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map((l, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow flex flex-col justify-between"
            >
              <span className="text-sm sm:text-base break-words text-gray-800 dark:text-gray-100">
                {l.link || l.code} - {l.discount}%{" "}
                {l.expiresAt
                  ? `(Expires: ${new Date(l.expiresAt).toLocaleString()})`
                  : ""}
              </span>
              <span
                className={`mt-2 font-medium text-sm ${
                  l.redeemed
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {l.redeemed ? "Redeemed" : "Active"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CreatorSubscriptionLinks;
