export default function WalletInfo({account, connectWallet, logout}) {
  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4">
        {account ? (
          <div className="flex items-center gap-4 mb-8">
            <p className="bg-white shadow-md rounded-2xl px-6 py-3 font-mono text-gray-700">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <button
              onClick={logout}
              className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-2xl shadow-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl cursor-pointer shadow-md hover:bg-blue-700 transition"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </>
  );
}
