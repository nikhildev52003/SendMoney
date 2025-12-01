import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../features/transactioHistory_api/transactionSclice";
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";

export const History = () => {
  const dispatch = useDispatch();
  const { transactions, status } = useSelector((state) => state.transaction);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  const LatestTransaction = [...(transactions || [])];

  const filteredTransactions = LatestTransaction.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "send") return tx.type === "debit";
    if (filter === "receive") return tx.type === "credit";
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans space-y-10">
      <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br text-white p-14 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-green-400">
            <Clock size={20} /> Recent Transactions
          </h2>
          <p className="text-sm text-gray-400">
            {filteredTransactions?.length || 0} total
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg border ${
              filter === "all"
                ? "bg-green-700 border-green-500"
                : "border-neutral-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("send")}
            className={`px-4 py-2 rounded-lg border ${
              filter === "send"
                ? "bg-red-700 border-red-500"
                : "border-neutral-700"
            }`}
          >
            Sent
          </button>

          <button
            onClick={() => setFilter("receive")}
            className={`px-4 py-2 rounded-lg border ${
              filter === "receive"
                ? "bg-green-900 border-green-500"
                : "border-neutral-700"
            }`}
          >
            Received
          </button>
        </div>

        <div className="grid grid-cols-4 text-gray-400 text-sm border-b border-green-900/40 pb-2 mb-3">
          <span>Username</span>
          <span>Note</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>

        {status === "loading" && (
          <p className="text-gray-300 animate-pulse">
            Fetching transactions...
          </p>
        )}
        {status === "failed" && (
          <p className="text-red-400">Failed to load transactions.</p>
        )}
        {filteredTransactions.length === 0 && status === "succeeded" && (
          <p className="text-gray-400">No transactions found.</p>
        )}

        <div className="space-y-3">
          {filteredTransactions.map((th) => {
            const isDebit = th.type === "debit";

            return (
              <div
                key={th._id}
                className="grid grid-cols-4 items-center bg-[#0A1B0A]/50 hover:bg-[#0f2a0f]/70 transition-all border border-green-900/30 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                      isDebit
                        ? "bg-red-900/40 text-red-300"
                        : "bg-green-900/40 text-green-300"
                    }`}
                  >
                    {(isDebit
                      ? th?.to?.username?.charAt(0)
                      : th?.from?.username?.charAt(0)
                    )?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">
                      @{isDebit ? th?.to?.username : th?.from?.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isDebit ? "Sent to" : "Received from"}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 truncate">{th.note || "—"}</p>

                <p className="text-gray-400 text-sm">
                  {new Date(th.createdAt).toLocaleString()}
                </p>

                <div className="text-right flex items-center justify-end gap-1 font-semibold">
                  {isDebit ? (
                    <ArrowUpRight size={16} className="text-red-400" />
                  ) : (
                    <ArrowDownRight size={16} className="text-green-400" />
                  )}
                  <span className={isDebit ? "text-red-400" : "text-green-400"}>
                    {isDebit ? "- " : "+ "}₹{th.amount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
