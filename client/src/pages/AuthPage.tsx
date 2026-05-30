import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/auth.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/auth/login",
        loginData
      );

      login(data);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        registerData
      );

      toast.success(
        "Account created successfully"
      );

      setIsSignUp(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div
        className={`container ${
          isSignUp
            ? "right-panel-active"
            : ""
        }`}
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password:
                    e.target.value,
                })
              }
            />

            <button>
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password:
                    e.target.value,
                })
              }
            />

            <button>
              Sign In
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>

              <p>
                Login with your account
                to continue managing
                tasks.
              </p>

              <button
                type="button"
                className="ghost"
                onClick={() =>
                  setIsSignUp(false)
                }
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>

              <p>
                Create an account and
                start organizing your
                tasks.
              </p>

              <button
                type="button"
                className="ghost"
                onClick={() =>
                  setIsSignUp(true)
                }
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
