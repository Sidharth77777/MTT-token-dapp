import { CONTRACT_ADDRESS, MTT_LOGO } from "../constants";

export default function BalanceCard({ account, getBalance, balance, showBalanceCard }) {

  const addTokenToWallet = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: CONTRACT_ADDRESS,
            symbol: "MTT",
            decimals: 18,
            image: MTT_LOGO,
          },
        },
      });

      if (wasAdded) {
        console.log("MTT successfully added to wallet!");
      } else {
        console.log("User rejected adding MTT.");
      }
    } catch (err) {
      console.error("Error adding token:", err);
    }
  };

  const formatNumber = (numStr, decimals = 3) => {
      const num = parseFloat(numStr);
      
      if (isNaN(num) || num === 0) {
          return "0";
      }
      
      if (Number.isInteger(num)) {
          return num.toString();
      }
      
      return num.toFixed(decimals).replace(/\.?0+$/, "");
  };

  return (
    <>
      {account && (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col items-center gap-4 mb-8">
          <button
            className="bg-green-600 text-white px-6 py-3 cursor-pointer rounded-2xl shadow-md hover:bg-green-700 transition w-full"
            onClick={getBalance}
          > 
          {showBalanceCard ? "Hide Balance" : "Show Balance" }
          </button>
          {showBalanceCard && (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                Balance: {formatNumber(balance)} $MTT
              </h2>
              <button
                onClick={addTokenToWallet}
                className="bg-blue-600 cursor-pointer mt-3 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition sm:w-1/2 w-full"
              >
                Add $MTT to Wallet
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
