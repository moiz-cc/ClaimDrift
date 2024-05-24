import Polygon from "../Assets/Images/polygon-matic-logo.png";
import BNB from "../Assets/Images/bnb-bnb-logo.png";
import Ethereum from "../Assets/Images/ethereum-eth-logo.png";
const SupportChain = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    selector: "5009297550715157269",
    icon: Ethereum,
    value: "",
  },
  {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    selector: "4051577828743386545",
    icon: Polygon,
    value: "",
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    currency: "BNB",
    selector: "11344663589394136015",
    icon: BNB,
    value: "",
  },
];
export default SupportChain;
