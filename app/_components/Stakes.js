"use client"

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Stakes({ account, contract, setShowStakedAlert, setShowUnStakedAlert, setClaimedAlert }) {
    const [stakeInfo, setStakeInfo] = useState({amount:0, since:0, reward:0});
    const [stakeAmount, setStakeAmount] = useState(null);
    const [unStakeAmount, setUnStakeAmount] = useState(null);
    const [stakingTokens, setStakingTokens] = useState(false);
    const [unStakingTokens, setUnStakingTokens] = useState(false);
    const [claimingTokens, setClaimingTokens] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const stakeDetails = async() => {
        if (!contract || !account) return;

        try {
            const [amount, since, reward] = await contract.getStakeDetails()

            setStakeInfo({
                amount : ethers.formatEther(amount),
                since : Number(since),
                reward : ethers.formatEther(reward),
            })
            
        } catch(err) {
            console.error("Failed fetching stake details !");
        }
    }

    const stakeTokens = async() => {
        if (!contract || !account) return;
        if (stakeAmount == null || stakeAmount == 0) {
            setErrorMessage("Give amount greater than 0 !"); 
            return;
        }

        try{
            setStakingTokens(true)
            const amountInWei = ethers.parseEther(stakeAmount.toString());
            const tx = await contract.stake(amountInWei);
            await tx.wait();
            await stakeDetails();

            setShowStakedAlert(true);
            setTimeout(() => {setShowStakedAlert(false)},4000);
            setErrorMessage(null);
            setStakingTokens(false);
            setStakeAmount(0);
        } catch(err) {
            let err_msg = "Failed Staking MTT !"
            if (err?.reason) {
                err_msg = err?.reason;
            }
            setErrorMessage(err_msg);
            setStakingTokens(false);
            setStakeAmount(0);
            console.error("Failed staking MTT !",err);
        }
    }

    const unStakeTokens = async() => {
        if (!account || !contract) return;
        if (unStakeAmount == null || unStakeAmount == 0) {
            setErrorMessage("Give amount greater than 0 !"); 
            return;
        }

        try{
            setUnStakingTokens(true);
            const amountInWei = ethers.parseEther(unStakeAmount.toString());
            const tx = await contract.unStake(amountInWei)
            await tx.wait();
            await stakeDetails();

            setShowUnStakedAlert(true);
            setTimeout(() => {setShowUnStakedAlert(false)},4000)
            setErrorMessage(null);
            setUnStakingTokens(false);
            setUnStakeAmount(0);
        } catch(err) {
            let err_msg = "Failed unStaking MTT !"
            if (err?.reason) {
                err_msg = err?.reason;
            } 
            setErrorMessage(err_msg);
            setUnStakingTokens(false);
            setUnStakeAmount(0);
            console.error("Failed unstaking MTT !",err);
        }
    }

    const claimRewards = async() => {
        if (!account || !contract) return;

        try{
            setClaimingTokens(true);
            await contract.claimStakingReward();
            await stakeDetails();

            setClaimingTokens(false);
            setErrorMessage(null);
            stakeDetails();
            setClaimedAlert(true);
            setTimeout(() => {setClaimedAlert(false)},4000);
        } catch(err) {
            setClaimingTokens(false);
            console.error("Failed claiming rewards !", err)
        }
    }

    useEffect(() => {
        account  && stakeDetails();
    }, [account])

    const formatNumber = (numStr, decimals = 3) => {
        const num = parseFloat(numStr);
        if (Number.isInteger(num)) {
            return num.toString(); 
        }
        return num.toFixed(decimals).replace(/\.?0+$/, ""); 
    }

    const formatReward = (reward) => {
        const num = parseFloat(reward);
        if (num >= 0.001) return num.toFixed(3);
        if (num >= 0.0001) return num.toFixed(4);
        return num.toFixed(6); 
    };


  return (
    <div>
      {account && (
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 space-y-8 text-white">
          <h2 className="text-2xl font-bold text-center">Staking Dashboard</h2>
          <h3 className="text-lg font-medium text-center text-gray-300">
            Total Staked $MTT : <span className="font-bold text-white">{formatNumber(stakeInfo.amount)}</span>
          </h3>
          <h4 className="text-lg font-bold text-center text-red-500">{errorMessage}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            
            <div className="space-y-3">
              <input
                type="number"
                min="0"
                placeholder="Enter stake amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button onClick={stakeTokens} className="cursor-pointer w-full px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-medium shadow-md">
                {stakingTokens ? <span className="loading loading-dots loading-xs"></span> :'Stake'}
              </button>
            </div>

            
            <div className="space-y-3">
              <input
                type="number"
                min="0"
                placeholder="Enter unstake amount"
                value={unStakeAmount}
                onChange={(e) => setUnStakeAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button onClick={unStakeTokens} className="cursor-pointer w-full px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md">
                {unStakingTokens ? <span className="loading loading-dots loading-xs"></span> : "Unstake"}
              </button>
            </div>

            
            <div className="space-y-3">
              <div className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600/20 to-green-500/20 border border-emerald-500/30 shadow-inner flex items-center justify-between">
                
                <span className="text-2xl font-bold text-green-400">{formatReward(stakeInfo.reward)} MTT</span>
                </div>
              <button disabled={!stakeInfo.reward} onClick={claimRewards} className="cursor-pointer w-full px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-semibold shadow-md">
                {claimingTokens ? <span className="loading loading-dots loading-xs"></span> : "Claim Rewards"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
