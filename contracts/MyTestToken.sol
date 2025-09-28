// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyTestToken is ERC20 {
    event TokenMinted(address indexed to, uint256 amount);
    event TokenBurned(address indexed from, uint256 amount);
    event TokenTransferred(address indexed from, address indexed to, uint256 amount);

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event RewardClaimed(address indexed user, uint256 reward);

    struct Stake{
        uint256 amount;
        uint256 since;
        uint256 reward;
    }
    mapping(address => Stake) public stakes;

    uint256 public rewardRate = 10;
    uint256 public constant SECONDS_IN_YEAR = 365 days;

    constructor()
        ERC20("MyTestToken", "MTT")
    {
        _mint(msg.sender, (1000 * 1e18));
    }

    function mint(uint256 _amount) public {
        _mint(msg.sender, _amount);
        emit TokenMinted(msg.sender, _amount);
    }

    function burnToken(uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Not enough $MTT tokens !");
        
        _burn(msg.sender, _amount);
        emit TokenBurned(msg.sender, _amount);
    }


    function transferTokens(address _to, uint256 _amount) public {
        require(_amount <= balanceOf(msg.sender), "Not enough $MTT tokens !");
        require(_amount > 0, "Invalid amount !");

        transfer(_to, _amount);
        emit TokenTransferred(msg.sender, _to, _amount);
    }

    function _updateReward(address _user) internal {
        Stake storage st = stakes[_user];
        if (st.amount > 0) {
            uint256 timeStaked = block.timestamp - st.since;
            uint256 pendingReward = (st.amount * rewardRate * timeStaked) / (100 * SECONDS_IN_YEAR);
            st.reward += pendingReward;
            st.since = block.timestamp;
        }
    }

    function stake(uint256 _amount) public {
        require(_amount <= balanceOf(msg.sender), "Not enough tokens to stake !");
        _transfer(msg.sender, address(this), _amount);

        Stake storage st = stakes[msg.sender];
        _updateReward(msg.sender);

        st.amount += _amount;
        st.since = block.timestamp;
        emit Staked(msg.sender, _amount);
    }

    function unStake(uint256 _amount) public {
        Stake storage st = stakes[msg.sender];
        require(st.amount > 0, "No stake found");
        require(_amount > 0, "Cannot unstake 0");
        require(st.amount >= _amount, "Not enough staked");

        _updateReward(msg.sender);

        uint256 rewardShare = (st.reward * _amount) / st.amount; 
        st.amount -= _amount;
        st.reward -= rewardShare;

        _transfer(address(this), msg.sender, _amount + rewardShare);

        emit Unstaked(msg.sender, _amount, rewardShare);
    }

    function unStakeFull() public {
        uint256 fullTokensAmount = stakes[msg.sender].amount;
        unStake(fullTokensAmount);
    }

    function claimStakingReward() public {
        Stake storage st = stakes[msg.sender];
        _updateReward(msg.sender);

        uint256 reward = st.reward;
        require(reward > 0, "No rewards available yet !");
        st.reward = 0;
        _transfer(address(this), msg.sender, reward);
    }

    function getUserBalance() public view returns(uint256) {
        return balanceOf(msg.sender);
    }

    function getStakeDetails() public view returns(uint256 amount, uint256 since, uint256 reward) {
        Stake storage st = stakes[msg.sender];
        uint256 pendingReward = 0;
        if(st.amount > 0){
            uint256 timeStaked = block.timestamp - st.since;
            pendingReward = (st.amount * rewardRate * timeStaked) / (100 * SECONDS_IN_YEAR);
        }
        return (st.amount, st.since, st.reward + pendingReward);
    }

}

// 0x11F11F1E09c90259a11031957b4B60DbA433a06F
