export default function Alerts({showAlert, showBurnAlert, showTransferredAlert, showStakedAlert, showUnStakedAlert, claimedAlert}) {
    return (
        <div>
      {showAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      MINTED SUCCESSFULLY!
    </div>
  )}

  {showStakedAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      STAKED SUCCESSFULLY!
    </div>
  )}

    {claimedAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      CLAIMED $MTT REWARDS SUCCESSFULLY!
    </div>
  )}

    {showUnStakedAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      UNSTAKED SUCCESSFULLY!
    </div>
  )}


  {showBurnAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      BURNED SUCCESSFULLY!
    </div>
  )}

  {showTransferredAlert && (
    <div className="fixed top-6 right-0 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-opacity duration-500 opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      SENT $MTT SUCCESSFULLY!
    </div>
  )}
        </div>
    )
}