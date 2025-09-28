# MTT Token DApp

[Live Demo](https://mtt-token-dapp.vercel.app/)

A fully-featured decentralized application (DApp) for managing the **MTT ERC20 token** on the Ethereum Sepolia testnet. This DApp allows users to interact with the MTT token smart contract directly from their browser using MetaMask.

---

## Features

- **Connect Wallet:** Connect your MetaMask wallet to the DApp.
- **View Token Balance:** See your current MTT token balance.
- **Mint Tokens:** Mint new MTT tokens to your wallet.
- **Burn Tokens:** Burn your MTT tokens.
- **Transfer Tokens:** Send MTT tokens to another wallet.
- **Staking:** Stake MTT tokens to earn rewards.
- **Unstaking:** Withdraw your staked tokens (full or partial) along with rewards.
- **Claim Rewards:** Claim accrued staking rewards.
- **Recent Transactions:** View your last 10 transactions with type, amount, and timestamp.
- **Explorer Links:** Check all token activity directly on [Etherscan](https://sepolia.etherscan.io/).

---

## Requirements

- **MetaMask Wallet:** Ensure you have a MetaMask wallet connected to the Sepolia testnet.

- **Sepolia ETH:** You’ll need some Sepolia ETH for gas fees to interact with the MTT token contract. You can get test ETH from a (Sepolia Faucet[https://cloud.google.com/application/web3/faucet/ethereum/sepolia]
---

## Screenshots

![Connect Wallet](https://drive.usercontent.google.com/download?id=154cYThhqBHBWM8OiNGmocw0c9oq9CIel&export=view&authuser=0)
*Connect your MetaMask wallet to get started.*

![Token Dashboard](https://drive.usercontent.google.com/download?id=1Y3zr1rH3W8LgmVBxxCDaxYQegfhb3Lj9&export=view&authuser=0)
*Mint, burn, transfer, and stake MTT tokens.*

![Recent Transactions](https://drive.usercontent.google.com/download?id=1uLG_2k5hqTFx5kq8hLj8yXrdPSx-nxKZ&export=view&authuser=0)
*View your latest token transactions.*

---

## Technologies Used

- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion
- **Smart Contract:** Solidity (ERC20 + staking functionality)
- **Wallet Integration:** MetaMask
- **Blockchain:** Ethereum Sepolia Testnet
- **Deployment:** Vercel

---

## Smart Contract Details

- **Token Name:** MyTestToken
- **Symbol:** MTT
- **Initial Supply:** 1000 MTT (minted to deployer)
- **Minting:** Users can mint additional MTT tokens without limit
- **Staking:** Earn rewards at 10% APY
- **Contract Address (Sepolia):** [0x11F11F1E09c90259a11031957b4B60DbA433a06F](https://sepolia.etherscan.io/address/0x11F11F1E09c90259a11031957b4B60DbA433a06F)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sidharth77777/MTT-token-dapp.git
cd MTT-token-dapp
```

2. Install dependencies:

```bash
npm install
```

3. Add your environment variables in a .env.local file:

```bash
NEXT_PUBLIC_ETHERSCAN_API_KEY=<Your Etherscan API Key>
```

4. Start the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser


### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### Contact

Developer: Sidharth K S

GitHub: https://github.com/Sidharth77777

X : https://x.com/cryptoSid1564
