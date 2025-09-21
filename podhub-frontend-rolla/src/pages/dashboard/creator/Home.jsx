import { useEffect, useState } from "react";
import episodeService from "../../../services/episode.service";
import commentService from "../../../services/comment.service";
import subscriptionService from "../../../services/subscription.service";
import { toast } from "react-toastify";

export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [comments, setComments] = useState({});
  const [replyByComment, setReplyByComment] = useState({});
  const [subscribedCreators, setSubscribedCreators] = useState(new Set());

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const data = await episodeService.getFeedEpisodes();
        setEpisodes(data);
        data.forEach((ep) => loadComments(ep._id));

        const mySubs = await subscriptionService.getCreatorSubscriptions();
        setSubscribedCreators(new Set(mySubs.map((s) => s.creator._id)));
      } catch {
        setEpisodes([]);
      }
    };
    loadEpisodes();
  }, []);

  const loadComments = async (episodeId) => {
    try {
      const data = await commentService.getComments(episodeId);
      setComments((prev) => ({ ...prev, [episodeId]: data }));
    } catch {}
  };

  const handleReply = async (commentId, episodeId) => {
    const text = (replyByComment[commentId] || "").trim();
    if (!text) return toast.error("Enter a reply");
    try {
      await commentService.replyComment(commentId, text);
      toast.success("Reply added");
      setReplyByComment((prev) => ({ ...prev, [commentId]: "" }));
      loadComments(episodeId);
    } catch {
      toast.error("Failed to reply");
    }
  };

  const toggleSubscribe = async (creatorId) => {
    if (subscribedCreators.has(creatorId)) {
      try {
        await subscriptionService.unsubscribeFromCreator(creatorId);
        toast.info("Unsubscribed");
        setSubscribedCreators((prev) => {
          const newSet = new Set(prev);
          newSet.delete(creatorId);
          return newSet;
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Unsubscribe failed");
      }
    } else {
      try {
        await subscriptionService.subscribeToCreator(creatorId);
        toast.success("Subscribed successfully");
        setSubscribedCreators((prev) => new Set(prev).add(creatorId));
      } catch (err) {
        toast.error(err.response?.data?.message || "Subscription failed");
      }
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center sm:text-left">
        🎧 All Episodes
      </h3>

      {episodes.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">
          No episodes available
        </p>
      ) : (
        <ul className="space-y-6">
          {episodes.map((ep) => (
            <li
              key={ep._id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
            >
              {/* Episode Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                    {ep.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    By {ep.creator?.name}
                  </p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {ep.description}
                  </p>
                  <audio
                    controls
                    src={ep.audioUrl}
                    className="mt-2 w-full sm:w-72 rounded"
                  />
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => toggleSubscribe(ep.creator._id)}
                  className={`px-3 py-2 text-sm rounded-lg shadow transition-colors w-full sm:w-auto 
                    ${
                      subscribedCreators.has(ep.creator._id)
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    }`}
                >
                  {subscribedCreators.has(ep.creator._id)
                    ? "Unsubscribe"
                    : "Subscribe"}
                </button>
              </div>

              {/* Comments */}
              <div className="mt-5">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                  💬 Comments
                </h4>
                <ul className="space-y-3 mt-2">
                  {(comments[ep._id] || []).map((c) => (
                    <li
                      key={c._id}
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-100">
                        <span className="font-bold">{c.user?.name}:</span>{" "}
                        {c.text}
                      </p>

                      {c.replies?.length > 0 && (
                        <ul className="ml-4 mt-2 text-xs space-y-1">
                          {c.replies.map((r, i) => (
                            <li key={i}>
                              <span className="font-semibold">
                                {r.user?.name}:
                              </span>{" "}
                              {r.text}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Reply Box */}
                      <div className="flex flex-col sm:flex-row mt-2 gap-2">
                        <input
                          type="text"
                          value={replyByComment[c._id] || ""}
                          onChange={(e) =>
                            setReplyByComment((prev) => ({
                              ...prev,
                              [c._id]: e.target.value,
                            }))
                          }
                          placeholder="Write a reply..."
                          className="flex-grow border rounded-lg px-3 py-2 text-sm w-full"
                        />
                        <button
                          onClick={() => handleReply(c._id, ep._id)}
                          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg w-full sm:w-auto"
                        >
                          Reply
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
