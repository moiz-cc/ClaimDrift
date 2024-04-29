import React, { useEffect } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import ConvertNumber from "../Helpers/ConvertNumber";
import { useDispatch } from "react-redux";
import {
  LoadBlockchainData,
  LoadUser,
  LoadPoolData,
} from "../Store/blockchainSlice";
import { getErrorMessage } from "../blockchainErrors.js";
import Error from "../Assets/Images/Error.svg";
import staking_pool from "../Assets/Images/Pool.png";

import Close from "../Assets/Images/Close.svg";
import Loading from "../Assets/Images/loading.gif";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalState,
} from "@web3modal/ethers5/react";
import { Link } from "react-router-dom";

const Staking = () => {
  const dispatch = useDispatch();
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();
  const { open } = useWeb3Modal();

  const [transactionModal, setTransactionModal] = useState(false);
  const [claimtransactionModal, setClaimtransactionModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [tokens, setTokens] = useState(0);
  const [errors, setErrors] = useState({
    transaction: "",
  });

  const {
    publicBlockchainData: data,
    pool,
    user,
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

    isLoading,
  } = useSelector((state) => state.Blockchain);
  const curret_date_time = Date.now() / 1000;
  console.log("Current Date", curret_date_time);
  const remaining_days =
    pool?.stake_end_deadline - curret_date_time > 0
      ? Math.round(
          Number(pool?.stake_end_deadline - curret_date_time) / 60 / 60 / 24
        )
      : 0;

  useEffect(() => {
    setTokens(0);
  }, []);
  const closeTransactionModal = () => {
    setTransactionModal(false);
    setClaimtransactionModal(false);

    setErrors({
      transaction: "",
    });
    setTxHash("");
  };
  const onChange = (e) => {
    const { value, max } = e.target;

    if (ConvertNumber(value) > Number(user?.stakeDrift)) {
      setTokens(ConvertNumber(user?.stakeDrift, true));
    } else {
      setTokens(value);
    }
  };

  const claimRewards = async (e) => {
    if (!address) {
      open();

      return;
    }
    setClaimtransactionModal(true);

    setLoading(true);

    let Presale_TokenAddress;
    let Claim_TokenAddress;
    let PresaleToken_Inst;
    let ICO_Inst;
    let Claim_Inst;
    let Pool_Inst;
    let Stake_Drift_Inst;
    let Stake_Drift_Address;
    let Drift_Inst;
    let Pool_Address;
    if (selectedNetworkId === 1 && chainId === 1) {
      Presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_ETH;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_ETH;
      PresaleToken_Inst = contractInstPresaleToken_ETH;
      ICO_Inst = contractInstICO_ETH;
      Claim_Inst = contractInstClaim_ETH;
      Pool_Inst = contractInstStakePool_ETH;
      Stake_Drift_Inst = contractInstDriftStake_ETH;
      Drift_Inst = contractInstDrift_ETH;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_ETH;
    } else if (selectedNetworkId === 56 && chainId === 56) {
      Presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_BNB;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_BNB;
      PresaleToken_Inst = contractInstPresaleToken_BNB;
      ICO_Inst = contractInstICO_BNB;
      Claim_Inst = contractInstClaim_BNB;
      Pool_Inst = contractInstStakePool_BNB;
      Stake_Drift_Inst = contractInstDriftStake_BNB;
      Drift_Inst = contractInstDrift_BNB;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_BNB;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_BNB;
    } else if (selectedNetworkId === 137 && chainId === 137) {
      Presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_POLYGON;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_POLYGON;
      PresaleToken_Inst = contractInstPresaleToken_POLYGON;
      ICO_Inst = contractInstICO_POLYGON;
      Claim_Inst = contractInstClaim_POLYGON;
      Pool_Inst = contractInstStakePool_POLYGON;
      Stake_Drift_Inst = contractInstDriftStake_POLYGON;
      Drift_Inst = contractInstDrift_POLYGON;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_POLYGON;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_POLYGON;
    } else return;

    try {
      const claim_reward = await Pool_Inst.methods.claimRewards();

      const estimateGas = await claim_reward.estimateGas({
        from: address,
      });

      const transaction = claim_reward.send({
        from: address,
        to: Stake_Drift_Address,
        gas: estimateGas,
        maxPriorityFeePerGas: 50000000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);

          setErrors((state) => ({ ...state, transaction: "" }));
          dispatch(
            LoadUser({
              contractInstICO: ICO_Inst,
              address,
              contractInstPresaleToken: PresaleToken_Inst,
              contractInstClaim: Claim_Inst,
              claimAddress: Claim_TokenAddress,
              contractInstStakePool: Pool_Inst,
              contractInstDriftStake: Stake_Drift_Inst,
              contractInstDrift: Drift_Inst,
              pool_address: Pool_Address,
            })
          );
          dispatch(
            LoadPoolData({
              contractInstStakePool: Pool_Inst,
            })
          );
          setLoading(false);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoading(false);

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
      setLoading(false);
    }
  };
  const allow = async (e) => {
    if (!address) {
      open();

      return;
    }
    setClaimtransactionModal(true);

    setLoading(true);

    let Presale_TokenAddress;
    let Claim_TokenAddress;
    let PresaleToken_Inst;
    let ICO_Inst;
    let Claim_Inst;
    let Pool_Inst;
    let Stake_Drift_Inst;
    let Drift_Inst;
    let Pool_Address;
    let Stake_Drift_Address;

    if (selectedNetworkId === 1 && chainId === 1) {
      Claim_Inst = contractInstClaim_ETH;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_ETH;
      Pool_Inst = contractInstStakePool_ETH;
      Stake_Drift_Inst = contractInstDriftStake_ETH;
      Drift_Inst = contractInstDrift_ETH;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
      Stake_Drift_Address = process.env.REACT_APP_ST_DRIFT_ETH;
    } else if (selectedNetworkId === 56 && chainId === 56) {
      Claim_Inst = contractInstClaim_BNB;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_BNB;
    } else if (selectedNetworkId === 137 && chainId === 137) {
      Claim_Inst = contractInstClaim_POLYGON;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_POLYGON;
    }

    try {
      const approve = await Stake_Drift_Inst.methods.approve(
        Pool_Address,
        user?.stakeDrift + 0
      );

      const estimateGas = await approve.estimateGas({
        from: address,
      });

      const transaction = approve.send({
        from: address,
        to: Stake_Drift_Address,
        gas: estimateGas,
        maxPriorityFeePerGas: 50000000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          // setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);

          setErrors((state) => ({ ...state, transaction: "" }));
          dispatch(
            LoadUser({
              contractInstICO: ICO_Inst,
              address,
              contractInstPresaleToken: PresaleToken_Inst,
              contractInstClaim: Claim_Inst,
              claimAddress: Claim_TokenAddress,
              contractInstStakePool: Pool_Inst,
              contractInstDriftStake: Stake_Drift_Inst,
              contractInstDrift: Drift_Inst,
              pool_address: Pool_Address,
            })
          );
          dispatch(
            LoadPoolData({
              contractInstStakePool: Pool_Inst,
            })
          );
          unstakeDrift(e);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoading(false);

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
      setLoading(false);
    }
  };

  const unstakeDrift = async (e) => {
    // e.preventDefault();

    const tokens_in_wei = ConvertNumber(tokens);
    console.log(tokens_in_wei);

    if (!address) {
      open();

      return;
    }
    setTransactionModal(true);
    setLoading(true);

    let Claim_TokenAddress;
    let Claim_Inst;

    let Pool_Inst;
    let Stake_Drift_Inst;
    let Drift_Inst;
    let Pool_Address;
    let ICO_Inst;
    let PresaleToken_Inst;

    if (selectedNetworkId === 1 && chainId === 1) {
      ICO_Inst = contractInstICO_ETH;
      PresaleToken_Inst = contractInstPresaleToken_ETH;
      Claim_Inst = contractInstClaim_ETH;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_ETH;
      Pool_Inst = contractInstStakePool_ETH;
      Stake_Drift_Inst = contractInstDriftStake_ETH;
      Drift_Inst = contractInstDrift_ETH;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
    } else if (selectedNetworkId === 56 && chainId === 56) {
      ICO_Inst = contractInstICO_BNB;
      PresaleToken_Inst = contractInstPresaleToken_BNB;
      Claim_Inst = contractInstClaim_BNB;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_BNB;
      Pool_Inst = contractInstStakePool_BNB;
      Stake_Drift_Inst = contractInstDriftStake_BNB;
      Drift_Inst = contractInstDrift_BNB;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_BNB;
    } else if (selectedNetworkId === 137 && chainId === 137) {
      ICO_Inst = contractInstICO_POLYGON;
      PresaleToken_Inst = contractInstPresaleToken_POLYGON;
      Claim_Inst = contractInstClaim_POLYGON;
      Claim_TokenAddress = process.env.REACT_APP_CLAIM_POLYGON;
      Pool_Inst = contractInstStakePool_POLYGON;
      Stake_Drift_Inst = contractInstDriftStake_POLYGON;
      Drift_Inst = contractInstDrift_POLYGON;
      Pool_Address = process.env.REACT_APP_ST_POOL_DRIFT_POLYGON;
    }
    try {
      const unstake = await contractInstStakePool_ETH.methods.unstake(
        tokens_in_wei
      );

      const estimateGas = await unstake.estimateGas({
        from: address,
      });

      const transaction = unstake.send({
        from: address,
        to: Pool_Address,
        gas: estimateGas,
        maxPriorityFeePerGas: 50000000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);

          setErrors((state) => ({ ...state, transaction: "" }));
          dispatch(
            LoadUser({
              contractInstICO: ICO_Inst,
              address,
              contractInstPresaleToken: PresaleToken_Inst,
              contractInstClaim: Claim_Inst,
              claimAddress: Claim_TokenAddress,
              contractInstStakePool: Pool_Inst,
              contractInstDriftStake: Stake_Drift_Inst,
              contractInstDrift: Drift_Inst,
              pool_address: Pool_Address,
            })
          );
          dispatch(
            LoadPoolData({
              contractInstStakePool: Pool_Inst,
            })
          );
          setTokens(0);
          setLoading(false);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoading(false);

          const errorMsg = await getErrorMessage(error, chainId);
          setErrors({ ...errors, transaction: errorMsg });
          console.log("RECEIPT ERROR => \n", receipt);

          if (receipt?.transactionHash) {
            setTxHash(receipt.transactionHash);
          }
        });
    } catch (error) {
      const errorMsg = await getErrorMessage(error, chainId);

      setErrors((state) => ({ ...state, transaction: errorMsg }));
      setLoading(false);
    }
  };

  return (
    <div className="Staking ">
      <div className="StakingHeroSection d-flex align-items-center ">
        <div className="container-lg ">
          <div className="row m-0 w-100 Home_Hero_Section">
            <div className="col-12 col-md-6 p-0 ">
              <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                {selectedNetworkId === 1
                  ? "ETH-"
                  : selectedNetworkId === 56
                  ? "BNB-"
                  : selectedNetworkId === 137
                  ? "MATIC-"
                  : " "}
                DRIFT Staking Pool
              </h1>

              <p className="m-0 p-0 my-4 text-white">
                The{" "}
                {selectedNetworkId === 1
                  ? "ETH"
                  : selectedNetworkId === 56
                  ? "BNB"
                  : selectedNetworkId === 137
                  ? "MATIC"
                  : " "}{" "}
                rewards pool for staking DRIFT tokens will be active for 30 days
                from Launch date. Unstaking before 30 day period will result in
                a penalty charge. Once the staking pool has ended, users are
                requested to unstake their tokens and fully claim their rewards.
                Secondary staking pools will be launched after 30-day staking
                pool.
              </p>
            </div>
          </div>
        </div>
      </div>
      {transactionModal && (
        <div
          className="TransactionModal h-100 w-100 position-fixed top-0  d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
        >
          <div
            className="TransactionModalBox DTSC_Col bg-white rounded-4 p-4 position-relative"
            style={{ wordWrap: "break-word" }}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <img src={Loading} style={{ width: 50 }} alt="loading" />
              </div>
            ) : (
              <>
                <img
                  alt=""
                  src={Close}
                  className="position-sticky top-0  start-100"
                  style={{ width: 20 }}
                  onClick={closeTransactionModal}
                />
                {errors?.transaction ? (
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="p-3 mb-3"
                      style={{
                        borderRadius: "100%",
                        backgroundColor: "#ff008c",
                      }}
                    >
                      <img
                        alt=""
                        src={Error}
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                    <p> {errors?.transaction}</p>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-center mb-3">
                      <p className="border p-2 rounded-4 text-center text-white bg-black m-0 px-4">
                        Transaction Successful !
                      </p>
                    </div>
                    <p className="text-start text-black">
                      🎉 Congratulations! 🎉
                    </p>

                    <p className="text-start text-black">
                      You've successfully unstaked your tokens!
                    </p>

                    <p className="text-start text-black ">
                      <span className="fw-bold">Import contract :</span>{" "}
                      {selectedNetworkId === 1
                        ? process.env.REACT_APP_DRIFT_ETH
                        : selectedNetworkId === 56
                        ? process.env.REACT_APP_DRIFT_BNB
                        : selectedNetworkId === 137
                        ? process.env.REACT_APP_DRIFT_POLYGON
                        : null}{" "}
                      to view your tokens.{" "}
                    </p>
                    <p className="text-start text-black mb-0 fw-bold">
                      Transaction link:
                    </p>
                    <Link
                      target="_blank"
                      to={`${
                        selectedNetworkId === 1
                          ? "https://sepolia.etherscan.io"
                          : `${
                              selectedNetworkId === 56
                                ? "https://testnet.bscscan.com"
                                : ""
                            }`
                      }/tx/${txHash}`}
                    >
                      {selectedNetworkId === 1
                        ? "https://sepolia.etherscan.io"
                        : `${
                            selectedNetworkId === 56
                              ? "https://testnet.bscscan.com"
                              : ""
                          }`}
                      /tx/{txHash}
                    </Link>

                    {/* <p
                      className="text-start text-black mt-3"
                      style={{ fontSize: 12 }}
                    >
                      Note this is just representative of your true claim, which
                      will not be available until the time of token launch.
                      Presale tokens are non transferable and considered the
                      responsibility of the holder to maintain access to.
                    </p> */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {claimtransactionModal && (
        <div
          className="TransactionModal h-100 w-100 position-fixed top-0  d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
        >
          <div
            className="TransactionModalBox DTSC_Col bg-white rounded-4 p-4 position-relative"
            style={{ wordWrap: "break-word" }}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <img src={Loading} style={{ width: 50 }} alt="loading" />
              </div>
            ) : (
              <>
                <img
                  alt=""
                  src={Close}
                  className="position-sticky top-0  start-100"
                  style={{ width: 20 }}
                  onClick={closeTransactionModal}
                />
                {errors?.transaction ? (
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="p-3 mb-3"
                      style={{
                        borderRadius: "100%",
                        backgroundColor: "#ff008c",
                      }}
                    >
                      <img
                        alt=""
                        src={Error}
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                    <p> {errors?.transaction}</p>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-center mb-3">
                      <p className="border p-2 rounded-4 text-center text-white bg-black m-0 px-4">
                        Transaction Successful !
                      </p>
                    </div>
                    <p className="text-start text-black">
                      🎉 Congratulations! 🎉
                    </p>

                    <p className="text-start text-black">
                      You've successfully Claimed Staking Reward
                    </p>

                    <p className="text-start text-black mb-0 fw-bold">
                      Transaction link:
                    </p>
                    <Link
                      target="_blank"
                      to={`${
                        selectedNetworkId === 1
                          ? "https://sepolia.etherscan.io"
                          : `${
                              selectedNetworkId === 56
                                ? "https://testnet.bscscan.com"
                                : ""
                            }`
                      }/tx/${txHash}`}
                    >
                      {selectedNetworkId === 1
                        ? "https://sepolia.etherscan.io"
                        : `${
                            selectedNetworkId === 56
                              ? "https://testnet.bscscan.com"
                              : ""
                          }`}
                      /tx/{txHash}
                    </Link>

                    {/* <p
                      className="text-start text-black mt-3"
                      style={{ fontSize: 12 }}
                    >
                      Note this is just representative of your true claim, which
                      will not be available until the time of token launch.
                      Presale tokens are non transferable and considered the
                      responsibility of the holder to maintain access to.
                    </p> */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div className="py-5">
        <div className="container-lg">
          <h4 className="Home_Hero_Section_Heading ">
            Stake $DRIFT, Earn{" "}
            {selectedNetworkId === 1
              ? "ETH"
              : selectedNetworkId === 56
              ? "BNB"
              : selectedNetworkId === 137
              ? "MATIC"
              : " "}
          </h4>

          <section className="mt-5">
            <div className="row m-0 p-0 ">
              <div className="col-12 p-0 col-md-5 pe-md-2 position-relative">
                {isLoading && (
                  <div
                    className="w-100 h-100 bg-white position-absolute rounded-4 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9 }}
                  >
                    <img src={Loading} style={{ width: 50 }} alt="loading" />
                  </div>
                )}
                <div
                  className="
              DTSC_Col rounded-4 bg-white  align-items-center p-4 "
                >
                  <div className="row  m-0 p-0 pb-3 border-bottom">
                    <div
                      className="
col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        available claim
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {user?.remaining_claim > 0
                          ? ConvertNumber(user?.remaining_claim, true)
                          : 0}{" "}
                        {selectedNetworkId === 1
                          ? "ETH"
                          : selectedNetworkId === 56
                          ? "BNB"
                          : selectedNetworkId === 137
                          ? "MATIC"
                          : ""}
                      </p>
                    </div>
                    <div
                      className="
col-12 pe-0 col-sm-6 mt-3 mt-sm-0 ps-0 ps-sm-2"
                    >
                      {user?.remaining_claim > 0 && (
                        <button
                          className=" BtnStyle2 bg-pink fw-bold text-uppercase shadow-none text-white "
                          onClick={claimRewards}
                        >
                          Claim reward
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="row  m-0 p-0 pt-3 ">
                    <div
                      className="
col-12 ps-0 "
                    >
                      <p
                        className="
                        m-0 text-uppercase "
                        style={{
                          fontSize: 12,
                        }}
                      >
                        APY
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {ConvertNumber(pool?.apy / 100 || 0, true).toFixed(
                          ConvertNumber(pool?.apy / 100 || 0, true)
                            ?.toString()
                            ?.split(".")[0] != 0
                            ? ConvertNumber(pool?.apy / 100 || 0, true)
                                ?.toString()
                                ?.split(".")[1] > 0
                              ? 3
                              : 0
                            : 6
                        )}
                        %
                      </p>
                    </div>
                    {/* <div
                      className="
col-12 col-sm-6 pe-0 ps-0 ps-sm-2 d-flex justify-content-end align-items-end "
                    >
                      <h4
                        className="m-0 p-0 me-2 fw-bold"
                        style={{ color: "#ff4bae" }}
                      >
                        120%
                      </h4>
                      <p className="m-0 p-0">APY</p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 col-md-7 ps-md-2 mt-3 mt-md-0 position-relative">
                {isLoading && (
                  <div
                    className="w-100 h-100 bg-white position-absolute rounded-4 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9 }}
                  >
                    <img src={Loading} style={{ width: 50 }} alt="loading" />
                  </div>
                )}
                <div
                  className="
              DTSC_Col rounded-4 bg-white p-4"
                >
                  <div className="row m-0 p-0 border-bottom pb-3">
                    <div
                      className="

                      col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Your Staked Tokens
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {ConvertNumber(user?.stakeDrift || 0, true)} $Drift
                      </p>
                    </div>
                    <div
                      className="

                      col-12 pe-0 col-sm-6 mt-3 mt-sm-0 ps-0 ps-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Total Staked Tokens
                      </p>

                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {ConvertNumber(pool?.total_staked || 0, true)} $Drift
                      </p>
                    </div>
                  </div>
                  <div className="row m-0 p-0 pt-3">
                    <div
                      className="
                      col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Days Remaining
                      </p>
                      <p
                        className="
                        DTSC_SubHeading mb-0 text-uppercase fw-bold"
                        style={{ color: "#ff4bae" }}
                      >
                        {remaining_days}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-3">
            <div className="row m-0 p-0 ">
              <div className="col-12 p-0 col-md-5 pe-md-2 position-relative">
                {isLoading && (
                  <div
                    className="w-100 h-100 bg-white position-absolute rounded-4 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9 }}
                  >
                    <img src={Loading} style={{ width: 50 }} alt="loading" />
                  </div>
                )}
                <div className="DTSC_Col StakeToggleContainer rounded-4 bg-white  align-items-center p-4">
                  {/* <div className="d-flex gap-3 p-2 rounded-3 bg-sliver">
                    <button
                      className={`BtnStyle2 shadow-none
                        border-0 fw-bold ${
                          isStake ? "bg-pink " : "bg-transparent  text-dark"
                        }`}
                      onClick={() => setIsStake(true)}
                    >
                      Stake
                    </button>
                    <button
                      className={`BtnStyle2 border-0 shadow-none
                      fw-bold ${
                        !isStake ? "bg-pink" : "bg-transparent  text-dark"
                      }`}
                      onClick={() => setIsStake(false)}
                    >
                      Unstake
                    </button>
                  </div> */}
                  <div>
                    <p className="Home_Hero_Section_SubHeading text-black fw-bold text-uppercase mb-0">
                      Unstake Drift
                    </p>
                  </div>

                  <div className="StakeToggleContentContainer">
                    {/* {isStake ? (
                      <div className=" StakeContent">
                        <div className="mt-3">
                          <p
                            className="m-0"
                            style={{
                              fontSize: 12,
                            }}
                          >
                            The ETH rewards pool for staking DRIFT tokens will
                            be active for 30 days from Launch date. Unstaking
                            before 30 day period will result in a penalty
                            charge.
                          </p>
                        </div>
                        <div className="mt-3">
                          <div className="input align-items-center">
                            <input
                              className="input-field"
                              type="number"
                              style={{ marginRight: 15 }}
                              value={tokens}
                              onChange={(e) => setTokens(e.target.value)}
                            />
                            <button
                              className="max-btn bg-white"
                              onClick={() => setTokens(user?.Dynamic)}
                            >
                              max
                            </button>
                          </div>
                          <button className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase">
                            Stake
                          </button>
                        </div>
                      </div>
                    ) : ( */}
                    <div className="StakeContent">
                      <div className="mt-3">
                        <p
                          className="m-0"
                          style={{
                            fontSize: 12,
                          }}
                        >
                          The{" "}
                          {selectedNetworkId === 1
                            ? "ETH"
                            : selectedNetworkId === 56
                            ? "BNB"
                            : selectedNetworkId === 137
                            ? "MATIC"
                            : " "}{" "}
                          rewards pool for staking DRIFT tokens will be active
                          for 30 days from Launch date. Unstaking before 30 day
                          period will result in a penalty charge.
                        </p>
                      </div>
                      <div className="mt-3">
                        <div className="input align-items-center">
                          <input
                            className="input-field"
                            type="number"
                            style={{ marginRight: 15 }}
                            min={0}
                            max={Number(user?.stakeDrift)}
                            value={tokens}
                            onChange={onChange}
                          />
                          <button
                            className="max-btn bg-white"
                            onClick={() =>
                              setTokens(ConvertNumber(user?.stakeDrift, true))
                            }
                          >
                            max
                          </button>
                        </div>

                        {!user?.is_pool_allowed > 0 ? (
                          <button
                            className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase"
                            onClick={(e) => allow()}
                          >
                            Unstake
                          </button>
                        ) : (
                          <button
                            className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase"
                            onClick={(e) => unstakeDrift()}
                          >
                            Unstake
                          </button>
                        )}
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 col-md-7 ps-md-2 mt-3 mt-md-0 d-flex justify-content-center align-items-center">
                <img src={staking_pool} className="img-fluid" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Staking;
