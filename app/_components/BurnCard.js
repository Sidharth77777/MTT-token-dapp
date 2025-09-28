export default function BurnCard({
  account,
  burnAmount,
  setBurnAmount,
  BurnTokens,
  burning,
  noTokenError,
}) {
  return (
    <div>
      {account && (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col items-center gap-4 mb-6">
          {account && (
            <p className="text-red-600 font-medium  text-center">
              {noTokenError}
            </p>
          )}
          <input
            className="border-2 text-black border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 px-4 py-3 w-full rounded-2xl outline-none"
            type="number"
            min={0}
            placeholder="Amount to burn..."
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <button
            onClick={BurnTokens}
            className="bg-red-600 cursor-pointer text-white px-6 py-3 rounded-2xl shadow-md hover:bg-red-700 transition w-full flex justify-center"
          >
            {burning ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              "Burn MTT"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
