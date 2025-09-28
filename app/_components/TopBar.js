export default function TopBar({ account }) {
  return (
    <>
      {!account && (
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
          Connect to MetaMask
        </h1>
      )}
    </>
  );
}
