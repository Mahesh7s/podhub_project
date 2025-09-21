import { useEffect, useState } from "react";
import commentService from "../../../services/comment.service";
import { toast } from "react-toastify";

export default function CreatorComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await commentService.getCreatorEpisodeComments();
      setComments(data);
    } catch {
      toast.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId) => {
    if (!replyText.trim()) {
      toast.warning("Reply cannot be empty");
      return;
    }
    try {
      await commentService.replyComment(commentId, replyText);
      toast.success("Reply added");
      setReplyText("");
      setReplyingTo(null);
      loadComments();
    } catch {
      toast.error("Failed to add reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await commentService.deleteComment(commentId);
      toast.success("Comment deleted");
      loadComments();
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      await commentService.deleteReply(commentId, replyId);
      toast.success("Reply deleted");
      loadComments();
    } catch {
      toast.error("Failed to delete reply");
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  if (loading) return <p className="text-gray-500">Loading comments...</p>;
  if (!comments.length) return <p className="text-gray-500">No comments yet on your episodes.</p>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">💬 All Comments on Your Episodes</h3>
      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">
                  <span className="font-bold">{c.user?.name || "Unknown"}</span> on{" "}
                  <span className="italic">{c.episode?.title || "Unknown Episode"}</span>
                </p>
                <p className="mt-1">{c.text}</p>

                {c.replies?.length > 0 && (
                  <ul className="mt-2 ml-4 text-xs space-y-1">
                    {c.replies.map((r) => (
                      <li key={r._id} className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>
                          <span className="font-semibold">{r.user?.name}:</span> {r.text}
                        </span>
                        <button
                          onClick={() => handleDeleteReply(c._id, r._id)}
                          className="text-red-500 text-xs hover:underline ml-2"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => handleDeleteComment(c._id)}
                className="text-red-500 text-xs hover:underline ml-2"
              >
                Delete
              </button>
            </div>

            {replyingTo === c._id ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                />
                <button
                  onClick={() => handleReply(c._id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                  }}
                  className="px-3 py-1 text-sm bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(c._id)}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                Reply
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
