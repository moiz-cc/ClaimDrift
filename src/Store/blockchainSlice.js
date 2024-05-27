import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
  claimAbi,
  crowdSaleAbi_BNB,
  crowdSaleAbi_ETH,
  crowdSaleAbi_POLYGON,
  driftAbi,
  presaletokenAbi_BNB,
  presaletokenAbi_ETH,
  presaletokenAbi_POLYGON,
  driftStakeAbi,
  driftStakePoolAbi,
  swapBridge_Abi,
} from "../config/abi";
import ConvertNumber from "../Helpers/ConvertNumber";
import axios from "axios";

const initialState = {
  web3Inst_ETH: null,
  contractInstPresaleToken_ETH: null,
  contractInstICO_ETH: null,
  contractInstDrift_ETH: null,
  contractInstClaim_ETH: null,
  contractInstStakePool_ETH: null,
  contractInstDriftStake_ETH: null,
  contractInstBridge_ETH: null,

  web3Inst_BNB: null,
  contractInstPresaleToken_BNB: null,
  contractInstICO_BNB: null,
  contractInstDrift_BNB: null,
  contractInstClaim_BNB: null,
  contractInstStakePool_BNB: null,
  contractInstDriftStake_BNB: null,
  contractInstBridge_BNB: null,

  web3Inst_POLYGON: null,
  contractInstPresaleToken_POLYGON: null,
  contractInstICO_POLYGON: null,
  contractInstDrift_POLYGON: null,
  contractInstClaim_POLYGON: null,
  contractInstStakePool_POLYGON: null,
  contractInstDriftStake_POLYGON: null,
  contractInstBridge_POLYGON: null,

  pool: null,
  user: null,
  publicBlockchainData: null,
  ethPrice: null,
  bnbPrice: null,
  maticPrice: null,
  isLoading: false,
  error: null,
};

export const makeBatchRequest = async (web3, calls) => {
  try {
    let batch = new web3.BatchRequest();
    let promises = calls.map((call) => {
      return new Promise((res, rej) => {
        let req = call.request(
          { from: "0x0000000000000000000000000000000000000000" },
          (err, data) => {
            if (err) rej(err);
            else res(data);
          }
        );
        batch.add(req);
      });
    });
    batch.execute();
    return await Promise.all([...promises]);
  } catch (error) {
    return error;
  }
};

export const LoadBlockchainData = createAsyncThunk(
  "LoadBlockchainData",
  async (
    {
      web3Inst_ETH,
      web3Inst_POLYGON,
      web3Inst_BNB,
      contractInstDrift_ETH,
      contractInstDrift_BNB,
      contractInstDrift_POLYGON,
    },
    { rejectWithValue }
  ) => {
    try {
      const OwnerAddress = process.env.REACT_APP_OWNER_ADDRESS;
      const Claim_ETH = process.env.REACT_APP_CLAIM_ETH;
      const Claim_BNB = process.env.REACT_APP_CLAIM_BNB;
      const Claim_POLYGON = process.env.REACT_APP_CLAIM_POLYGON;

      const [tokensToClaim_ETH] = await makeBatchRequest(web3Inst_ETH, [
        contractInstDrift_ETH.methods.allowance(OwnerAddress, Claim_ETH).call,
      ]);

      const [tokensToClaim_BNB] = await makeBatchRequest(web3Inst_BNB, [
        contractInstDrift_BNB.methods.allowance(OwnerAddress, Claim_BNB).call,
      ]);

      const [tokensToClaim_POLYGON] = await makeBatchRequest(web3Inst_POLYGON, [
        contractInstDrift_POLYGON.methods.allowance(OwnerAddress, Claim_POLYGON)
          .call,
      ]);

      const tokensToClaim = ConvertNumber(
        Number(tokensToClaim_ETH) +
          Number(tokensToClaim_BNB) +
          Number(tokensToClaim_POLYGON),
        true
      );
      return { tokensToClaim };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);
export const LoadPoolData = createAsyncThunk(
  "LoadPoolData",
  async ({ web3Inst, contractInstStakePool }, { rejectWithValue }) => {
    try {
      const [
        apy,
        total_pending_reward,
        total_staked,
        stake_end_deadline,
        stake_info,
      ] = await makeBatchRequest(web3Inst, [
        contractInstStakePool.methods.calculateAPY().call,
        contractInstStakePool.methods.getTotalPendingRewards().call,
        contractInstStakePool.methods.totalStaked().call,
        contractInstStakePool.methods.stakeEndDeadline().call,
        contractInstStakePool.methods.stakeInfo().call,
      ]);

      return {
        apy,
        total_staked,
        total_pending_reward,
        stake_end_deadline,
        locked_time: stake_info?.lockedStake,
      };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);
export const LoadUser = createAsyncThunk(
  "LoadUser",
  async (data, { rejectWithValue }) => {
    const {
      web3Inst,
      contractInstICO,
      address,
      contractInstPresaleToken,
      contractInstClaim,
      claimAddress,
      contractInstStakePool,
      contractInstDriftStake,
      contractInstDrift,
      pool_address,
    } = data;

    try {
      const [
        balance,
        Staked,
        Dynamic,
        tokensToMove,
        is_allowed,
        stakeDrift,
        is_pool_allowed,
        dynamicDrift,
        Reward,
      ] = await makeBatchRequest(web3Inst, [
        contractInstPresaleToken.methods.balanceOf(address).call,
        contractInstICO.methods.amountOfAddressPerType(address, 1).call,
        contractInstICO.methods.amountOfAddressPerType(address, 0).call,
        contractInstClaim.methods.getStakeAmountOfDynamicToStake(address).call,
        contractInstPresaleToken.methods.allowance(address, claimAddress).call,
        contractInstDriftStake.methods.balanceOf(address).call,
        contractInstDriftStake.methods.allowance(address, pool_address).call,
        contractInstDrift.methods.balanceOf(address).call,
        contractInstStakePool.methods.getPendingRewards(address).call,
      ]);

      const stakedTime = await contractInstStakePool.methods
        .getUserInfo(address)
        .call();
      const result = {
        balance,
        Staked: ConvertNumber(Number(Staked) + Number(tokensToMove), true),
        Dynamic: ConvertNumber(Number(Dynamic) - Number(tokensToMove), true),
        is_allowed:
          Number(is_allowed) > 0 && Number(is_allowed) >= Number(balance),
        claimed:
          Number(balance) == 0 && (Number(Staked) > 0 || Number(Dynamic) > 0)
            ? true
            : false,
        is_pool_allowed: Number(is_pool_allowed) > 0,
        remaining_claim: Reward.pendingRewards,
        stakeDrift,
        stakedTime: stakedTime.lastStakedTime,
        dynamicDrift,
      };

      return result;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const GetUSDPrice = createAsyncThunk(
  "usdPrice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "ethereum,binancecoin,matic-network",
        {
          headers: {
            "x-cg-pro-api-key": "CG-1EK5GnU4Ka429EFRG5F3m7dy",
          },
        }
      );

      const price = response?.data;
      return price;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);
export const GetBridgeFee = createAsyncThunk(
  "GetBridgeFee",
  async (data, { rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);

export const blockchainSlice = createSlice({
  name: "BlockChain",
  initialState,
  reducers: {
    createInstance: (state, action) => {
      let web3Instance = new Web3(process.env.REACT_APP_RPC_ETH);
      let web3InstancePOLYGON = new Web3(process.env.REACT_APP_RPC_POLYGON);
      let web3InstanceBNB = new Web3(process.env.REACT_APP_RPC_BNB);

      if (action.payload?.walletProvider) {
        const { walletProvider, chainId } = action.payload;
        if (chainId === 1) {
          web3Instance = new Web3(walletProvider);
        } else if (chainId == 56) {
          web3InstanceBNB = new Web3(walletProvider);
        } else if (chainId == 137) {
          web3InstancePOLYGON = new Web3(walletProvider);
        }
      }

      state.web3Inst_ETH = web3Instance;
      state.contractInstICO_ETH = new web3Instance.eth.Contract(
        crowdSaleAbi_ETH,
        process.env.REACT_APP_CROWDSALE_ETH
      );

      state.contractInstPresaleToken_ETH = new web3Instance.eth.Contract(
        presaletokenAbi_ETH,
        process.env.REACT_APP_TOKEN_CONTRACT_ETH
      );
      state.contractInstClaim_ETH = new web3Instance.eth.Contract(
        claimAbi,
        process.env.REACT_APP_CLAIM_ETH
      );
      state.contractInstDrift_ETH = new web3Instance.eth.Contract(
        driftAbi,
        process.env.REACT_APP_DRIFT_ETH
      );
      // New Inst ETH
      state.contractInstDriftStake_ETH = new web3Instance.eth.Contract(
        driftStakeAbi,
        process.env.REACT_APP_ST_DRIFT_ETH
      );
      state.contractInstStakePool_ETH = new web3Instance.eth.Contract(
        driftStakePoolAbi,
        process.env.REACT_APP_ST_POOL_DRIFT_ETH
      );

      state.contractInstBridge_ETH = new web3Instance.eth.Contract(
        swapBridge_Abi,
        process.env.REACT_APP_BRIDGE_ETH
      );

      // BNB INS

      state.web3Inst_BNB = web3InstanceBNB;
      state.contractInstICO_BNB = new web3InstanceBNB.eth.Contract(
        crowdSaleAbi_BNB,
        process.env.REACT_APP_CROWDSALE_BNB
      );

      state.contractInstPresaleToken_BNB = new web3InstanceBNB.eth.Contract(
        presaletokenAbi_BNB,
        process.env.REACT_APP_TOKEN_CONTRACT_BNB
      );

      state.contractInstClaim_BNB = new web3InstanceBNB.eth.Contract(
        claimAbi,
        process.env.REACT_APP_CLAIM_BNB
      );

      state.contractInstDrift_BNB = new web3InstanceBNB.eth.Contract(
        driftAbi,
        process.env.REACT_APP_DRIFT_BNB
      );

      state.contractInstDriftStake_BNB = new web3InstanceBNB.eth.Contract(
        driftStakeAbi,
        process.env.REACT_APP_ST_DRIFT_BNB
      );
      state.contractInstStakePool_BNB = new web3InstanceBNB.eth.Contract(
        driftStakePoolAbi,
        process.env.REACT_APP_ST_POOL_DRIFT_BNB
      );
      state.contractInstBridge_BNB = new web3InstanceBNB.eth.Contract(
        swapBridge_Abi,
        process.env.REACT_APP_BRIDGE_BNB
      );

      // POLYGON INS

      state.web3Inst_POLYGON = web3InstancePOLYGON;
      state.contractInstICO_POLYGON = new web3InstancePOLYGON.eth.Contract(
        crowdSaleAbi_POLYGON,
        process.env.REACT_APP_CROWDSALE_POLYGON
      );
      state.contractInstPresaleToken_POLYGON =
        new web3InstancePOLYGON.eth.Contract(
          presaletokenAbi_POLYGON,
          process.env.REACT_APP_TOKEN_CONTRACT_POLYGON
        );

      state.contractInstClaim_POLYGON = new web3InstancePOLYGON.eth.Contract(
        claimAbi,
        process.env.REACT_APP_CLAIM_POLYGON
      );

      state.contractInstDrift_POLYGON = new web3InstancePOLYGON.eth.Contract(
        driftAbi,
        process.env.REACT_APP_DRIFT_POLYGON
      );

      state.contractInstDriftStake_POLYGON =
        new web3InstancePOLYGON.eth.Contract(
          driftStakeAbi,
          process.env.REACT_APP_ST_DRIFT_POLYGON
        );
      state.contractInstStakePool_POLYGON =
        new web3InstancePOLYGON.eth.Contract(
          driftStakePoolAbi,
          process.env.REACT_APP_ST_POOL_DRIFT_POLYGON
        );
      state.contractInstBridge_POLYGON = new web3InstancePOLYGON.eth.Contract(
        swapBridge_Abi,
        process.env.REACT_APP_BRIDGE_POLYGON
      );
    },

    UpdateUser: (state, action) => {
      if (action.payload) {
        state.user = { ...action.payload };
      } else {
        state.user = null;
      }
    },

    UpdateUSDPrice: (state, action) => {
      if (action.payload) {
        state.ethPrice = action.payload?.[0]?.current_price;
        state.bnbPrice = action.payload?.[1]?.current_price;
        state.maticPrice = action.payload?.[2]?.current_price;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadBlockchainData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoadBlockchainData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.publicBlockchainData = {
        ...state.publicBlockchainData,
        ...action.payload,
      };
    });
    builder.addCase(LoadBlockchainData.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(LoadUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = { ...action.payload };
    });
    builder.addCase(LoadUser.rejected, (state, action) => {
      state.isLoading = false;
      console.log("User Builder Rejected");
    });
    builder.addCase(LoadPoolData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoadPoolData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pool = { ...action.payload };
    });
    builder.addCase(LoadPoolData.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Pool Builder Rejected");
    });

    builder.addCase(GetUSDPrice.fulfilled, (state, action) => {
      if (action.payload) {
        state.ethPrice = action.payload?.[0]?.current_price;
        state.bnbPrice = action.payload?.[1]?.current_price;
        state.maticPrice = action.payload?.[2]?.current_price;
      }
    });
    builder.addCase(GetUSDPrice.rejected, (state, action) => {
      console.log("Builder Rejected GetUSDPrice");
    });

    builder.addCase(GetBridgeFee.fulfilled, (state, action) => {
      if (action.payload) {
        state.ethPrice = action.payload?.[0]?.current_price;
        state.bnbPrice = action.payload?.[1]?.current_price;
        state.maticPrice = action.payload?.[2]?.current_price;
      }
    });
    builder.addCase(GetBridgeFee.rejected, (state, action) => {
      console.log("Builder Rejected GetUSDPrice");
    });
  },
});

export const { createInstance, UpdateUser, UpdateUSDPrice } =
  blockchainSlice.actions;
export default blockchainSlice.reducer;
