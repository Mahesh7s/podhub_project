import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import userService from "../../../services/user.service";
import loyaltyService from "../../../services/loyalty.service";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // small screens
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // medium screens

  const loadUsers = async () => {
    const data = await userService.getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await userService.deleteUser(id);
    loadUsers();
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    await userService.updateUser(selectedUser._id, selectedUser);
    setOpen(false);
    loadUsers();
  };

  const handleUpdatePoints = async (id) => {
    const value = points[id] || 0;
    if (value === 0) return;
    await loyaltyService.updatePoints(id, value);
    setPoints((prev) => ({ ...prev, [id]: 0 }));
    loadUsers();
  };

  return (
    <Box p={2}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, textAlign: "center" }}
      >
        Manage Users
      </Typography>

      {isMobile ? (
        // Mobile Card View
        <Box display="flex" flexDirection="column" gap={2}>
          {users.map((u) => (
            <Card key={u._id} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <Typography variant="h6" fontWeight="bold">{u.name}</Typography>
                <Typography variant="body2" color="textSecondary">{u.email}</Typography>
                <Typography variant="body2">Role: {u.role}</Typography>
                <Typography variant="body2">Points: {u.loyalty?.points || 0}</Typography>
                <Typography variant="body2">Tier: {u.loyalty?.tier || "Bronze"}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", flexWrap: "wrap", gap: 1, p: 2 }}>
                {/* First Row */}
                <Box display="flex" gap={1} width="100%">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      flex: 1,
                      height: 42,
                      bgcolor: "#1565c0",
                      color: "#fff",
                      "&:hover": { bgcolor: "#0d47a1" },
                      borderRadius: 1,
                    }}
                    onClick={() => { setSelectedUser(u); setOpen(true); }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      flex: 1,
                      height: 42,
                      bgcolor: "#c62828",
                      color: "#fff",
                      "&:hover": { bgcolor: "#b71c1c" },
                      borderRadius: 1,
                    }}
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </Button>
                </Box>
                {/* Second Row */}
                <Box display="flex" gap={1} width="100%" mt={1}>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="Points"
                    value={points[u._id] || ""}
                    onChange={(e) =>
                      setPoints((prev) => ({ ...prev, [u._id]: Number(e.target.value) }))
                    }
                    sx={{
                      flex: 1,
                      "& .MuiInputBase-root": { height: 42, borderRadius: 1, textAlign: "center" },
                    }}
                    inputProps={{ style: { textAlign: "center", padding: 0 } }}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      flex: 1,
                      height: 42,
                      bgcolor: "#2e7d32",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1b5e20" },
                      borderRadius: 1,
                    }}
                    onClick={() => handleUpdatePoints(u._id)}
                  >
                    Update
                  </Button>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        // Tablet & Desktop Table View
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.loyalty?.points || 0}</TableCell>
                  <TableCell>{u.loyalty?.tier || "Bronze"}</TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      flexWrap={isTablet ? "wrap" : "nowrap"}
                      gap={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          minWidth: 80,
                          height: 36,
                          bgcolor: "#1565c0",
                          color: "#fff",
                          "&:hover": { bgcolor: "#0d47a1" },
                          borderRadius: 1,
                        }}
                        onClick={() => { setSelectedUser(u); setOpen(true); }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          minWidth: 80,
                          height: 36,
                          bgcolor: "#c62828",
                          color: "#fff",
                          "&:hover": { bgcolor: "#b71c1c" },
                          borderRadius: 1,
                        }}
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </Button>
                      <TextField
                        size="small"
                        type="number"
                        placeholder="Points"
                        value={points[u._id] || ""}
                        onChange={(e) =>
                          setPoints((prev) => ({ ...prev, [u._id]: Number(e.target.value) }))
                        }
                        sx={{
                          width: 80,
                          "& .MuiInputBase-root": { height: 36, borderRadius: 1, textAlign: "center" },
                        }}
                        inputProps={{ style: { textAlign: "center", padding: 0 } }}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          minWidth: 80,
                          height: 36,
                          bgcolor: "#2e7d32",
                          color: "#fff",
                          "&:hover": { bgcolor: "#1b5e20" },
                          borderRadius: 1,
                        }}
                        onClick={() => handleUpdatePoints(u._id)}
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={selectedUser?.name || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={selectedUser?.email || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={selectedUser?.role || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
