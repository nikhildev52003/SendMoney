import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../features/transactioHistory_api/transactionSclice";
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";

export const TranstHistory = () => {
  const dispatch = useDispatch();
  const { transactions, status } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  const LatestTransaction = [...(transactions || [])].slice(0, 3);

  return (
    <div className="text-white px-4 py-4 font-sans max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-green-400">
          <Clock size={18} /> Recent Transactions
        </h2>
        <p className="text-xs text-gray-400">
          {LatestTransaction?.length || 0} total
        </p>
      </div>

      <div className="grid grid-cols-4 text-gray-400 text-xs border-b border-green-900/30 pb-1 mb-2">
        <span>User</span>
        <span>Note</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
      </div>
      {status === "loading" && (
        <p className="text-gray-300 animate-pulse">Loading...</p>
      )}

      {status === "failed" && (
        <p className="text-red-400">Failed to load transactions.</p>
      )}

      {transactions?.length === 0 && status === "succeeded" && (
        <p className="text-gray-400">No transactions yet.</p>
      )}

      <div className="space-y-2">
        {LatestTransaction?.map((th) => {
          const isDebit = th.type === "debit";

          return (
            <div
              key={th._id}
              className="grid grid-cols-4 items-center hover:bg-[#0f2a0f]/40 transition rounded-lg px-2 py-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
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
                  <p className="font-semibold text-sm">
                    @{isDebit ? th?.to?.username : th?.from?.username}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {isDebit ? "Sent to" : "Received from"}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-xs truncate">{th.note || "—"}</p>

              <p className="text-gray-400 text-[11px]">
                {new Date(th.createdAt).toLocaleDateString()}
              </p>

              <div className="text-right flex items-center justify-end gap-1 font-semibold text-sm">
                {isDebit ? (
                  <ArrowUpRight size={14} className="text-red-400" />
                ) : (
                  <ArrowDownRight size={14} className="text-green-400" />
                )}

                <span
                  className={`${isDebit ? "text-red-400" : "text-green-400"}`}
                >
                  {isDebit ? "- " : "+ "}₹{th.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
