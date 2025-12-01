import { Heading } from "../components/heading";
import { SubHeading } from "../components/Subheading";
import { InputBox } from "../components/Inputbox";
import { USER_BACKEND_URL } from "../config/config";
import { Button } from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signin = () => {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [loading, Setloading] = useState(false);

  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error("All fields are require ⚠️");
    }
    try {
      Setloading(true);
      const { data } = await axios.post(
        `${USER_BACKEND_URL}/api/v1/user/signin`,
        { username: username, password: password },
        { withCredentials: true }
      );
      console.log(data);

      localStorage.setItem("token", data.token);
      toast.success("Signin successful 🎉");
      setTimeout(navigate("/dashboard"), 1000);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Signin failed. Please try again ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <Heading text="Wellcome Back!!" />
        <SubHeading text="Sign in to get started" />

        <form onSubmit={handelSubmit} className="space-y-5 mt-6">
          <InputBox
            label="Username"
            type="text"
            onChange={(e) => Setusername(e.target.value)}
            value={username}
            placeholder="john123"
          />
          <InputBox
            label="Password"
            type="password"
            onChange={(e) => Setpassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />

          <Button
            text={loading ? "Signing in..." : "Signin"}
            disabled={loading}
          />

          <div className="text-center mt-4 text-sm text-gray-600">
            Create an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              signup
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};
