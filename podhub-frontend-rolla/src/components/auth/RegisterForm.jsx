// src/components/auth/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/auth.service";

// ✅ Validation schema with Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().oneOf(["user", "creator", "admin"]).required("Role is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;

      const res = await authService.register(payload);

      toast.success("Registration successful!");

      // ✅ Save token & role if backend returns them (adjust according to your API)
      if (res?.data?.token) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: res.data.token,
            role: res.data.user.role,
            name: res.data.user.name,
          })
        );

        // Redirect based on role
        const role = res.data.user.role;
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "creator") navigate("/dashboard/creator");
        else navigate("/dashboard/user");
      } else {
        // If API does not return token, redirect to login
        navigate("/login");
      }

      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
  <TextField
    label="Full Name"
    fullWidth
    size="small"
    {...register("name")}
    error={!!errors.name}
    helperText={errors.name?.message}
  />

  <TextField
    label="Email"
    fullWidth
    size="small"
    {...register("email")}
    error={!!errors.email}
    helperText={errors.email?.message}
  />

  <TextField
    select
    label="Role"
    fullWidth
    size="small"
    defaultValue=""
    {...register("role")}
    error={!!errors.role}
    helperText={errors.role?.message}
  >
    <MenuItem value="user">User</MenuItem>
    <MenuItem value="creator">Creator</MenuItem>
    <MenuItem value="admin">Admin</MenuItem>
  </TextField>

  <TextField
    label="Password"
    fullWidth
    size="small"
    type={showPassword ? "text" : "password"}
    {...register("password")}
    error={!!errors.password}
    helperText={errors.password?.message}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />

  <TextField
    label="Confirm Password"
    fullWidth
    size="small"
    type="password"
    {...register("confirmPassword")}
    error={!!errors.confirmPassword}
    helperText={errors.confirmPassword?.message}
  />

  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? "Registering..." : "Register"}
  </button>

  <p className="text-center text-sm text-gray-600 dark:text-gray-300">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-600 hover:underline">
      Sign in
    </Link>
  </p>
</form>

  );
}

export default RegisterForm;
