import Polygon from "../Assets/Images/polygon-matic-logo.png";
import BNB from "../Assets/Images/bnb-bnb-logo.png";
import Ethereum from "../Assets/Images/ethereum-eth-logo.png";
const SupportTokens = [
  {
    chainId: 1,
    name: "Ethereum",
    secondaryName: "ETH",
    icon: Ethereum,
    value: 0,
  },
  {
    chainId: 137,
    name: "Polygon",
    secondaryName: "Polygon",
    icon: Polygon,
    value: 0,
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    secondaryName: "BNB",
    icon: BNB,
    value: 0,
  },
];
export default SupportTokens;
