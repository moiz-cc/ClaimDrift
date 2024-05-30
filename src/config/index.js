import PolygonIcon from "../Assets/Images/polygon-matic-logo.png";
import BNBIcon from "../Assets/Images/bnb-bnb-logo.png";
import EthereumIcon from "../Assets/Images/ethereum-eth-logo.png";

// 1. Get projectId
export const projectId = process.env.REACT_APP_PROJECT_ID;

// 2. Set chains
export const bnb = {
  chainId: 56,
  name: "BNB Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com/",
  rpcUrl: process.env.REACT_APP_RPC_BNB,
};

export const ethereum = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: process.env.REACT_APP_RPC_ETH,
};

export const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: process.env.REACT_APP_RPC_POLYGON,
};

// 3. Create modal
export const metadata = {
  name: "Drift Token",
  description: "A Web3 project like no other",
  url: "https://drifttoken.io",
  icons: [
    "https://drifttoken.io/static/media/Drift-Logo.455e45448280600e784a21edef0be300.svg",
  ],
};

export const SupportedChain = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    selector: "5009297550715157269",
    icon: EthereumIcon,
    value: "",
  },
  {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    selector: "4051577828743386545",
    icon: PolygonIcon,
    value: "",
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    currency: "BNB",
    selector: "11344663589394136015",
    icon: BNBIcon,
    value: "",
  },
];

export const SupportedToken = [
  {
    name: "Drift",
    icon: "./FavIcon.png",
  },
];

export const maxPriorityFeePerGas = 30000000000;
