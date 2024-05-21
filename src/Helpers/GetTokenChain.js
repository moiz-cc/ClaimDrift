import SupportTokens from "../config/SupportTokens";

const GetTokenByChain = (chainId) => {
  return SupportTokens.find((token) => token.chainId === chainId);
};

export default GetTokenByChain;
