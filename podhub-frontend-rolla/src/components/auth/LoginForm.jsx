// src/components/auth/LoginForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../services/auth.service";

// ✅ Validation schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginForm() {
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
      const res = await authService.login(data);
     // ✅ Save token & role in localStorage
     localStorage.setItem(
       "userData",
       JSON.stringify({
         token: res.token,
         role: res.user.role,
         name: res.user.name,
       })
     );

     toast.success("Login successful!");

     // Redirect based on role
     const role = res.user.role;
     if (role === "admin") navigate("/dashboard/admin");
     else if (role === "creator") navigate("/dashboard/creator");
     else navigate("/dashboard/user");
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
  <TextField
    label="Email"
    fullWidth
    size="small"
    {...register("email")}
    error={!!errors.email}
    helperText={errors.email?.message}
  />

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

  {/* ✅ Styled Login Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md 
               hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] 
               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? "Logging in..." : "Login"}
  </button>

  <div className="flex justify-center text-sm mt-2">
     <p className="text-center text-sm text-gray-600 dark:text-gray-300">
    Don't have an account?{" "}
    <Link to="/register" className="text-blue-600 hover:underline">
      Sign Up
    </Link>
  </p>
  </div>
</form>

  );
}

export default LoginForm;
