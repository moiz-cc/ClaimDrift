import {
  useSwitchNetwork,
  useWeb3ModalAccount,
  useWeb3ModalState,
} from "@web3modal/ethers5/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import chainlinkCCIPSmall from "../Assets/Images/chainlinkCCIPSmall.png";
import { getErrorMessage } from "../blockchainErrors";
import ChainModal from "../Component/ChainModal";
import GeneralModal from "../Component/GeneralModal";
import Skeleton from "../Component/Skeleton";
import TokenModal from "../Component/TokenModal";
import SupportChain from "../config/SupportChain";
import ConvertNumber from "../Helpers/ConvertNumber";
import GetChain from "../Helpers/GetChain";
import LoadingGif from "../Assets/Images/loading.gif";
import { LoadUser } from "../Store/blockchainSlice";

// Function Calls Flow.
/*
GetBridgeFee.
CheckAllowance.
CheckEstimateGas.
CheckBalance.
*/
const CrossSwap = () => {
  const {
    user,
    pool,
    web3Inst_ETH,
    contractInstICO_ETH,
    contractInstPresaleToken_ETH,
    contractInstDrift_ETH,
    contractInstClaim_ETH,
    contractInstStakePool_ETH,
    contractInstDriftStake_ETH,
    web3Inst_BNB,
    contractInstICO_BNB,
    contractInstPresaleToken_BNB,
    contractInstDrift_BNB,
    contractInstClaim_BNB,
    contractInstStakePool_BNB,
    contractInstDriftStake_BNB,
    web3Inst_POLYGON,

    contractInstPresaleToken_POLYGON,
    contractInstICO_POLYGON,
    contractInstDrift_POLYGON,
    contractInstClaim_POLYGON,
    contractInstStakePool_POLYGON,
    contractInstDriftStake_POLYGON,

    contractInstBridge_ETH,
    contractInstBridge_BNB,
    contractInstBridge_POLYGON,
  } = useSelector((state) => state.Blockchain);
  const { switchNetwork } = useSwitchNetwork();
  const { address, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();
  const [recipientAddress, setRecipientAddress] = useState(null);
  const [isFirstModal, setIsFirstModal] = useState(true);
  const [selectedChain, setSelectedChain] = useState(null);
  const [convSelectedChain, setConvSelectedChain] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [debouncedQuery] = useDebounce(selectedChain?.value, 2000);
  const [isInsuffBalance, setIsInsuffBalance] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [isInsuffGas, setIsInsuffGas] = useState(false);
  const [isInsuffGasErr, setIsInsuffGasErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const [errors, setErrors] = useState({
    transaction: "",
  });
  let loadingTimerId;
  const dispatch = useDispatch();

  const ResetLoading = () => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
      loadingTimerId && clearTimeout(loadingTimerId);
      clearTimeout(timerId);
    }, 1000);
  };
  const GetCurrentInstance = () => {
    let Claim_TokenAddress;
    let PresaleToken_Inst;
    let ICO_Inst;
    let Claim_Inst;
    let Pool_Inst;
    let Stake_Drift_Inst;
    let Stake_Drift_Address;
    let Drift_Inst;
    let Pool_Address;
    let Web3_Inst;
    let Bridge_Address;
    let Bridge_Inst;
    let Drift_Address;
    let Drift_Token_Address;

    if (chainId === 1) {
      Web3_Inst = web3Inst_ETH;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_ETH;
      PresaleToken_Inst = contractInstPresaleToken_ETH;
      ICO_Inst = contractInstICO_ETH;
      Claim_Inst = contractInstClaim_ETH;
      Pool_Inst = contractInstStakePool_ETH;
      Stake_Drift_Inst = contractInstDriftStake_ETH;
      Drift_Inst = contractInstDrift_ETH;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_ETH;
      Bridge_Address = process.env.REACT_APP_BRIDGE_ETH;
      Bridge_Inst = contractInstBridge_ETH;
      Drift_Address = process.env.REACT_APP_DRIFT_ETH;
      Drift_Token_Address = process.env.REACT_APP_DRIFT_ETH;
    } else if (chainId === 56) {
      Web3_Inst = web3Inst_BNB;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_BNB;
      PresaleToken_Inst = contractInstPresaleToken_BNB;
      ICO_Inst = contractInstICO_BNB;
      Claim_Inst = contractInstClaim_BNB;
      Pool_Inst = contractInstStakePool_BNB;
      Stake_Drift_Inst = contractInstDriftStake_BNB;
      Drift_Inst = contractInstDrift_BNB;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_BNB;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_BNB;
      Bridge_Address = process.env.REACT_APP_BRIDGE_BNB;
      Bridge_Inst = contractInstBridge_BNB;
      Drift_Address = process.env.REACT_APP_DRIFT_BNB;
      Drift_Token_Address = process.env.REACT_APP_DRIFT_BNB;
    } else if (chainId === 137) {
      Web3_Inst = web3Inst_POLYGON;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_POLYGON;
      PresaleToken_Inst = contractInstPresaleToken_POLYGON;
      ICO_Inst = contractInstICO_POLYGON;
      Claim_Inst = contractInstClaim_POLYGON;
      Pool_Inst = contractInstStakePool_POLYGON;
      Stake_Drift_Inst = contractInstDriftStake_POLYGON;
      Drift_Inst = contractInstDrift_POLYGON;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_POLYGON;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_POLYGON;
      Bridge_Address = process.env.REACT_APP_BRIDGE_POLYGON;
      Bridge_Inst = contractInstBridge_POLYGON;
      Drift_Address = process.env.REACT_APP_DRIFT_POLYGON;
      Drift_Token_Address = process.env.REACT_APP_DRIFT_POLYGON;
    } else return null;
    return {
      web3Inst: Web3_Inst,
      contractInstICO: ICO_Inst,
      address,
      contractInstPresaleToken: PresaleToken_Inst,
      contractInstClaim: Claim_Inst,
      claimAddress: Claim_TokenAddress,
      contractInstStakePool: Pool_Inst,
      contractInstDriftStake: Stake_Drift_Inst,
      contractInstDrift: Drift_Inst,
      pool_address: Pool_Address,
      bridge_address: Bridge_Address,
      Bridge_Inst,
      Drift_Address,
      Drift_Token_Address,
    };
  };
  const GetBridgeFee = async (chain) => {
    const currentInst = GetCurrentInstance();
    if (
      !currentInst ||
      !chain?.selector ||
      !address ||
      !currentInst.Drift_Address ||
      !user?.dynamicDrift
    ) {
      return 0;
    }
    try {
      // console.log(
      //   "Getting Fees...",
      //   chain.selector,
      //   recipientAddress || address,
      //   currentInst.Drift_Address,
      //   user?.dynamicDrift
      // );
      const bridgeFees = await currentInst.Bridge_Inst.methods
        .getBridgeFees(
          chain.selector,
          recipientAddress || address,
          currentInst.Drift_Address,
          user?.dynamicDrift
        )
        .call();

      await CheckAllowance(bridgeFees);
      return bridgeFees || 0;
    } catch (error) {
      console.log("Error fetching bridge fees:", error);
      ResetLoading();
    }
  };
  const onAmountChange = async (e) => {
    if (chainId) {
      setIsLoading(true);
    }

    let { value } = e.target;
    let newVal = +value <= 0 ? "0" : value;
    setSelectedChain({
      ...selectedChain,
      value: newVal,
    });
    setConvSelectedChain({
      ...convSelectedChain,
      value: newVal,
    });

    if (Number(newVal) === 0 && chainId) {
      await CheckAllowance();
    }
  };
  const SwitchChain = async () => {
    if (!chainId) {
      const oldSelectedChain = { ...selectedChain };
      const oldConvSelectedChain = { ...convSelectedChain };
      setSelectedChain({ ...oldConvSelectedChain });
      setConvSelectedChain({ ...oldSelectedChain });
      return;
    }
    setIsLoading(true);
    const oldSelectedChain = { ...selectedChain };
    const oldConvSelectedChain = { ...convSelectedChain };
    try {
      const res = await switchNetwork(oldConvSelectedChain?.chainId);
      if (res) {
        CheckBalance();
      }
    } catch (error) {
      console.log("Failed to switch network:", error);
    }
  };
  const CheckEstimateGas = async ({
    bridgeFees,
    Bridge_Inst,
    Drift_Token_Address,
    bridge_address,
  }) => {
    let amount = 0;
    try {
      if (
        Number(ConvertNumber(selectedChain?.value)) >=
        Number(user?.dynamicDrift)
      ) {
        amount = user?.dynamicDrift;
      } else {
        amount = ConvertNumber(selectedChain?.value);
      }
      const approve = await Bridge_Inst.methods.transferTokensToOtherChain(
        convSelectedChain?.selector,
        recipientAddress,
        Drift_Token_Address,
        amount.toString()
      );
      const estimateGas = await approve.estimateGas({
        from: address,
        value: bridgeFees,
      });
      const res = await approve.call({
        from: address,
        to: bridge_address,
        gas: estimateGas,
        // maxPriorityFeePerGas: 290000,
        // maxFeePerGas: 3000000,
      });
      console.log("res", res);
      console.log("estimateGas", estimateGas);
      setIsInsuffGas(false);
    } catch (error) {
      setIsInsuffGas(true);
      const err = await getErrorMessage(error);
      if (err === "Insufficient funds.") {
        setIsInsuffGasErr("Insufficient funds");
      } else {
        console.log("error", error);
        setIsInsuffGasErr("Oops! Something went wrong");
      }
    }
  };
  const CheckAllowance = async (bridgeFees) => {
    if (!chainId) return;
    const {
      contractInstDrift,
      address,
      bridge_address,
      Bridge_Inst,
      Drift_Token_Address,
    } = GetCurrentInstance();
    try {
      const allowance = await contractInstDrift?.methods
        .allowance(address, bridge_address)
        .call();
      if (
        Number(selectedChain?.value) &&
        Number(ConvertNumber(allowance, true)) >= Number(selectedChain?.value)
      ) {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }

      loadingTimerId && clearTimeout(loadingTimerId);
      await CheckEstimateGas({
        bridgeFees,
        Bridge_Inst,
        Drift_Token_Address,
        bridge_address,
      });
      CheckBalance();
    } catch (error) {
      console.log(error.message);
    }
  };
  const CheckBalance = () => {
    if (
      Number(ConvertNumber(user?.dynamicDrift, true)) >=
      Number(selectedChain?.value)
    ) {
      setIsInsuffBalance(false);
    } else {
      setIsInsuffBalance(true);
    }
    ResetLoading();
  };
  const Approve = async () => {
    const currentInst = GetCurrentInstance();
    setIsLoading(true);
    setLoadingTransaction(true);
    setTransactionModal(true);
    let amount = 0;
    if (
      Number(ConvertNumber(selectedChain?.value)) >= Number(user?.dynamicDrift)
    ) {
      amount = user?.dynamicDrift;
    } else {
      amount = ConvertNumber(selectedChain?.value);
    }

    try {
      const approve = await currentInst?.contractInstDrift.methods.approve(
        currentInst?.bridge_address,
        `${amount}` || 0
      );

      const estimateGas = await approve.estimateGas({
        from: address,
      });

      const transaction = approve.send({
        from: address,
        to: currentInst?.Drift_Token_Address,
        gas: estimateGas,
        maxPriorityFeePerGas: 3000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);
          setModalMessage(
            "Your transaction to grant token allowance for bridging has been successfully completed."
          );
          dispatch(LoadUser({ ...currentInst }));
          setLoadingTransaction(false);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoadingTransaction(false);

          const errorMsg = await getErrorMessage(error, chainId);
          setErrors({ ...errors, transaction: errorMsg });
          console.log("RECEIPT ERROR => \n", receipt);

          if (receipt?.transactionHash) {
            setTxHash(receipt.transactionHash);
          }
        });
    } catch (error) {
      const errorMsg = await getErrorMessage(error, chainId);
      console.log(errorMsg);
      setErrors((state) => ({ ...state, transaction: errorMsg }));
      setLoadingTransaction(false);
    }

    ResetLoading();
  };
  const Transfer = async () => {
    if (!chainId) {
      return;
    }
    const currentInst = GetCurrentInstance();
    setIsLoading(true);
    setLoadingTransaction(true);
    setTransactionModal(true);
    let amount = 0;

    if (
      Number(ConvertNumber(selectedChain?.value)) >= Number(user?.dynamicDrift)
    ) {
      amount = user?.dynamicDrift;
    } else {
      amount = ConvertNumber(selectedChain?.value);
    }

    try {
      const bridgeFees = await GetBridgeFee(convSelectedChain);

      const approve =
        await currentInst?.Bridge_Inst.methods.transferTokensToOtherChain(
          convSelectedChain?.selector,
          recipientAddress,
          currentInst?.Drift_Token_Address,
          amount.toString()
        );

      const estimateGas = await approve.estimateGas({
        from: address,
        value: bridgeFees,
      });

      const transaction = approve.send({
        from: address,
        to: currentInst?.bridge_address,
        gas: estimateGas,
        maxPriorityFeePerGas: 3000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);
          setLoadingTransaction(false);
          dispatch(LoadUser({ ...currentInst }));
          setModalMessage(
            `The transaction has been successfully intiated and will transfer from ${selectedChain?.currency} to another ${convSelectedChain?.currency}`
          );
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoadingTransaction(false);

          const errorMsg = await getErrorMessage(error, chainId);
          setErrors({ ...errors, transaction: errorMsg });
          console.log("RECEIPT ERROR => \n", receipt);

          if (receipt?.transactionHash) {
            setTxHash(receipt.transactionHash);
          }
        });
    } catch (error) {
      const errorMsg = await getErrorMessage(error, chainId);
      console.log(errorMsg);
      setErrors((state) => ({ ...state, transaction: errorMsg }));
      setLoadingTransaction(false);
    }

    ResetLoading();
  };
  const SetMax = () => {
    setIsLoading(true);
    setSelectedChain({
      ...selectedChain,
      value: ConvertNumber(user?.dynamicDrift, true),
    });
    setConvSelectedChain({
      ...convSelectedChain,
      value: ConvertNumber(user?.dynamicDrift, true),
    });
  };

  useEffect(() => {
    const handleChainSelection = async () => {
      if (chainId) {
        const chain = GetChain(chainId);
        setSelectedChain({ ...chain });
        const filteredChain = SupportChain.filter(
          (fchain) => fchain?.chainId !== chain?.chainId
        )[0];
        setRecipientAddress(address);
        if (filteredChain && user) {
          setConvSelectedChain({
            ...filteredChain,
            bridgeFees: await GetBridgeFee(filteredChain),
          });
        } else {
          setConvSelectedChain({
            ...filteredChain,
            bridgeFees: 0,
          });
        }
      } else {
        const chain = SupportChain[0];
        setSelectedChain(chain);
        const filteredChain = SupportChain.find(
          (fchain) => fchain?.chainId !== chain?.chainId
        );
        setConvSelectedChain(filteredChain);
      }
    };

    handleChainSelection();
  }, [chainId, user]);

  useEffect(() => {
    if (debouncedQuery && chainId) {
      GetBridgeFee(convSelectedChain);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (isLoading) {
      loadingTimerId = setTimeout(() => {
        ResetLoading();
        clearTimeout(loadingTimerId);
      }, 5000);
    }
    return () => {
      if (loadingTimerId) {
        clearTimeout(loadingTimerId);
      }
    };
  }, [isLoading]);

  return (
    <div className="CrossSwap">
      <div className="CrossSwapSection ">
        <div className="CrossSwapSection_Container m-auto container-lg">
          <div className="row m-0 w-100 Home_Hero_Section">
            <div className="col-12 col-md-6 p-0 ">
              <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                DRIFT Cross Swap
              </h1>

              <p className="m-0 p-0 my-4 text-white">
                Welcome to Cross Swap, your ultimate destination for seamless
                and secure token conversion across multiple blockchain networks.
                Our cutting-edge solution, powered by the Cross-Chain
                Interoperability Protocol (CCIP), ensures that you can
                effortlessly swap tokens from one chain to another.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="CrossSwapSectionCardContainer d-flex align-items-center gap-3 justify-content-center my-5 px-3">
        <div className="d-flex flex-column gap-2">
          <div className="card bg-light border-0 rounded-3">
            <h1 className="fs-4 fw-bold mb-0 text-start pt-3 ps-3">Bridge</h1>
            <div className="card-body text-center pt-2">
              <form action="">
                <div className="InputContainer border bg-white rounded-3 py-3 py-md-2 px-3 mb-2">
                  <label
                    htmlFor="RecipientAddress"
                    className="FS_14 text-start w-100"
                  >
                    <strong>Recipient's Address</strong>:
                  </label>
                  <input
                    id="RecipientAddress"
                    name="RecipientAddress"
                    type="text"
                    required
                    placeholder="0x"
                    className="input-field px-2 fw-bold FS_14 shadow-none border rounded-2"
                    style={{ height: "30px" }}
                    value={recipientAddress || ""}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>
                <div
                  className="InputContainer border bg-white rounded-3 py-3 py-md-2 px-3"
                  style={{ marginBottom: "-0.8rem" }}
                >
                  <div className="d-flex align-items-start">
                    <div className="w-100">
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                        <label
                          htmlFor="fromMainnet"
                          className="text-start d-block w-100 FS_14"
                        >
                          From:{" "}
                          {isLoading ? (
                            <div
                              className="d-inline-block "
                              style={{ width: "100px" }}
                            >
                              <Skeleton />
                            </div>
                          ) : (
                            <strong>
                              {selectedChain?.currency || ""} Chain
                            </strong>
                          )}
                        </label>
                        {isLoading ? (
                          <div
                            className="d-inline-block"
                            style={{ width: "100px" }}
                          >
                            <Skeleton />
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm d-flex align-items-center border rounded-4 justify-content-center ps-3 pe-1 FS_14 removeBtnTransform"
                            style={{ minWidth: "110px" }}
                            data-bs-toggle="modal"
                            data-bs-target="#chainModal"
                            onClick={() => setIsFirstModal(true)}
                          >
                            <img
                              src={selectedChain?.icon || ""}
                              alt={selectedChain?.currency || ""}
                              width={"18px"}
                            />
                            <span className="mx-2">
                              {selectedChain?.currency || ""}
                            </span>
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 6 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                                fill="black"
                                fillOpacity="0.3"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <input
                        className="input-field pe-2 fs-2 fw-bold"
                        type="number"
                        name="fromMainnet"
                        id="fromMainnet"
                        placeholder="0"
                        step="any"
                        value={selectedChain?.value || ""}
                        onChange={onAmountChange}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-sm d-flex align-items-center border rounded-4 px-3 FS_12 ms-auto removeBtnTransform mt-4 gap-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#tokenModal"
                  >
                    <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                    <span className="lh-1 me-1">DRIFT</span>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 6 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                        fill="black"
                        fillOpacity="0.3"
                      ></path>
                    </svg>
                  </button>

                  {chainId && (
                    <div className="d-flex w-100 gap-1 justify-content-end mt-2">
                      <span className="FS_12 mb-0 text-nowrap">
                        Balance:{" "}
                        {isLoading ? (
                          <div
                            className="d-inline-block"
                            style={{ width: "50px" }}
                          >
                            <Skeleton />
                          </div>
                        ) : user?.dynamicDrift ? (
                          Number(
                            ConvertNumber(user?.dynamicDrift, true)
                          ).toFixed(2)
                        ) : (
                          0
                        )}
                      </span>
                      <button
                        type="button"
                        className="btn max-btn FS_12 border-0 fw-semibold p-0"
                        onClick={() => SetMax()}
                        disabled={ConvertNumber(user?.dynamicDrift, true) === 0}
                      >
                        Max
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn px-2 py-1 border bg-light"
                  onClick={() => SwitchChain()}
                  disabled={isLoading}
                >
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66665 9.83335V3.85419L1.52081 6.00002L0.333313 4.83335L4.49998 0.666687L8.66665 4.83335L7.47915 6.00002L5.33331 3.85419V9.83335H3.66665ZM9.49998 17.3334L5.33331 13.1667L6.52081 12L8.66665 14.1459V8.16669H10.3333V14.1459L12.4791 12L13.6666 13.1667L9.49998 17.3334Z"
                      fill="black"
                    ></path>
                  </svg>
                </button>
                <div
                  className="InputContainer border bg-white rounded-3 py-3 py-md-2 px-3"
                  style={{ marginTop: "-0.8rem" }}
                >
                  <div className="d-flex align-items-start">
                    <div className="w-100">
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                        <label
                          htmlFor="toMainnet"
                          className="text-start d-block w-100 FS_14 mb-1"
                        >
                          To:{" "}
                          {isLoading ? (
                            <div
                              className="d-inline-block "
                              style={{ width: "100px" }}
                            >
                              <Skeleton />
                            </div>
                          ) : (
                            <strong>
                              {convSelectedChain?.currency || ""} Chain
                            </strong>
                          )}
                        </label>
                        {isLoading ? (
                          <div
                            className="d-inline-block"
                            style={{ width: "100px" }}
                          >
                            <Skeleton />
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm d-flex align-items-center gap-1 border rounded-4 justify-content-center ps-3 pe-1 FS_14 removeBtnTransform"
                            style={{ minWidth: "110px" }}
                            data-bs-toggle="modal"
                            data-bs-target="#chainModal"
                            onClick={() => setIsFirstModal(false)}
                          >
                            <img
                              src={convSelectedChain?.icon || ""}
                              alt={convSelectedChain?.currency || ""}
                              width={"18px"}
                            />
                            <span className="lh-1 me-2">
                              {convSelectedChain?.currency}
                            </span>
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 6 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                                fill="black"
                                fillOpacity="0.3"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>

                      <input
                        readOnly
                        className="input-field pe-2 fs-2 fw-bold"
                        type="number"
                        name="toMainnet"
                        id="toMainnet"
                        placeholder="0"
                        step="any"
                        value={convSelectedChain?.value || ""}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-sm d-flex align-items-center border rounded-4 px-3 FS_12 ms-auto removeBtnTransform mt-4 gap-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#tokenModal"
                  >
                    <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                    <span className="lh-1 me-1">DRIFT</span>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 6 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                        fill="black"
                        fillOpacity="0.3"
                      ></path>
                    </svg>
                  </button>
                </div>
                {chainId && (
                  <div className="border bg-white rounded-3 py-3 py-md-2 px-3 mt-2">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        width={"16px"}
                        height={"16px"}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="coins"
                        className="svg-inline--fa fa-coins details-panel__icon"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor`"
                          d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"
                          opacity={"0.3"}
                        ></path>
                      </svg>

                      <div className="FS_12 fw-semibold  mb-0 d-flex align-items-center gap-2 lh-1">
                        <span>Fees: </span>
                        {isLoading ? (
                          <div
                            className="d-inline-block mb-0 lh-1"
                            style={{ width: "100px" }}
                          >
                            <Skeleton />
                          </div>
                        ) : (
                          <>
                            {Number(
                              ConvertNumber(
                                +convSelectedChain?.bridgeFees,
                                true
                              )
                            ).toFixed(7)}{" "}
                            {selectedChain?.currency || ""}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {chainId && isInsuffBalance && +selectedChain?.value > 0 ? (
                  <button
                    type="button"
                    className={`btn pinkBtn BtnStyle1 text-white fw-bold shadow-none rounded-2 mt-4 w-100 FS_14 removeBtnTransform`}
                    disabled
                  >
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={LoadingGif}
                          style={{ width: 20 }}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      "Insufficient Funds"
                    )}
                  </button>
                ) : chainId && !isApproved && +selectedChain?.value > 0 ? (
                  <button
                    type="button"
                    className={`btn pinkBtn BtnStyle1 text-white fw-bold shadow-none rounded-2 mt-4 w-100 FS_14 removeBtnTransform`}
                    onClick={() => Approve()}
                    disabled={
                      !user?.dynamicDrift ||
                      isLoading ||
                      isApproved ||
                      +selectedChain?.value === 0
                    }
                  >
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={LoadingGif}
                          style={{ width: 20 }}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      "Approve Drift"
                    )}
                  </button>
                ) : chainId && isInsuffGas && +selectedChain?.value > 0 ? (
                  <button
                    type="button"
                    className={`btn pinkBtn BtnStyle1 text-white fw-bold shadow-none rounded-2 mt-4 w-100 FS_14 removeBtnTransform`}
                    disabled
                  >
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={LoadingGif}
                          style={{ width: 20 }}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      isInsuffGasErr
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn pinkBtn BtnStyle1 text-white fw-bold shadow-none rounded-2 mt-4 w-100 FS_14 removeBtnTransform`}
                    onClick={() => Transfer()}
                    disabled={
                      !user?.dynamicDrift ||
                      !isApproved ||
                      isInsuffBalance ||
                      isLoading ||
                      !+selectedChain?.value > 0 ||
                      !chainId ||
                      recipientAddress?.length < 25
                    }
                  >
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={LoadingGif}
                          style={{ width: 20 }}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      "Transfer"
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <span className="fw-bold text-light-emphasis">Powered by</span>{" "}
            <img src={chainlinkCCIPSmall || ""} alt="Powered By" />
          </div>
        </div>
      </div>
      <ChainModal
        state={{
          selectedChain,
          setSelectedChain,
          convSelectedChain,
          setConvSelectedChain,
          isFirstModal,
          setIsFirstModal,
          GetCurrentInstance,
        }}
      />
      <TokenModal
        state={{
          selectedToken,
          setSelectedToken,
          isFirstModal,
          setIsFirstModal,
        }}
      />

      <GeneralModal
        state={{
          isOpen: transactionModal,
          setIsOpen: setTransactionModal,
          loading: loadingTransaction,
          setLoading: setLoadingTransaction,
          errors,
          setErrors,
          txHash,
          setTxHash,
          message: modalMessage,
          setMessage: setModalMessage,
        }}
      />
    </div>
  );
};

export default CrossSwap;
