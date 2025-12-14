import React, { useEffect, useState } from "react";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { CONTRACT_ADDRESS } from "../constants";

export default function RecentTransactions({ account, }) {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reFetchTransactionData, setReFetchTransactionData] = useState(false);

  const SEPOLIA_ETHERSCAN_LINK = "https://sepolia.etherscan.io";
  const SEPOLIA_EXPLORER_LINK = `https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${account}`;
  const API_URL = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=tokentx&contractaddress=0x11f11f1e09c90259a11031957b4b60dba433a06f&address=${account}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;

  const fetchTransactions = async () => {
    if (!account) return;
    setReFetchTransactionData(true);

    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data.status == "1") {
        const txs = data.result.map((tx) => ({
          id: tx.hash,
          type: tx.to.toLowerCase() === account.toLowerCase() ? "Incoming" : "Outgoing",
          from: tx.from,
          to: tx.to,
          amount: (Number(tx.value) / 10 ** Number(tx.tokenDecimal)).toLocaleString('en', { maximumFractionDigits: 4 }),
          token: tx.tokenSymbol,
          functionName: tx.functionName,
          timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
          trxLink: `${SEPOLIA_ETHERSCAN_LINK}/tx/${tx.hash}`,
        }));
        setTransactionData(txs);
        console.log(txs);
      } else {
        setTransactionData([]);
      }

      setLoading(false);
      setReFetchTransactionData(false);
    } catch (err) {
      setLoading(false);
      setTransactionData([]);
      setReFetchTransactionData(false);
      console.error("Failed fetching transactions data!", err);
    }
  };

  useEffect(() => {
    account && fetchTransactions();
  }, [account])

  const openExplorer = () => {
    window.open(SEPOLIA_EXPLORER_LINK, "_blank", "noopener,noreferrer");
  }

  const recentTxs = transactionData.slice(0, 10);

  const cleanFunctionName = (fnName) => {
    if (!fnName) return "-";
    return fnName.split("(")[0];
  };

  const functionBadge = (fnName) => {
    const name = cleanFunctionName(fnName).toLowerCase();
    if (name.includes("burn")) {
      return "bg-red-600/10 text-red-400 border border-red-500/20";
    }
    return "bg-emerald-600/10 text-emerald-300 border border-emerald-500/20";
  };

  return (<>
    {account && (
      <div className="sm:min-w-8xl w-screen mx-auto px-4">
        <div className="w-full bg-white/6 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Your Recent Transactions</h3>
              <p className="text-sm text-gray-300">Latest token transfers and activity</p>
            </div>

            <div className="flex items-center gap-3">

              <div title="Refresh"><RotateCw onClick={fetchTransactions} className={`cursor-pointer hover:text-blue-400 ${reFetchTransactionData ? 'animate-spin text-blue-400' : ''}`} /></div>
              <button onClick={openExplorer} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-sm">
                <ArrowUpRight size={16} />
                <span className="text-sm">Check in Explorer</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="px-4 py-2">Txn Hash</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Function</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Loading state */}
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      <span className="loading loading-spinner loading-xl"></span>
                    </td>
                  </tr>
                )}

                {/* Empty state */}
                {!loading && transactionData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center font-bold text-xl sm:text-2xl"
                    >
                      NO TRANSACTIONS DONE YET!
                    </td>
                  </tr>
                )}

                {/* Data rows */}
                {!loading &&
                  recentTxs.map((tx, idx) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="align-middle"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm text-white font-medium truncate max-w-[160px]">
                          {tx.id.slice(0, 4)}...{tx.id.slice(-4)}
                        </div>
                        <div className="text-xs text-gray-400">{tx.type}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-200 truncate max-w-[140px]">
                          {tx.from.slice(0, 4)}...{tx.from.slice(-4)}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-200 truncate max-w-[140px]">
                          {tx.to.slice(0, 4)}...{tx.to.slice(-4)}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${tx.type === "Incoming"
                                ? "bg-emerald-600/10 text-emerald-300"
                                : "bg-red-600/10 text-red-300"
                              }`}
                          >
                            {tx.amount}
                          </div>
                          <div className="text-xs text-gray-400">{tx.token}</div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${functionBadge(
                            tx.functionName
                          )}`}
                        >
                          {cleanFunctionName(tx.functionName)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-400">
                        {tx.timestamp}
                      </td>

                      <td className="px-4 py-3">
                        <a
                          href={tx.trxLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200"
                        >
                          View <ArrowUpRight size={14} />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>

            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <div>Showing <span className="text-white font-medium">{transactionData.length}</span> recent transactions</div>
          </div>
        </div>
      </div>
    )}

  </>);
}
