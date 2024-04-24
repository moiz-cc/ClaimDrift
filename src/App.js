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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useWeb3ModalAccount,
  useWeb3ModalSigner,
} from "@web3modal/ethers5/react";
import {
  GetUSDPrice,
  UpdateUSDPrice,
  createInstance,
  LoadBlockchainData,
  UpdateUser,
} from "./Store/blockchainSlice.js";
import { LoadUser } from "./Store/blockchainSlice.js";
import axios from "axios";
import PrivacyPolicy from "./Pages/PrivacyPolicy.js";
import PriceRiskDisclosure from "./Pages/PriceRiskDisclosure.js";
import Staking from "./Pages/Staking.js";

function App() {
  const dispatch = useDispatch();
  const {
    web3Inst,
    contractInst,
    contractInstToken,
    contractInstDrift,
    contractInstClaim,

    web3InstBNB,
    contractInstBNB,
    contractInstTokenBNB,
    contractInstDriftBNB,
    contractInstClaimBNB,

    web3InstPOLYGON,
    contractInstTokenPOLYGON,
    contractInstPOLYGON,
    contractInstDriftPOLYGON,
    contractInstClaimPOLYGON,
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
  const _timeout = useRef(null);

  const getBlockchainData = () => {
    if (contractInst && contractInstBNB && contractInstPOLYGON) {
      dispatch(
        LoadBlockchainData({
          contractInst,
          web3Inst,
          contractInstDrift,

          contractInstBNB,
          web3InstBNB,
          contractInstDriftBNB,

          contractInstPOLYGON,
          web3InstPOLYGON,
          contractInstDriftPOLYGON,
        })
      );
    }
  };

  const loadUserData = async () => {
    if (isConnected && typeof address !== "undefined") {
      selectedNetworkId === 1
        ? dispatch(
            LoadUser({
              contractInst,
              address: address.trim(),
              contractInstToken,

              contractInstClaim,
            })
          )
        : selectedNetworkId === 56
        ? dispatch(
            LoadUser({
              contractInst: contractInstBNB,
              address: address.trim(),
              contractInstToken: contractInstTokenBNB,

              contractInstClaim: contractInstClaimBNB,
            })
          )
        : selectedNetworkId === 137
        ? dispatch(
            LoadUser({
              contractInst: contractInstPOLYGON,
              address: address.trim(),
              contractInstToken: contractInstTokenPOLYGON,

              contractInstClaim: contractInstClaimPOLYGON,
            })
          )
        : dispatch(UpdateUser(null));
    }
  };

  const loadcontract = () => {
    dispatch(createInstance());
  };

  useEffect(() => {
    if (!contractInst) {
      loadcontract();
    }
    dispatch(GetUSDPrice());
    getBlockchainData();
  }, [contractInst, contractInstBNB, contractInstPOLYGON]);

  useEffect(() => {
    if (isConnected && walletProvider?.provider && !isWeb3InstanceConnect) {
      dispatch(createInstance({ walletProvider }));
      setIsWeb3InstanceConnect(true);
    }
    loadUserData();
  }, [isConnected, walletProvider, isWeb3InstanceConnect, address]);

  useEffect(() => {
    const InterID = setInterval(() => {
      if (_timeout.current !== null && _timeout.current > Date.now()) return;
      _timeout.current = null;

      axios
        .get(
          process.env.REACT_APP_BASE_URL + "ethereum,binancecoin,matic-network",
          {
            headers: {
              "x-cg-pro-api-key": "CG-1EK5GnU4Ka429EFRG5F3m7dy",
            },
          }
        )
        .then((response) => {
          dispatch(UpdateUSDPrice(response.data));
        })
        .catch((e) => {
          console.log(e.message);
          _timeout.current = new Date().getTime() + 60;
        });
    }, 10000);
    return () => {
      clearInterval(InterID);
    };
  }, [selectedNetworkId]);

  useEffect(() => {}, [address, isConnected]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/ambassador" element={<Ambassador />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/stake" element={<Staking />} />
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
