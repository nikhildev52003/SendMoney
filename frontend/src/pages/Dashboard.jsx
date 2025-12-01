import { TranstHistory } from "../pages/transactionHistory";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, transferAmount } from "../features/account/accountSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Send, QrCode, History, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { firstname, balance, status, transferStatus } = useSelector(
    (state) => state.account
  );

  const transfeRref = useRef(null);
  const usernameRef = useRef(null);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleSendMoneyClick = () => {
    transfeRref.current?.scrollIntoView({ behavior: "smooth" });
    usernameRef.current?.focus();
  };

  const handleTransfer = () => {
    if (!to.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    dispatch(transferAmount({ to, amount: Number(amount), note }))
      .unwrap()
      .then(() => {
        toast.success("✅ Transfer successful!");
        dispatch(fetchBalance());
        setTo("");
        setAmount("");
        setNote("");
      })
      .catch((err) =>
        toast.error(err?.message || "❌ Transfer failed. Try again.")
      );
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-4xl font-extrabold text-white">Pay</h1>
          <p className="text-gray-400 text-lg mt-1">
            Welcome back, {firstname || "User"}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center">
          <User className="text-green-400" size={24} />
        </div>
      </div>

      {/* Centered Balance Card */}
      <div className="flex justify-center ">
        <div className="bg-gradient-to-r from-[#041804] to-[#092509] border border-green-900 rounded-2xl shadow-[0_0_25px_rgba(0,255,0,0.08)] p-10 w-full max-w-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Balance</p>
              <h2 className="text-5xl font-bold mt-1 flex items-center gap-2 text-white">
                {status === "loading" ? (
                  <span>Loading...</span>
                ) : (
                  <>₹ {balance.toFixed(2)}</>
                )}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm">Account Status</p>
              <p className="text-green-400 font-medium mt-1 flex items-center gap-1 justify-end">
                <span className="text-green-500 text-lg">●</span> Active
              </p>
            </div>
          </div>

          {/* Action Buttons inside card */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleSendMoneyClick}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition px-6 py-4 rounded-xl text-lg font-semibold shadow-md"
            >
              <Send size={18} /> Send Money
            </button>

            <button onClick={ ()=>{toast.success('💥🎉coming soon')}} className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition px-6 py-4 rounded-xl text-lg font-semibold text-gray-200 shadow-md">
              ↩ Receive
            </button>
          </div>
        </div>
      </div>

      {/* QR Code and History Buttons */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition px-6 py-4 rounded-xl font-semibold text-gray-300">
            <QrCode size={18} /> QR Code
          </button>
          <Link
            to="/history"
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition px-6 py-4 rounded-xl font-semibold text-gray-300"
          >
            <History size={18} /> History
          </Link>
        </div>
      </div>

      {/* Transfer Money Section */}
      <div
        className="bg-neutral-950 rounded-2xl p-8 border border-neutral-800 max-w-2xl mx-auto"
        ref={transfeRref}
      >
        <h2 className="text-2xl font-semibold mb-6 text-green-400">
          Transfer Money
        </h2>

        <input
          className="bg-black border border-neutral-700 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-green-600 outline-none text-white"
          type="text"
          ref={usernameRef}
          placeholder="Username"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          className="bg-black border border-neutral-700 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-green-600 outline-none text-white"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="bg-black border border-neutral-700 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-green-600 outline-none text-white"
          type="text"
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={handleTransfer}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-3 rounded-lg w-full font-semibold shadow mt-2"
          disabled={transferStatus === "loading"}
        >
          {transferStatus === "loading" ? "Processing..." : "Send Money"}
        </button>
      </div>

      <TranstHistory />

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
