import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import episodeService from "../../../services/episode.service";
import commentService from "../../../services/comment.service";

function CreatorEpisodes() {
  const { register, handleSubmit, reset } = useForm();
  const [episodes, setEpisodes] = useState([]);
  const [comments, setComments] = useState({});
  const [replyByComment, setReplyByComment] = useState({});
  const [loading, setLoading] = useState(true);

  const loadEpisodes = async () => {
    setLoading(true);
    try {
      const data = await episodeService.getMyEpisodes();
      setEpisodes(data);
      data.forEach((ep) => loadComments(ep._id));
    } catch {
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (episodeId) => {
    try {
      const data = await commentService.getComments(episodeId);
      setComments((prev) => ({ ...prev, [episodeId]: data }));
    } catch {}
  };

  useEffect(() => {
    loadEpisodes();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("audio", formData.audio[0]);
      await episodeService.uploadEpisode(data);
      toast.success("Episode uploaded successfully!");
      reset();
      loadEpisodes();
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await episodeService.deleteEpisode(id);
      toast.success("Episode deleted");
      loadEpisodes();
    } catch {
      toast.error("Delete failed");
    }
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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Upload Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6"
      >
        <input
          type="text"
          placeholder="Episode Title"
          {...register("title", { required: true })}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Episode Description"
          {...register("description")}
          className="w-full border rounded p-2"
        />
        <div>
          <input
            type="file"
            accept="audio/*"
            {...register("audio", { required: true })}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-400 bg-brand text-black font-medium hover:bg-gray-100 transition"
        >
          Upload Episode
        </button>
      </form>

      {/* Episode List */}
      <h3 className="text-lg font-semibold mb-2">My Episodes</h3>
      {loading ? (
        <p>Loading episodes...</p>
      ) : episodes.length === 0 ? (
        <p>No episodes yet</p>
      ) : (
        <ul className="space-y-3">
          {episodes.map((ep) => (
            <li
              key={ep._id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-bold">{ep.title}</h4>
                  <p className="text-sm">{ep.description}</p>
                  <audio controls src={ep.audioUrl} className="mt-2 w-full sm:w-64" />
                </div>
                <button
                  onClick={() => handleDelete(ep._id)}
                  className="px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg border border-red-600 hover:bg-red-600 transition self-start"
                >
                  Delete
                </button>
              </div>

              {/* Comments */}
              <div className="mt-3">
                <h4 className="font-semibold">Comments</h4>
                <ul className="space-y-2 mt-2">
                  {(comments[ep._id] || []).map((c) => (
                    <li
                      key={c._id}
                      className="bg-gray-200 dark:bg-gray-600 p-2 rounded"
                    >
                      <p>
                        <span className="font-bold">{c.user?.name}:</span>{" "}
                        {c.text}
                      </p>
                      {/* Replies */}
                      {c.replies?.length > 0 && (
                        <ul className="ml-4 mt-1 text-xs space-y-1">
                          {c.replies.map((r, i) => (
                            <li key={i}>
                              <span className="font-semibold">{r.user?.name}:</span>{" "}
                              {r.text}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Reply Box */}
                      <div className="flex mt-2">
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
                          className="flex-grow border rounded-l px-2 py-1"
                        />
                        <button
                          onClick={() => handleReply(c._id, ep._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-r hover:bg-green-600"
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

export default CreatorEpisodes;
