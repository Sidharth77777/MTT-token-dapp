export default function MintCard({account, mintAmount, setMintAmount, mintTokens, minting,}) {
  return (
    <div className="w-full">
      {account && (
        <div className="bg-white shadow-lg rounded-2xl py-9 px-7 w-full max-w-md flex flex-col items-center gap-4 mb-6">
          <input
            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 w-full rounded-2xl outline-none text-black"
            type="number"
            min={0}
            placeholder="Amount to mint..."
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <button
            onClick={mintTokens}
            className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-2xl shadow-md hover:bg-green-700 transition w-full flex justify-center"
          >
            {minting ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              "Mint MTT"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
