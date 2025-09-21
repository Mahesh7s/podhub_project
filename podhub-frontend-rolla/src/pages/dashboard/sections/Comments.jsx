import { useEffect, useState } from "react";
import commentService from "../../../services/comment.service";
import { toast } from "react-toastify";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    try {
      const data = await commentService.getUserComments();
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments:", err);
      toast.error("Failed to load your comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center sm:text-left">
        💬 My Comments
      </h2>

      {/* Loading / Empty States */}
      {loading ? (
        <p className="text-gray-500 text-center sm:text-left">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic text-center sm:text-left">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => {
            const date = c.createdAt
              ? new Date(c.createdAt).toLocaleString()
              : "Unknown time";

            return (
              <div
                key={c._id}
                className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                {/* Avatar */}
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold text-lg">
                  {c.user?.name ? c.user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Comment Content */}
                <div className="flex-1 w-full">
                  <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base break-words">
                    <span className="font-semibold">
                      {c.user?.name || "User"}
                    </span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {c.text}
                    </span>
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1 sm:gap-2">
                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                      🎬 Episode: {c.episode?.title || "Unknown"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 italic">
                      ⏱ {date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
