// src/pages/Register.jsx
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create an Account
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
