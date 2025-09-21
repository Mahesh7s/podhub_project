// src/pages/Login.jsx
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
