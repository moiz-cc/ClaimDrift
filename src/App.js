import "./App.css";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import Utilities from "./Pages/Utilities";
import Ambassador from "./Pages/Ambassador";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalState,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
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
import CrossSwap from "./Pages/CrossSwap.js";
import Tokenomics from "./Pages/Tokenomics.js";
import { metadata, ethereum, polygon, bnb, projectId } from "./config";
function App() {
  const [isModalCreated, setIsModalCreated] = useState(false);
  const CreateWeb3Modal = () => {
    if (!isModalCreated) {
      createWeb3Modal({
        themeMode: "light",
        ethersConfig: defaultConfig({ metadata }),
        chains: [ethereum, bnb, polygon],
        projectId,
      });
      setIsModalCreated(true);
    }
  };
  CreateWeb3Modal();
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
  const { walletProvider } = useWeb3ModalProvider();

  const [isWeb3InstanceConnect, setIsWeb3InstanceConnect] = useState(false);
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();

  const getBlockchainData = () => {
    if (
      contractInstDrift_ETH &&
      contractInstDrift_BNB &&
      contractInstDrift_POLYGON &&
      web3Inst_ETH &&
      web3Inst_BNB &&
      web3Inst_POLYGON
    ) {
      dispatch(
        LoadBlockchainData({
          web3Inst_ETH,
          web3Inst_BNB,
          web3Inst_POLYGON,
          contractInstDrift_ETH,
          contractInstDrift_BNB,
          contractInstDrift_POLYGON,
        })
      );
    }
  };
  const getUserData = async () => {
    if (isConnected && typeof address !== "undefined") {
      if (selectedNetworkId === 1 && chainId === 1) {
        dispatch(
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
        );
      } else if (selectedNetworkId === 56 && chainId === 56) {
        dispatch(
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
        );
      } else if (selectedNetworkId === 137 && chainId === 137) {
        dispatch(
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
        );
      } else {
        dispatch(UpdateUser(null));
      }
    } else {
      dispatch(UpdateUser(null));
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
  const LoadContract = () => {
    if (isConnected && walletProvider && chainId) {
      dispatch(createInstance({ walletProvider, chainId }));
      setIsWeb3InstanceConnect(true);
    } else {
      dispatch(createInstance());
    }
    if (
      contractInstDrift_ETH &&
      contractInstDrift_BNB &&
      contractInstDrift_POLYGON &&
      web3Inst_ETH &&
      web3Inst_BNB &&
      web3Inst_POLYGON
    ) {
      getBlockchainData();
    }
  };

  useEffect(() => {
    LoadContract();
  }, [isConnected, chainId]);

  useEffect(() => {
    if (isConnected && walletProvider && address && chainId) {
      getUserData();
      getPoolData();
    }
  }, [
    isConnected,
    walletProvider,
    isWeb3InstanceConnect,
    selectedNetworkId,
    chainId,
  ]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/ambassador" element={<Ambassador />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/staking-portal" element={<Staking />} />
        <Route path="/cross-swap" element={<CrossSwap />} />
        <Route path="/03052024tok" element={<Tokenomics />} />
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
