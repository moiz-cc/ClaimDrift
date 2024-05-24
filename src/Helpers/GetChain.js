import SupportChain from "../config/SupportChain";

const GetChain = (chainId) => {
  return SupportChain.find((token) => token.chainId === chainId);
};

export default GetChain;
