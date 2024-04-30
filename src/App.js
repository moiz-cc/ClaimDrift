import "./Css/App.css";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalState,
} from "@web3modal/ethers5/react";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import Utilities from "./Pages/Utilities";
import Ambassador from "./Pages/Ambassador";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useWeb3ModalAccount,
  useWeb3ModalSigner,
} from "@web3modal/ethers5/react";
import {
  createInstance,
  LoadBlockchainData,
  UpdateUser,
} from "./Store/blockchainSlice.js";
import { LoadUser, LoadPoolData } from "./Store/blockchainSlice.js";

import PrivacyPolicy from "./Pages/PrivacyPolicy.js";
import PriceRiskDisclosure from "./Pages/PriceRiskDisclosure.js";
import Staking from "./Pages/Staking.js";

function App() {
  const dispatch = useDispatch();
  const {
    web3Inst_ETH,
    contractInstICO_ETH,
    contractInstPresaleToken_ETH,
    contractInstDrift_ETH,
    contractInstClaim_ETH,
    contractInstDriftStake_ETH,
    contractInstStakePool_ETH,
    web3Inst_BNB,
    contractInstICO_BNB,
    contractInstPresaleToken_BNB,
    contractInstDrift_BNB,
    contractInstClaim_BNB,
    contractInstDriftStake_BNB,
    contractInstStakePool_BNB,
    web3Inst_POLYGON,
    contractInstPresaleToken_POLYGON,
    contractInstICO_POLYGON,
    contractInstDrift_POLYGON,
    contractInstClaim_POLYGON,
    contractInstDriftStake_POLYGON,
    contractInstStakePool_POLYGON,
  } = useSelector((state) => state.Blockchain);
  const { walletProvider } = useWeb3ModalSigner();

  // 1. Get projectId
  const projectId = process.env.REACT_APP_PROJECT_ID;

  // 2. Set chains
  const bnb = {
    chainId: 56,
    name: "BNB Chain",
    currency: "BNB",
    explorerUrl: "https://bscscan.com/",
    rpcUrl: process.env.REACT_APP_RPC_BNB,
  };

  const ethereum = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: process.env.REACT_APP_RPC_ETH,
  };

  const polygon = {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: process.env.REACT_APP_RPC_POLYGON,
  };

  // 3. Create modal
  const metadata = {
    name: "Drift Token",
    description: "A Web3 project like no other",
    url: "https://drifttoken.io",
    icons: [
      "https://drifttoken.io/static/media/Drift-Logo.455e45448280600e784a21edef0be300.svg",
    ],
  };

  createWeb3Modal({
    themeMode: "light",
    ethersConfig: defaultConfig({ metadata }),
    chains: [ethereum, bnb, polygon],

    projectId,
  });

  const [isWeb3InstanceConnect, setIsWeb3InstanceConnect] = useState(false);

  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();

  const getBlockchainData = () => {
    if (
      contractInstDrift_ETH &&
      contractInstDrift_BNB &&
      contractInstDrift_POLYGON
    ) {
      dispatch(
        LoadBlockchainData({
          web3Inst_ETH,
          contractInstDrift_ETH,
          web3Inst_BNB,
          contractInstDrift_BNB,
          web3Inst_POLYGON,
          contractInstDrift_POLYGON,
        })
      );
    }
  };

  const getUserData = async () => {
    if (isConnected && typeof address !== "undefined") {
      selectedNetworkId === 1 || chainId === 1
        ? dispatch(
            LoadUser({
              web3Inst: web3Inst_ETH,
              contractInstICO: contractInstICO_ETH,
              address: address,
              contractInstPresaleToken: contractInstPresaleToken_ETH,
              contractInstClaim: contractInstClaim_ETH,
              claimAddress: process.env.REACT_APP_CLAIM_ETH,
              contractInstStakePool: contractInstStakePool_ETH,
              contractInstDriftStake: contractInstDriftStake_ETH,
              contractInstDrift: contractInstDrift_ETH,
              pool_address: process.env.REACT_APP_ST_POOL_DRIFT_ETH,
            })
          )
        : selectedNetworkId === 56 || chainId === 56
        ? dispatch(
            LoadUser({
              web3Inst: web3Inst_BNB,
              contractInstICO: contractInstICO_BNB,
              address: address,
              contractInstPresaleToken: contractInstPresaleToken_BNB,
              contractInstClaim: contractInstClaim_BNB,
              claimAddress: process.env.REACT_APP_CLAIM_BNB,
              contractInstStakePool: contractInstStakePool_BNB,
              contractInstDriftStake: contractInstDriftStake_BNB,
              contractInstDrift: contractInstDrift_BNB,
              pool_address: process.env.REACT_APP_ST_POOL_DRIFT_BNB,
            })
          )
        : selectedNetworkId === 137 || chainId === 137
        ? dispatch(
            LoadUser({
              web3Inst: web3Inst_POLYGON,
              contractInstICO: contractInstICO_POLYGON,
              address: address,
              contractInstPresaleToken: contractInstPresaleToken_POLYGON,
              contractInstClaim: contractInstClaim_POLYGON,
              claimAddress: process.env.REACT_APP_CLAIM_POLYGON,
              contractInstStakePool: contractInstStakePool_POLYGON,
              contractInstDriftStake: contractInstDriftStake_POLYGON,
              contractInstDrift: contractInstDrift_POLYGON,
              pool_address: process.env.REACT_APP_ST_POOL_DRIFT_POLYGON,
            })
          )
        : dispatch(UpdateUser(null));
    }
  };
  const getPoolData = async () => {
    if (isConnected && typeof address !== "undefined") {
      selectedNetworkId === 1 || chainId === 1 ? (
        dispatch(
          LoadPoolData({
            web3Inst: web3Inst_ETH,
            contractInstStakePool: contractInstStakePool_ETH,
          })
        )
      ) : selectedNetworkId === 56 || chainId === 56 ? (
        dispatch(
          LoadPoolData({
            web3Inst: web3Inst_BNB,
            contractInstStakePool: contractInstStakePool_BNB,
          })
        )
      ) : selectedNetworkId === 137 || chainId === 137 ? (
        dispatch(
          LoadPoolData({
            web3Inst: web3Inst_POLYGON,
            contractInstStakePool: contractInstStakePool_POLYGON,
          })
        )
      ) : (
        <></>
      );
    }
  };

  const loadcontract = () => {
    dispatch(createInstance());
  };

  useEffect(() => {
    if (
      !contractInstDrift_ETH ||
      !contractInstDrift_BNB ||
      !contractInstDrift_POLYGON
    ) {
      loadcontract();
    }

    getBlockchainData();
  }, [contractInstDrift_ETH, contractInstDrift_BNB, contractInstDrift_POLYGON]);

  useEffect(() => {
    if (isConnected && walletProvider?.provider && !isWeb3InstanceConnect) {
      dispatch(createInstance({ walletProvider }));
      setIsWeb3InstanceConnect(true);
    }
    getUserData();
    getPoolData();
  }, [
    isConnected,
    walletProvider,
    isWeb3InstanceConnect,
    address,
    selectedNetworkId,
    chainId,
  ]);

  useEffect(() => {
    getUserData();
    getPoolData();
  }, [address, isConnected]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/ambassador" element={<Ambassador />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/staking-portal" element={<Staking />} />
        <Route
          path="/price-risk-disclosure"
          element={<PriceRiskDisclosure />}
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
