import api from "./api";

const addComment = async (episodeId, text) => {
  const res = await api.post("/comments", { episodeId, text });
  return res.data;
};

const getComments = async (episodeId) => {
  const res = await api.get(`/comments/${episodeId}`);
  return res.data;
};

const getUserComments = async () => {
  const res = await api.get("/comments/user/me");
  return res.data;
};

const getCreatorEpisodeComments = async () => {
  const res = await api.get("/comments/creator/all");
  return res.data;
};

const replyComment = async (commentId, text) => {
  const res = await api.post(`/comments/reply/${commentId}`, { text });
  return res.data;
};

const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};

const deleteReply = async (commentId, replyId) => {
  if (!commentId || !replyId) throw new Error("Comment ID and Reply ID are required");
  const res = await api.delete(`/comments/${commentId}/reply/${replyId}`);
  return res.data;
};

const getAllCommentsAdmin = async () => {
  const res = await api.get("/comments/admin/all");
  return res.data;
};

export default {
  addComment,
  getComments,
  getUserComments,
  getCreatorEpisodeComments,
  replyComment,
  deleteComment,
  deleteReply,
  getAllCommentsAdmin,
};
