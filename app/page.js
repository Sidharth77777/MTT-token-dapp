"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { TOKEN_ABI, CONTRACT_ADDRESS } from "./constants";
import Alerts from "./_components/Alerts";
import TopBar from "./_components/TopBar";
import WalletInfo from "./_components/WalletInfo";
import BalanceCard from "./_components/BalanceCard";
import MintCard from "./_components/MintCard";
import BurnCard from "./_components/BurnCard";
import TokenTransfer from "./_components/TokenTransfer";
import Stakes from "./_components/Stakes";
import RecentTransactions from "./_components/RecentTransactions";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const [mintAmount, setMintAmount] = useState(null);
  const [minting, setMinting] = useState(false);
  const [burnAmount, setBurnAmount] = useState(null);
  const [burning, setBurning] = useState(false);
  const [noTokenError, setNoTokenError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showBurnAlert, setShowBurnAlert] = useState(false);
  const [showTransferredAlert, setShowTransferredAlert] = useState(false);
  const [showStakedAlert, setShowStakedAlert] = useState(false);
  const [showUnStakedAlert, setShowUnStakedAlert] = useState(false);
  const [claimedAlert, setClaimedAlert] = useState(false);
  const [showBalanceCard, setShowBalanceCard] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);

      const newContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TOKEN_ABI,
        signer
      );
      setContract(newContract);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // SEPOLIA
      });
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const getBalance = async () => {
    if (!contract || !account) return;

    setShowBalanceCard(!showBalanceCard);

    try {
      const userBalance = await contract.getUserBalance();
      setBalance(ethers.formatEther(userBalance));
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const mintTokens = async () => {
    if (!contract || !mintAmount) return;

    try {
      setMinting(true);
      const amountInWei = ethers.parseEther(mintAmount);
      const tx = await contract.mint(amountInWei);
      await tx.wait();
      setMinting(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      setMintAmount(0);
      setNoTokenError(null);
      getBalance();
    } catch (err) {
      console.error("Mint failed ! :");
    }
  };

  const BurnTokens = async () => {
    if (!contract || !burnAmount) return;

    try {
      const amountInWei = ethers.parseEther(burnAmount);
      const tx = await contract.burnToken(amountInWei);
      setBurning(true);
      await tx.wait();
      setBurning(false);
      setShowBurnAlert(true);
      setTimeout(() => {
        setShowBurnAlert(false);
      }, 4000);
      setNoTokenError(null);
      setBurnAmount(0);
      getBalance();
    } catch (err) {
      let errorMessage = "Burn failed!";
      if (err?.reason) {
        errorMessage = err.reason;
      }

      setNoTokenError(errorMessage);
      console.error("Mint failed ! :", err);
    }
  };

  const logout = async() => {
    setAccount(null);
  setContract(null);
  setBalance(null);
  setMintAmount(null);
  setBurnAmount(null);
  setNoTokenError(null);
  setShowAlert(false);
  setShowBurnAlert(false);
  }

  return (
<div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-start py-10 px-4">
  
  <Alerts showAlert={showAlert} showBurnAlert={showBurnAlert} showTransferredAlert={showTransferredAlert} showStakedAlert={showStakedAlert} showUnStakedAlert={showUnStakedAlert} claimedAlert={claimedAlert} />

  <TopBar account={account} />

  <WalletInfo account={account} connectWallet={connectWallet} logout={logout} />

  <BalanceCard account={account} getBalance={getBalance} balance={balance} showBalanceCard={showBalanceCard} />

  <div className="flex justify-center items-center sm:flex-nowrap flex-wrap gap-5 max-w-6xl w-full mx-auto px-10">

    <div className="w-full sm:w-1/2">
  <MintCard account={account} mintAmount={mintAmount} setMintAmount={setMintAmount} mintTokens={mintTokens} minting={minting} /> 
    </div>

    <div className="w-full sm:w-1/2">
  <BurnCard noTokenError={noTokenError} account={account} burnAmount={burnAmount} setBurnAmount={setBurnAmount} BurnTokens={BurnTokens} burning={burning} />
    </div>

  </div>

   <div className="flex justify-center items-center mt-5">
    <TokenTransfer account={account} contract={contract} setShowTransferredAlert={setShowTransferredAlert} />
  </div> 

  <div className="flex justify-center items-center mt-5 mx-5">
    <Stakes account={account} contract={contract} setShowStakedAlert={setShowStakedAlert} setShowUnStakedAlert={setShowUnStakedAlert} setClaimedAlert={setClaimedAlert} />
  </div>

  <div className="flex justify-center items-center mt-10 mx-5">
    <RecentTransactions account={account} />
  </div>


  


  </div>
  );
}
