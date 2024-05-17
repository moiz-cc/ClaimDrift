import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
  claimAbi_ETH,
  crowdSaleAbi_BNB,
  crowdSaleAbi_ETH,
  driftAbi_ETH,
  driftStakeAbi_ETH,
  driftStakePoolAbi_ETH,
  presaletokenAbi_BNB,
  presaletokenAbi_ETH,
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

  contractInstICO_BNB: null,
  web3Inst_BNB: null,
  contractInstTokenBNB: null,
  contractInstClaimBNB: null,
  contractInstICO_POLYGON: null,
  web3Inst_POLYGON: null,
  contractInstTokenPOLYGON: null,
  contractInstClaimPOLYGON: null,
  user: null,
  publicBlockchainData: null,
  ethPrice: null,
  bnbPrice: null,
  maticPrice: null,
  ambassadorList: null,
  isLoading: false,
  error: null,
};

export const makeBatchRequest = async (web3, calls) => {
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
  return Promise.all([...promises]);
};

export const LoadBlockchainData = createAsyncThunk(
  "LoadBlockchainData",
  async (
    {
      contractInstICO_ETH,
      web3Inst_ETH,
      contractInstDrift_ETH,
      contractInstStakePool_ETH,

      // , contractInstICO_BNB, web3Inst_BNB
    },
    { rejectWithValue }
  ) => {
    try {
      // const stage = 4;

      const [
        totalFunds,
        tokensTransferredLap2,
        tokensTransferredLap1,
        tokensTransferredWarmup,
        tokensToClaim,
      ] = await makeBatchRequest(web3Inst_ETH, [
        contractInstICO_ETH.methods.totalReceivedFunds().call,
        contractInstICO_ETH.methods.tokensTransferred(4).call,
        contractInstICO_ETH.methods.tokensTransferred(2).call,
        contractInstICO_ETH.methods.tokensTransferred(1).call,
        contractInstDrift_ETH.methods.allowance(
          process.env.REACT_APP_OWNER_ADDRESS,
          process.env.REACT_APP_CLAIM_ETH
        ).call,
      ]);
      const apy = await contractInstStakePool_ETH.methods.calculateAPY().call();
      const total_pending_reward = await contractInstStakePool_ETH.methods
        .getTotalPendingRewards()
        .call();
      const total_staked = await contractInstStakePool_ETH.methods
        .totalStaked()
        .call();
      const stake_end_deadline = await contractInstStakePool_ETH.methods
        .stakeEndDeadline()
        .call();

      // const [
      //   totalFundsBNB,

      //   tokensTransferredLap2BNB,
      //   tokensTransferredLap1BNB,
      // ] = await makeBatchRequest(web3Inst_BNB, [
      //   contractInstICO_BNB.methods.totalReceivedFunds().call,

      //   contractInstICO_BNB.methods.tokensTransferred(4).call,
      //   contractInstICO_BNB.methods.tokensTransferred(2).call,
      // ]);

      return {
        total_funds_raised: ConvertNumber(totalFunds, true),
        // total_funds_raisedBNB: ConvertNumber(totalFundsBNB, true),

        tokensTransferredLap2: ConvertNumber(
          Number(tokensTransferredLap2),
          // + Number(tokensTransferredLap2BNB)
          true
        ),
        tokensTransferredLap1: ConvertNumber(
          Number(tokensTransferredLap1),
          // + Number(tokensTransferredLap1BNB)
          true
        ),
        tokensTransferredWarmup: ConvertNumber(
          Number(tokensTransferredWarmup),
          true
        ),

        tokensToClaim: ConvertNumber(Number(tokensToClaim), true),

        apy,

        total_pending_reward,
        total_staked,

        stake_end_deadline,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const LoadUser = createAsyncThunk(
  "LoadUser",
  async (data, { rejectWithValue }) => {
    const {
      contractInstICO_ETH,
      address,
      contractInstPresaleToken_ETH,
      claim_address,
      contractInstClaim_ETH,
      contractInstStakePool_ETH,
      contractInstDriftStake_ETH,
      contractInstDrift_ETH,
      pool_address,
    } = data;

    try {
      const balance = await contractInstPresaleToken_ETH.methods
        .balanceOf(address)
        .call();
      const Staked = await contractInstICO_ETH.methods
        .amountOfAddressPerType(address, 1)
        .call();
      const Dynamic = await contractInstICO_ETH.methods
        .amountOfAddressPerType(address, 0)
        .call();

      const is_allowed = await contractInstPresaleToken_ETH.methods
        .allowance(address, claim_address)
        .call();

      const tokensToMove = await contractInstClaim_ETH.methods
        .getStakeAmountOfDynamicToStake(address)
        .call();

      const stakeDrift = await contractInstDriftStake_ETH.methods
        .balanceOf(address)
        .call();

      const is_pool_allowed = await contractInstDriftStake_ETH.methods
        .allowance(address, pool_address)
        .call();

      const dynamicDrift = await contractInstDrift_ETH.methods
        .balanceOf(address)
        .call();
      const Reward = await contractInstStakePool_ETH.methods
        .getPendingRewards(address)
        .call();

      return {
        balance,
        Staked: ConvertNumber(Number(Staked) + Number(tokensToMove), true),
        Dynamic: ConvertNumber(Number(Dynamic) - Number(tokensToMove), true),
        is_pool_allowed: is_pool_allowed > 0,

        remaining_claim: Reward.pendingRewards,
        dynamicDrift,
        stakeDrift,
        claimed: (balance == 0 && Staked > 0) || Dynamic > 0 ? true : false,
        is_allowed: is_allowed >= balance && balance !== 0,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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

export const blockchainSlice = createSlice({
  name: "BlockChain",
  initialState,
  reducers: {
    createInstance: (state, action) => {
      let web3Instance = new Web3(process.env.REACT_APP_RPC_ETH);
      if (action.payload?.walletProvider) {
        let { walletProvider } = action.payload;
        web3Instance = new Web3(walletProvider);
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
        claimAbi_ETH,
        process.env.REACT_APP_CLAIM_ETH
      );
      state.contractInstDrift_ETH = new web3Instance.eth.Contract(
        driftAbi_ETH,
        process.env.REACT_APP_DRIFT_ETH
      );
      state.contractInstDriftStake_ETH = new web3Instance.eth.Contract(
        driftStakeAbi_ETH,
        process.env.REACT_APP_ST_DRIFT_ETH
      );
      state.contractInstStakePool_ETH = new web3Instance.eth.Contract(
        driftStakePoolAbi_ETH,
        process.env.REACT_APP_ST_POOL_DRIFT_ETH
      );

      // BNB INS
      // let web3InstanceBNB = new Web3(process.env.REACT_APP_RPC_BNB);
      // if (action.payload?.walletProvider) {
      //   let { walletProvider } = action.payload;
      //   web3InstanceBNB = new Web3(walletProvider);
      // }
      // state.web3Inst_BNB = web3InstanceBNB;
      // state.contractInstICO_BNB = new web3InstanceBNB.eth.Contract(
      //   crowdSaleAbi_BNB,
      //   process.env.REACT_APP_CROWDSALE_BNB
      // );

      // state.contractInstTokenBNB = new web3InstanceBNB.eth.Contract(
      //   presaletokenAbi_BNB,
      //   process.env.REACT_APP_TOKEN_CONTRACT_BNB
      // );
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

      // state.ambassadorList = [...action.payload.ambassadors_list];
      state.ambassadorList = action.payload.ambassadors_list;
      state.publicBlockchainData = { ...action.payload };
    });
    builder.addCase(LoadBlockchainData.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Builder Rejected");
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
      console.log("Builder Rejected");
    });
    builder.addCase(GetUSDPrice.pending, (state, action) => {});
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
  },
});

export const { createInstance, UpdateUser, UpdateUSDPrice } =
  blockchainSlice.actions;
export default blockchainSlice.reducer;
