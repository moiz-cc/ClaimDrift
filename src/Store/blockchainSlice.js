import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
  claimAbi_BNB,
  claimAbi_ETH,
  claimAbi_POLYGON,
  crowdSaleAbi_BNB,
  crowdSaleAbi_ETH,
  crowdSaleAbi_POLYGON,
  driftAbi,
  driftAbi_BNB,
  driftAbi_POLYGON,
  presaletokenAbi_BNB,
  presaletokenAbi_ETH,
  presaletokenAbi_POLYGON,
} from "../config/abi";
import ConvertNumber from "../Helpers/ConvertNumber";
import axios from "axios";

const initialState = {
  contractInst: null,
  web3Inst: null,
  contractInstToken: null,
  contractInstClaim: null,
  contractInstDrift: null,
  contractInstBNB: null,
  web3InstBNB: null,
  contractInstTokenBNB: null,
  contractInstClaimBNB: null,
  contractInstPOLYGON: null,
  web3InstPOLYGON: null,
  contractInstTokenPOLYGON: null,
  contractInstClaimPOLYGON: null,
  contractInstDriftBNB: null,
  contractInstDriftPOLYGON: null,
  user: null,
  publicBlockchainData: null,
  ethPrice: null,
  bnbPrice: null,
  maticPrice: null,
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
      contractInst,
      web3Inst,
      contractInstDrift,
      contractInstBNB,
      web3InstBNB,
      contractInstDriftBNB,
      contractInstPOLYGON,
      web3InstPOLYGON,
      contractInstDriftPOLYGON,
    },
    { rejectWithValue }
  ) => {
    try {
      // const stage = 4;

      const [
        tokensTransferredLap2,
        tokensTransferredLap1,
        tokensTransferredWarmup,
        token_staked,
        tokensToClaim_ETH,
      ] = await makeBatchRequest(web3Inst, [
        contractInst.methods.tokensTransferred(4).call,
        contractInst.methods.tokensTransferred(2).call,
        contractInst.methods.tokensTransferred(1).call,
        contractInst.methods.noOfTokens(1).call,
        contractInstDrift.methods.allowance(
          process.env.REACT_APP_OWNER_ADDRESS,
          process.env.REACT_APP_CLAIM_ETH
        ).call,
      ]);

      const [
        tokensTransferredLap2BNB,
        tokensTransferredLap1BNB,
        token_stakedBNB,
        tokensToClaim_BNB,
      ] = await makeBatchRequest(web3InstBNB, [
        contractInstBNB.methods.tokensTransferred(4).call,
        contractInstBNB.methods.tokensTransferred(2).call,
        contractInstBNB.methods.noOfTokens(1).call,
        contractInstDriftBNB.methods.allowance(
          process.env.REACT_APP_OWNER_ADDRESS,
          process.env.REACT_APP_CLAIM_BNB
        ).call,
      ]);

      const [
        tokensTransferredLap2POLYGON,
        token_stakedPOLYGON,
        tokensToClaim_POLYGON,
      ] = await makeBatchRequest(web3InstPOLYGON, [
        contractInstPOLYGON.methods.tokensTransferred(4).call,
        contractInstPOLYGON.methods.noOfTokens(1).call,
        contractInstDriftPOLYGON.methods.allowance(
          process.env.REACT_APP_OWNER_ADDRESS,
          process.env.REACT_APP_CLAIM_POLYGON
        ).call,
      ]);

      return {
        tokensTransferredLap2: ConvertNumber(
          Number(tokensTransferredLap2) +
            Number(tokensTransferredLap2BNB) +
            Number(tokensTransferredLap2POLYGON),
          true
        ),
        tokensTransferredLap1: ConvertNumber(
          Number(tokensTransferredLap1) + Number(tokensTransferredLap1BNB),
          true
        ),
        tokensTransferredWarmup: ConvertNumber(
          Number(tokensTransferredWarmup),
          true
        ),
        staking_limit: 2000000000,

        tokensToClaim: ConvertNumber(
          Number(tokensToClaim_ETH) +
            Number(tokensToClaim_BNB) +
            Number(tokensToClaim_POLYGON),
          true
        ),
        token_staked: ConvertNumber(
          Number(token_staked) +
            Number(token_stakedBNB) +
            Number(token_stakedPOLYGON),
          true
        ),
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
      contractInst,
      address,
      contractInstToken,
      contractInstClaim,
      claimAddress,
    } = data;

    try {
      const balance = await contractInstToken.methods.balanceOf(address).call();
      const Staked = await contractInst.methods
        .amountOfAddressPerType(address, 1)
        .call();
      const Dynamic = await contractInst.methods
        .amountOfAddressPerType(address, 0)
        .call();

      const ambassador_code = await contractInst.methods
        .codeOfAddress(address)
        .call();

      const total_investment = await contractInst.methods
        .investAmount(address)
        .call();

      const is_ambassador_eligible = await contractInst.methods
        .isAmbassadorEligible(address)
        .call();

      const info = await contractInst.methods.getAmbassadorInfo(address).call();

      const tokensToMove = await contractInstClaim.methods
        .getStakeAmountOfDynamicToStake(address)
        .call();

      const is_allowed = await contractInstToken.methods
        .allowance(address, claimAddress)
        .call();

      return {
        balance,
        Staked: ConvertNumber(Number(Staked) + Number(tokensToMove), true),
        Dynamic: ConvertNumber(Number(Dynamic) - Number(tokensToMove), true),
        invest_amount: Number(total_investment),
        is_ambassador_eligible,
        is_allowed:
          Number(is_allowed) > 0 && Number(is_allowed) === Number(balance),
        ambassador_code,
        claimed:
          Number(balance) == 0 && (Number(Staked) > 0 || Number(Dynamic) > 0)
            ? true
            : false,
        tier: parseInt(info._tier),
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
        web3Instance = new Web3(walletProvider.provider);
      }
      state.web3Inst = web3Instance;
      state.contractInst = new web3Instance.eth.Contract(
        crowdSaleAbi_ETH,
        process.env.REACT_APP_CROWDSALE_ETH
      );
      state.contractInstToken = new web3Instance.eth.Contract(
        presaletokenAbi_ETH,
        process.env.REACT_APP_TOKEN_CONTRACT_ETH
      );
      state.contractInstClaim = new web3Instance.eth.Contract(
        claimAbi_ETH,
        process.env.REACT_APP_CLAIM_ETH
      );
      state.contractInstDrift = new web3Instance.eth.Contract(
        driftAbi,
        process.env.REACT_APP_DRIFT_ETH
      );

      // BNB INS
      let web3InstanceBNB = new Web3(process.env.REACT_APP_RPC_BNB);
      if (action.payload?.walletProvider) {
        let { walletProvider } = action.payload;
        web3InstanceBNB = new Web3(walletProvider.provider);
      }
      state.web3InstBNB = web3InstanceBNB;
      state.contractInstBNB = new web3InstanceBNB.eth.Contract(
        crowdSaleAbi_BNB,
        process.env.REACT_APP_CROWDSALE_BNB
      );

      state.contractInstTokenBNB = new web3InstanceBNB.eth.Contract(
        presaletokenAbi_BNB,
        process.env.REACT_APP_TOKEN_CONTRACT_BNB
      );

      state.contractInstClaimBNB = new web3InstanceBNB.eth.Contract(
        claimAbi_BNB,
        process.env.REACT_APP_CLAIM_BNB
      );

      state.contractInstDriftBNB = new web3InstanceBNB.eth.Contract(
        driftAbi_BNB,
        process.env.REACT_APP_DRIFT_BNB
      );
      // POLYGON INS
      let web3InstancePOLYGON = new Web3(process.env.REACT_APP_RPC_POLYGON);
      if (action.payload?.walletProvider) {
        let { walletProvider } = action.payload;
        web3InstancePOLYGON = new Web3(walletProvider.provider);
      }
      state.web3InstPOLYGON = web3InstancePOLYGON;
      state.contractInstPOLYGON = new web3InstancePOLYGON.eth.Contract(
        crowdSaleAbi_POLYGON,
        process.env.REACT_APP_CROWDSALE_POLYGON
      );
      state.contractInstTokenPOLYGON = new web3InstancePOLYGON.eth.Contract(
        presaletokenAbi_POLYGON,
        process.env.REACT_APP_TOKEN_CONTRACT_POLYGON
      );

      state.contractInstClaimPOLYGON = new web3InstancePOLYGON.eth.Contract(
        claimAbi_POLYGON,
        process.env.REACT_APP_CLAIM_POLYGON
      );

      state.contractInstDriftPOLYGON = new web3InstancePOLYGON.eth.Contract(
        driftAbi_POLYGON,
        process.env.REACT_APP_DRIFT_POLYGON
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
