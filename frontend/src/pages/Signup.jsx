import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/Subheading";
import { InputBox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_BACKEND_URL } from "../config/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !username || !password) {
      toast.error("All fields are required ⚠️");
      return;
    }
    try {
      setloading(true);
      const res = await axios.post(
        `${USER_BACKEND_URL}/api/v1/user/signup`,
        { firstname, lastname, username, password },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Signup successful 🎉");

      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again ❌"
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <Heading text="Create Account" />
        <SubHeading text="Sign up to get started" />

        <form onSubmit={handelSubmit} className="space-y-5 mt-6">
          <InputBox
            label="First Name"
            type="text"
            onChange={(e) => setfirstname(e.target.value)}
            value={firstname}
            placeholder="John"
          />
          <InputBox
            label="Last Name"
            type="text"
            onChange={(e) => setlastname(e.target.value)}
            value={lastname}
            placeholder="Doe"
          />
          <InputBox
            label="Username"
            type="text"
            onChange={(e) => setusername(e.target.value)}
            value={username}
            placeholder="john123"
          />
          <InputBox
            label="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />

          <Button
            text={loading ? "Signing up..." : "Signup"}
            disabled={loading}
          />

          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};
