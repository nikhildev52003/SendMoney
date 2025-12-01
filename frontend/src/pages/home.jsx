import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-green-500">SendMoney</h1>

        <div className="flex items-center gap-6">
          <Link to={"/signin"} className="text-gray-300 hover:text-white">
            Sign In
          </Link>
          <Link
            to={"/signup"}
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Send money <span className="text-green-500">instantly</span>{" "}
            worldwide
          </h1>

          <p className="text-gray-400 text-lg">
            Experience fast, secure, and transparent money transfers. No hidden
            fees. No middlemen. Just simple, modern payments.
          </p>
        </div>

        <div className="mt-10 md:mt-0 bg-gradient-to-br from-[#0f1f0f] to-[#071807] border border-green-600/40 p-8 rounded-3xl w-full max-w-sm shadow-lg backdrop-blur-md">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <h2 className="text-4xl font-bold mt-1">₹ 2,450.50</h2>

          <div className="bg-[#0c260c] p-4 rounded-xl mt-6 border border-green-700/40">
            <p className="text-gray-300 text-sm">Account Status</p>
            <p className="text-green-400 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span> Active
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 flex-1 py-3 rounded-lg text-black font-semibold hover:bg-green-600 transition">
              Send
            </button>
            <button className="bg-white/10 flex-1 py-3 rounded-lg border border-white/20 font-semibold hover:bg-white/20 transition">
              Receive
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f0a]">
        <h2 className="text-center text-4xl font-bold">
          Why choose Sendmoney?
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Everything you need for seamless financial transactions
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-10 mt-16">
          <FeatureCard
            title="Lightning Fast"
            desc="Transfers complete in seconds, not days. Real-time updates on every transaction."
          />

          <FeatureCard
            title="Bank-Level Security"
            desc="Military-grade encryption protects your data. Your money is always safe with us."
          />

          <FeatureCard
            title="Global Reach"
            desc="Send money to over 150 countries instantly, anytime."
          />

          <FeatureCard
            title="Smart Analytics"
            desc="Track spending and gain insights into financial behavior."
          />

          <FeatureCard
            title="Multiple Cards"
            desc="Create virtual cards for shopping or spending limits."
          />

          <FeatureCard
            title="Low Fees"
            desc="Transparent pricing with no hidden charges."
          />
        </div>
      </section>
    </div>
  );
};

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-[#0f1f0f] p-8 rounded-2xl border border-green-700/20 hover:bg-[#132913] transition">
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
