import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
  claimAbi_ETH,
  crowdSaleAbi_BNB,
  crowdSaleAbi_ETH,
  tokenAbi_BNB,
  tokenAbi_ETH,
} from "../config/abi";
import ConvertNumber from "../Helpers/ConvertNumber";
import axios from "axios";

const initialState = {
  contractInst: null,
  web3Inst: null,
  contractInstToken: null,
  contractInstClaim: null,
  // contractInstBNB: null,
  // web3InstBNB: null,
  // contractInstTokenBNB: null,

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
      contractInst,
      web3Inst,
      // , contractInstBNB, web3InstBNB
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
      ] = await makeBatchRequest(web3Inst, [
        contractInst.methods.totalReceivedFunds().call,

        contractInst.methods.tokensTransferred(4).call,
        contractInst.methods.tokensTransferred(2).call,
        contractInst.methods.tokensTransferred(1).call,
      ]);
      // const [
      //   totalFundsBNB,

      //   tokensTransferredLap2BNB,
      //   tokensTransferredLap1BNB,
      // ] = await makeBatchRequest(web3InstBNB, [
      //   contractInstBNB.methods.totalReceivedFunds().call,

      //   contractInstBNB.methods.tokensTransferred(4).call,
      //   contractInstBNB.methods.tokensTransferred(2).call,
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
    const { contractInst, address, contractInstToken } = data;

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

      return {
        balance: ConvertNumber(balance, true),
        Staked: ConvertNumber(Staked, true),
        Dynamic: ConvertNumber(Dynamic, true),
        invest_amount: total_investment,
        is_ambassador_eligible,
        ambassador_code,
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
        tokenAbi_ETH,
        process.env.REACT_APP_TOKEN_CONTRACT_ETH
      );

      state.contractInstClaim = new web3Instance.eth.Contract(
        claimAbi_ETH,
        process.env.REACT_APP_CLAIM_ETH
      );

      // BNB INS
      // let web3InstanceBNB = new Web3(process.env.REACT_APP_RPC_BNB);
      // if (action.payload?.walletProvider) {
      //   let { walletProvider } = action.payload;
      //   web3InstanceBNB = new Web3(walletProvider.provider);
      // }
      // state.web3InstBNB = web3InstanceBNB;
      // state.contractInstBNB = new web3InstanceBNB.eth.Contract(
      //   crowdSaleAbi_BNB,
      //   process.env.REACT_APP_CROWDSALE_BNB
      // );

      // state.contractInstTokenBNB = new web3InstanceBNB.eth.Contract(
      //   tokenAbi_BNB,
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
