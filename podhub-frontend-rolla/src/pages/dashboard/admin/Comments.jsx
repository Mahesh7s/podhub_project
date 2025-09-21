// src/pages/admin/AdminComments.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete, Reply, Search } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commentService from "../../../services/comment.service";
import authService from "../../../services/auth.service";

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    type: "",
    commentId: null,
    replyId: null,
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const loadComments = async () => {
    setLoading(true);
    try {
      const data = await commentService.getAllCommentsAdmin();
      setComments(data || []);
      setFilteredComments(data || []);
    } catch (error) {
      console.error("Error loading comments:", error);
      toast.error("Failed to load comments");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredComments(comments);
    } else {
      const term = search.toLowerCase();
      setFilteredComments(
        comments.filter(
          (c) =>
            c.user?.name?.toLowerCase().includes(term) ||
            c.episode?.title?.toLowerCase().includes(term) ||
            c.text?.toLowerCase().includes(term)
        )
      );
    }
  }, [search, comments]);

  const openDeleteDialog = ({ type, commentId, replyId = null }) => {
    setDeleteDialog({ open: true, type, commentId, replyId });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, type: "", commentId: null, replyId: null });
  };

  const confirmDelete = async () => {
    const { type, commentId, replyId } = deleteDialog;
    try {
      if (type === "comment") {
        await commentService.deleteComment(commentId);
        toast.success("Comment deleted successfully");
      } else if (type === "reply") {
        await commentService.deleteReply(commentId, replyId);
        toast.success("Reply deleted successfully");
      }
      closeDeleteDialog();
      loadComments();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Failed to delete");
      closeDeleteDialog();
    }
  };

  const handleReply = async (commentId) => {
    if (!replyText[commentId]) {
      toast.warning("Please enter a reply");
      return;
    }
    try {
      await commentService.replyComment(commentId, replyText[commentId]);
      toast.success("Reply added successfully");
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      loadComments();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Failed to add reply");
    }
  };

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign={{ xs: "center", sm: "left" }}
      >
        Manage Comments
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        textAlign={{ xs: "center", sm: "left" }}
      >
        Admins can review, reply, filter, and delete comments across the platform.
      </Typography>

      {/* Search */}
      <Box mt={2} mb={3} maxWidth={600} mx="auto">
        <TextField
          fullWidth
          placeholder="Search by user, episode, or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : filteredComments.length === 0 ? (
        <Typography textAlign="center">No comments found.</Typography>
      ) : (
        <Box
          display="grid"
          gap={3}
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(auto-fit, minmax(280px, 1fr))",
            md: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
          justifyContent="center"
        >
          {filteredComments.map((c) => (
            <Card
              key={c._id}
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    color="primary"
                    noWrap
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    {c.user?.name || "Unknown User"}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    On Episode: {c.episode?.title || "Unknown"}
                  </Typography>
                }
                action={
                  <IconButton
                    color="error"
                    disabled={currentUser?.role !== "admin"}
                    sx={{ padding: 1 }}
                    onClick={() =>
                      openDeleteDialog({ type: "comment", commentId: c._id })
                    }
                  >
                    <Delete />
                  </IconButton>
                }
              />
              <CardContent sx={{ px: 3, py: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, wordBreak: "break-word" }}
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  {c.text}
                </Typography>

                {/* Replies */}
                {c.replies?.length > 0 && (
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      textAlign={{ xs: "center", sm: "left" }}
                    >
                      Replies:
                    </Typography>
                    {c.replies.map((r) => {
                      const isAdminReply =
                        r.user === currentUser?._id || r.user?.role === "admin";
                      return (
                        <Box
                          key={r._id}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            backgroundColor: isAdminReply
                              ? "primary.main"
                              : "rgba(0,0,0,0.05)",
                            color: isAdminReply ? "white" : "text.primary",
                            p: 1.5,
                            borderRadius: 2,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ wordBreak: "break-word", flex: 1, pr: 1 }}
                            textAlign={{ xs: "center", sm: "left" }}
                          >
                            {r.text}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            disabled={currentUser?.role !== "admin"}
                            sx={{ padding: 0.5 }}
                            onClick={() =>
                              openDeleteDialog({
                                type: "reply",
                                commentId: c._id,
                                replyId: r._id,
                              })
                            }
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      );
                    })}
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Reply input */}
                <Box
                  display="flex"
                  gap={1}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a reply..."
                    value={replyText[c._id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({ ...prev, [c._id]: e.target.value }))
                    }
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Reply />}
                    onClick={() => handleReply(c._id)}
                    disabled={currentUser?.role !== "admin"}
                    sx={{ px: 3 }}
                  >
                    Reply
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this{" "}
            {deleteDialog.type === "comment" ? "comment" : "reply"}? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
