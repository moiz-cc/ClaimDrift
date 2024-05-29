import { SupportedChain } from "../config";

const GetChain = (chainId) => {
  return SupportedChain.find((token) => token.chainId === chainId);
};

export default GetChain;
