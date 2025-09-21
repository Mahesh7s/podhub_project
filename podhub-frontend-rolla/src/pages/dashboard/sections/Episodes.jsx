// src/pages/dashboard/sections/Episodes.jsx
import { useEffect, useState } from "react";
import episodeService from "../../../services/episode.service";
import commentService from "../../../services/comment.service";
import subscriptionService from "../../../services/subscription.service";
import { toast } from "react-toastify";
import { Headphones } from "lucide-react"; // ✅ Headphone icon

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [comments, setComments] = useState({});
  const [newCommentByEp, setNewCommentByEp] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);

  const loadSubscriptions = async () => {
    try {
      const data = await subscriptionService.getCreatorSubscriptions();
      setSubscriptions(data);
    } catch {
      toast.error("Failed to fetch subscriptions");
    }
  };

  const loadComments = async (episodeId) => {
    try {
      const data = await commentService.getComments(episodeId);
      setComments((prev) => ({ ...prev, [episodeId]: data }));
    } catch {
      toast.error("Failed to load comments");
    }
  };

  const loadEpisodes = async () => {
    try {
      const data = await episodeService.getEpisodes();
      setEpisodes(data);
      data.forEach((ep) => loadComments(ep._id));
    } catch (err) {
      console.error("Failed to load episodes:", err);
      toast.error("Failed to load episodes");
    }
  };

  useEffect(() => {
    loadEpisodes();
    loadSubscriptions();
  }, []);

  const handleToggleSubscribe = async (creatorId) => {
    try {
      const subscribed = isSubscribed(creatorId);

      if (subscribed) {
        await subscriptionService.unsubscribeFromCreator(creatorId);
        toast.info("Unsubscribed successfully!");
      } else {
        await subscriptionService.subscribeToCreator(creatorId);
        toast.success("Subscribed successfully!");
      }
      loadSubscriptions();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isSubscribed = (creatorId) =>
    subscriptions.some((s) => s.creator?._id === creatorId);

  const handleAddComment = async (episodeId) => {
    const text = (newCommentByEp[episodeId] || "").trim();
    if (!text) return toast.error("Enter a comment");
    try {
      await commentService.addComment(episodeId, text);
      toast.success("Comment added");
      setNewCommentByEp((prev) => ({ ...prev, [episodeId]: "" }));
      loadComments(episodeId);
    } catch {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 🔊 Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-300">
        <Headphones className="w-8 h-8" />
        My Episodes
      </h2>

      {episodes.map((ep) => (
        <div
          key={ep._id}
          className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl mb-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >
          {/* Title & Creator */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {ep.title}
            </h3>
            <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-200 rounded-full">
              🎙 {ep.creator?.name || "Unknown"}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
            {ep.description}
          </p>

          {/* Audio Player */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow-inner">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
              🎶 Now Playing
            </p>
            <audio
              controls
              src={ep.audioUrl}
              className="w-full rounded-lg shadow-md accent-purple-600"
            />
          </div>

          {/* Subscribe Button */}
          {ep.creator && (
            <div className="mt-6">
              <button
                onClick={() => handleToggleSubscribe(ep.creator._id)}
                className={`px-6 py-2.5 rounded-full font-semibold transition duration-200 shadow-md ${
                  isSubscribed(ep.creator._id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isSubscribed(ep.creator._id)
                  ? "Unsubscribe"
                  : `Subscribe to ${ep.creator.name}`}
              </button>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-7">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">
              💬 Comments
            </h4>
            <ul className="space-y-3">
              {(comments[ep._id] || []).map((c) => (
                <li
                  key={c._id}
                  className="flex items-start gap-3 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
                    {c.user?.name ? c.user.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  {/* Comment content */}
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100">
                      <span className="font-semibold">
                        {c.user?.name || "User"}
                      </span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        {c.text}
                      </span>
                    </p>
                    {c.createdAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        ⏱ {new Date(c.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Add Comment Box */}
            <div className="flex mt-5">
              <input
                type="text"
                value={newCommentByEp[ep._id] || ""}
                onChange={(e) =>
                  setNewCommentByEp((prev) => ({
                    ...prev,
                    [ep._id]: e.target.value,
                  }))
                }
                placeholder="Write a comment..."
                className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => handleAddComment(ep._id)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-r-full shadow-md transition transform hover:scale-105"
              >
                 Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
