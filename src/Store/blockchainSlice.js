import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import {
  crowdSaleAbi_BNB,
  crowdSaleAbi_ETH,
  crowdSaleAbi_POLYGON,
  tokenAbi_BNB,
  tokenAbi_ETH,
  tokenAbi_POLYGON,
} from "../config/abi";
import ConvertNumber from "../Helpers/ConvertNumber";
import axios from "axios";

const initialState = {
  contractInst: null,
  web3Inst: null,
  contractInstToken: null,
  contractInstBNB: null,
  web3InstBNB: null,
  contractInstTokenBNB: null,
  contractInstPOLYGON: null,
  web3InstPOLYGON: null,
  contractInstTokenPOLYGON: null,
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
      contractInstBNB,
      web3InstBNB,
      contractInstPOLYGON,
      web3InstPOLYGON,
    },
    { rejectWithValue }
  ) => {
    try {
      const stage = parseInt(await contractInst.methods.icoStage().call());
      // const stage = 4;

      const [
        totalFunds,
        ico_start_time,
        is_open,
        target,
        price,
        tokensTransferred,
        tokensTransferredLap2,
        tokensTransferredLap1,
        tokensTransferredWarmup,
        noOfAmbassadors,
        goldTierRaised,
        silverTierRaised,
        bronzeTierRaised,
        ambassadors_payout,
        silver_eligible,
        bronze_eligible,
        silver_commission,
        bronze_commission,
        staking_limit,
        token_staked,
      ] = await makeBatchRequest(web3Inst, [
        contractInst.methods.totalReceivedFunds().call,
        contractInst.methods.icoStartTime().call,
        contractInst.methods.isOpen().call,
        contractInst.methods.icoTarget(stage == 3 ? 2 : stage).call,
        contractInst.methods.prices(stage == 3 ? 2 : stage).call,
        contractInst.methods.tokensTransferred(stage == 3 ? 2 : stage).call,
        contractInst.methods.tokensTransferred(4).call,
        contractInst.methods.tokensTransferred(2).call,
        contractInst.methods.tokensTransferred(1).call,
        contractInst.methods.noOfAmbassadors().call,
        contractInst.methods.totalTierRaised(stage == 3 ? 2 : stage, 1).call,
        contractInst.methods.totalTierRaised(stage == 3 ? 2 : stage, 2).call,
        contractInst.methods.totalTierRaised(stage == 3 ? 2 : stage, 3).call,
        contractInst.methods.AmbassadorPayout().call,
        contractInst.methods.eligibleSilverAmbassador().call,
        contractInst.methods.eligibleBronzeAmbassador().call,
        contractInst.methods.percent(2, 0).call,
        contractInst.methods.percent(3, 0).call,
        contractInst.methods.stakingLimit().call,
        contractInst.methods.noOfTokens(1).call,
      ]);
      const [
        totalFundsBNB,
        is_openBNB,
        targetBNB,
        tokensTransferredBNB,
        tokensTransferredLap2BNB,
        tokensTransferredLap1BNB,
        noOfAmbassadorsBNB,
        goldTierRaisedBNB,
        silverTierRaisedBNB,
        bronzeTierRaisedBNB,
        ambassadors_payoutBNB,
        silver_eligibleBNB,
        bronze_eligibleBNB,
        token_stakedBNB,
      ] = await makeBatchRequest(web3InstBNB, [
        contractInstBNB.methods.totalReceivedFunds().call,
        contractInstBNB.methods.isOpen().call,
        contractInstBNB.methods.icoTarget(stage == 3 ? 2 : stage).call,
        contractInstBNB.methods.tokensTransferred(stage == 3 ? 2 : stage).call,
        contractInstBNB.methods.tokensTransferred(4).call,
        contractInstBNB.methods.tokensTransferred(2).call,
        contractInstBNB.methods.noOfAmbassadors().call,
        contractInstBNB.methods.totalTierRaised(stage == 3 ? 2 : stage, 1).call,
        contractInstBNB.methods.totalTierRaised(stage == 3 ? 2 : stage, 2).call,
        contractInstBNB.methods.totalTierRaised(stage == 3 ? 2 : stage, 3).call,
        contractInstBNB.methods.AmbassadorPayout().call,
        contractInstBNB.methods.eligibleSilverAmbassador().call,
        contractInstBNB.methods.eligibleBronzeAmbassador().call,
        contractInstBNB.methods.noOfTokens(1).call,
      ]);
      const [
        totalFundsPOLYGON,
        is_openPOLYGON,
        targetPOLYGON,
        tokensTransferredPOLYGON,
        tokensTransferredLap2POLYGON,
        noOfAmbassadorsPOLYGON,
        goldTierRaisedPOLYGON,
        silverTierRaisedPOLYGON,
        bronzeTierRaisedPOLYGON,
        ambassadors_payoutPOLYGON,
        silver_eligiblePOLYGON,
        bronze_eligiblePOLYGON,
        token_stakedPOLYGON,
      ] = await makeBatchRequest(web3InstPOLYGON, [
        contractInstPOLYGON.methods.totalReceivedFunds().call,
        contractInstPOLYGON.methods.isOpen().call,
        contractInstPOLYGON.methods.icoTarget(stage == 3 ? 2 : stage).call,
        contractInstPOLYGON.methods.tokensTransferred(stage == 3 ? 2 : stage)
          .call,
        contractInstPOLYGON.methods.tokensTransferred(4).call,
        contractInstPOLYGON.methods.noOfAmbassadors().call,
        contractInstPOLYGON.methods.totalTierRaised(stage == 3 ? 2 : stage, 1)
          .call,
        contractInstPOLYGON.methods.totalTierRaised(stage == 3 ? 2 : stage, 2)
          .call,
        contractInstPOLYGON.methods.totalTierRaised(stage == 3 ? 2 : stage, 3)
          .call,
        contractInstPOLYGON.methods.AmbassadorPayout().call,
        contractInstPOLYGON.methods.eligibleSilverAmbassador().call,
        contractInstPOLYGON.methods.eligibleBronzeAmbassador().call,
        contractInstPOLYGON.methods.noOfTokens(1).call,
      ]);

      const ambassadorsList = await contractInst.methods
        .getAmbassadorList()
        .call();
      const ambassadorsListBNB = await contractInstBNB.methods
        .getAmbassadorList()
        .call();
      const ambassadorsListPOLYGON = await contractInstPOLYGON.methods
        .getAmbassadorList()
        .call();

      let batch = [];
      let batchBNB = [];
      let batchPOLYGON = [];

      ambassadorsList.forEach((item) => {
        batch.push(contractInst.methods.getAmbassadorInfo(item).call);
      });
      const ambassadors =
        batch.length > 0 ? await makeBatchRequest(web3Inst, batch) : [];

      ambassadorsListBNB.forEach((item) => {
        batchBNB.push(contractInstBNB.methods.getAmbassadorInfo(item).call);
      });
      const ambassadorsBNB =
        batchBNB.length > 0
          ? await makeBatchRequest(web3InstBNB, batchBNB)
          : [];

      ambassadorsListPOLYGON.forEach((item) => {
        batchPOLYGON.push(
          contractInstPOLYGON.methods.getAmbassadorInfo(item).call
        );
      });
      const ambassadorsPOLYGON =
        batchPOLYGON.length > 0
          ? await makeBatchRequest(web3InstPOLYGON, batchPOLYGON)
          : [];

      return {
        total_funds_raised: ConvertNumber(totalFunds, true),
        total_funds_raisedBNB: ConvertNumber(totalFundsBNB, true),
        total_funds_raisedPOLYGON: ConvertNumber(totalFundsPOLYGON, true),
        ico_stage: stage,
        is_open,
        is_openBNB,
        is_openPOLYGON,
        ico_start_time,
        ico_price: Web3.utils.fromWei(price, "ether"),
        ico_target: ConvertNumber(
          Number(target) + Number(targetBNB) + Number(targetPOLYGON),
          true
        ),
        ico_token_transferred: ConvertNumber(
          Number(tokensTransferred) +
            Number(tokensTransferredBNB) +
            Number(tokensTransferredPOLYGON),
          true
        ),

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
        ico_targetBNB: ConvertNumber(targetBNB, true),
        ico_targetPOLYGON: ConvertNumber(targetPOLYGON, true),
        no_of_ambassadors: parseInt(noOfAmbassadors),
        no_of_ambassadorsBNB: parseInt(noOfAmbassadorsBNB),
        no_of_ambassadorsPOLYGON: parseInt(noOfAmbassadorsPOLYGON),
        gold_tier_raised: ConvertNumber(goldTierRaised, true),
        silver_tier_raised: ConvertNumber(silverTierRaised, true),
        bronze_tier_raised: ConvertNumber(bronzeTierRaised, true),
        ambassadors_payout: ConvertNumber(ambassadors_payout, true),
        gold_tier_raisedBNB: ConvertNumber(goldTierRaisedBNB, true),
        silver_tier_raisedBNB: ConvertNumber(silverTierRaisedBNB, true),
        bronze_tier_raisedBNB: ConvertNumber(bronzeTierRaisedBNB, true),
        ambassadors_payoutBNB: ConvertNumber(ambassadors_payoutBNB, true),
        gold_tier_raisedPOLYGON: ConvertNumber(goldTierRaisedPOLYGON, true),
        silver_tier_raisedPOLYGON: ConvertNumber(silverTierRaisedPOLYGON, true),
        bronze_tier_raisedPOLYGON: ConvertNumber(bronzeTierRaisedPOLYGON, true),
        ambassadors_payoutPOLYGON: ConvertNumber(
          ambassadors_payoutPOLYGON,
          true
        ),
        silver_eligible,
        bronze_eligible,
        silver_eligibleBNB,
        bronze_eligibleBNB,
        silver_eligiblePOLYGON,
        bronze_eligiblePOLYGON,
        // ambassadors_list: abc.slice(0, 10),
        ambassadors_list: {
          ETH: ambassadors,
          BNB: ambassadorsBNB,
          POLYGON: ambassadorsPOLYGON,
        },
        silver_commission: silver_commission / 100,
        bronze_commission: bronze_commission / 100,
        // staking_limit: ConvertNumber(staking_limit, true),
        staking_limit: 2000000000,
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

      const info = contractInst.methods.getAmbassadorInfo(address).call();

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
        tokenAbi_BNB,
        process.env.REACT_APP_TOKEN_CONTRACT_BNB
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
        tokenAbi_POLYGON,
        process.env.REACT_APP_TOKEN_CONTRACT_POLYGON
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
