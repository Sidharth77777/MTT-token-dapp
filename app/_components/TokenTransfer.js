"use client";

import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { ethers } from "ethers";

export default function TokenTransfer({ account, contract, setShowTransferredAlert }) {
  const [copied, setCopied] = useState(false);
  const [EVMaddress, setEVMaddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [errorOnTransfer, setErrorOnTransfer] = useState(null);
  const [transferring, setTransferring] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(
      "0x38d691d3F825588f7a3db18FDE6baC0ce623ff45"
    );
  };

  const transferTokensHandler = async() => {
    if (!contract || !account) return;
    if ((amount == null || amount == 0) && EVMaddress == null) {
        setErrorOnTransfer("Give EVM address and amount of $MTT first !");
        return;
    }
    if (amount == null || amount == 0){
        setErrorOnTransfer("Give amount of $MTT greater than 0 !");
        return;
    }
    

    try {
        setTransferring(true);
        const amountInWei = ethers.parseEther(amount);
        const tx = await contract.transferTokens(EVMaddress, amountInWei);
        await tx.wait();
        setTransferring(false);

        setShowTransferredAlert(true);
        setTimeout(() => {setShowTransferredAlert(false)},4000);
        setEVMaddress(null);
        setAmount(0);
        setErrorOnTransfer(null);
    } catch(err) {
        let errorMessage = "Invalid Wallet Address !";
        setTransferring(false);
        setErrorOnTransfer(errorMessage)
        console.error("Error transfering MTT: ",err);
    }

  }

  return (
    <div className="w-screen sm:px-30 px-6">
      {account && (
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
            {errorOnTransfer && <h2 className="text-red-500">{errorOnTransfer}</h2>}
          <div className="bg-gray-100 rounded-xl p-4 shadow-inner flex items-center justify-between">
            <pre className="text-sm overflow-x-auto">
              <code className="text-gray-800 font-mono">
                Example Wallet: 0x38d691d3F825588f7a3db18FDE6baC0ce623ff45
              </code>
            </pre>
            <button
              onClick={handleCopy}
              className="ml-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition"
            >
              {copied ? (
                <div className="cursor-pointer flex gap-2">
                  <ClipboardCheck size={18} className="text-green-600" />
                  <span className="text-green-600">Copied</span>
                </div>
              ) : (
                <div className="cursor-pointer flex gap-2">
                  <Clipboard size={18} className="text-gray-700" />
                  <span className="text-gray-700">Copy</span>
                </div>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              className="border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 w-full rounded-2xl outline-none text-black"
              placeholder="Enter the EVM address.."
              value={EVMaddress}
              onChange={(e) => setEVMaddress(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-3 w-full rounded-2xl outline-none text-black"
              type="number"
              min={0}
              placeholder="Enter the amount of $MTT tokens"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setAmount(value);
                }
              }}
            />
          </div>

          <div className="flex justify-center">
            <button onClick={transferTokensHandler} className="bg-green-600 cursor-pointer mt-3 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-green-700 transition sm:w-1/2 w-full">
              {transferring ? <span className="loading loading-dots loading-xs"></span> : "Transfer MTT"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
