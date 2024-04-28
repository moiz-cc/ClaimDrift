import React, { useEffect } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import ConvertNumber from "../Helpers/ConvertNumber";
import { useDispatch } from "react-redux";
import { LoadBlockchainData, LoadUser } from "../Store/blockchainSlice";
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
    user,
    contractInstStakePool_ETH,
    contractInstPresaleToken_ETH,
    contractInstICO_ETH,
    contractInstICO_BNB,
    contractInstICO_POLYGON,
    contractInstDriftStake_ETH,
    contractInstTokenBNB,
    contractInstTokenPOLYGON,
    contractInstClaim_ETH,
    contractInstClaimBNB,
    contractInstClaimPOLYGON,
    contractInstDrift_ETH,
    
    isLoading,
  } = useSelector((state) => state.Blockchain);
  const curret_date_time = Date.now() / 1000;
  console.log("Current Date", curret_date_time);
  const remaining_days =
    data?.stake_end_deadline - curret_date_time > 0
      ? Math.round(
          Number(data?.stake_end_deadline - curret_date_time) / 60 / 60 / 24
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

    if (value > Number(user?.stakeDrift)) {
      setTokens(max);
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

    let claim_Address;
    let claim_Inst;
    let pool_inst;
    let stake_inst;
    let drift_inst;
    let stakingpool_address;
    let stakeDrift_address;

    if (selectedNetworkId === 11155111 && chainId === 11155111) {
      claim_Inst = contractInstClaim_ETH;
      claim_Address = process.env.REACT_APP_CLAIM_ETH;
      pool_inst = contractInstStakePool_ETH;
      stake_inst = contractInstDriftStake_ETH;
      drift_inst = contractInstDrift_ETH;
      stakingpool_address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
      stakeDrift_address = process.env.REACT_APP_ST_DRIFT_ETH;
    } else if (selectedNetworkId === 97 && chainId === 97) {
      claim_Inst = contractInstClaimBNB;
      claim_Address = process.env.REACT_APP_CLAIM_BNB;
    } else if (selectedNetworkId === 80001 && chainId === 80001) {
      claim_Inst = contractInstClaimPOLYGON;
      claim_Address = process.env.REACT_APP_CLAIM_POLYGON;
    }

    try {
      const claim_reward = await pool_inst.methods.claimRewards();

      const estimateGas = await claim_reward.estimateGas({
        from: address,
      });

      const transaction = claim_reward.send({
        from: address,
        to: stakeDrift_address,
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
              contractInstICO_ETH,
              address,
              contractInstPresaleToken_ETH,
              claim_address: claim_Address,
              contractInstClaim_ETH: claim_Inst,
              contractInstStakePool_ETH: pool_inst,
              contractInstDriftStake_ETH: stake_inst,
              contractInstDrift_ETH: drift_inst,
              pool_address: stakingpool_address,
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

    let claim_Address;
    let claim_Inst;

    let pool_inst;
    let stake_inst;
    let drift_inst;
    let stakingpool_address;
    let stakeDrift_address;

    if (selectedNetworkId === 11155111 && chainId === 11155111) {
      claim_Inst = contractInstClaim_ETH;
      claim_Address = process.env.REACT_APP_CLAIM_ETH;
      pool_inst = contractInstStakePool_ETH;
      stake_inst = contractInstDriftStake_ETH;
      drift_inst = contractInstDrift_ETH;
      stakingpool_address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
      stakeDrift_address = process.env.REACT_APP_ST_DRIFT_ETH;
    } else if (selectedNetworkId === 97 && chainId === 97) {
      claim_Inst = contractInstClaimBNB;
      claim_Address = process.env.REACT_APP_CLAIM_BNB;
    } else if (selectedNetworkId === 80001 && chainId === 80001) {
      claim_Inst = contractInstClaimPOLYGON;
      claim_Address = process.env.REACT_APP_CLAIM_POLYGON;
    }

    try {
      const approve = await stake_inst.methods.approve(
        stakingpool_address,
        user?.stakeDrift + 0
      );

      const estimateGas = await approve.estimateGas({
        from: address,
      });

      const transaction = approve.send({
        from: address,
        to: stakeDrift_address,
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
              contractInstICO_ETH,
              address,
              contractInstPresaleToken_ETH,
              claim_address: claim_Address,
              contractInstClaim_ETH: claim_Inst,
              contractInstStakePool_ETH: pool_inst,
              contractInstDriftStake_ETH: stake_inst,
              contractInstDrift_ETH: drift_inst,
              pool_address: stakingpool_address,
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

    let claim_Address;
    let claim_Inst;

    let pool_inst;
    let stake_inst;
    let drift_inst;
    let stakingpool_address;

    if (selectedNetworkId === 11155111 && chainId === 11155111) {
      claim_Inst = contractInstClaim_ETH;
      claim_Address = process.env.REACT_APP_CLAIM_ETH;

      pool_inst = contractInstStakePool_ETH;
      stake_inst = contractInstDriftStake_ETH;
      drift_inst = contractInstDrift_ETH;
      stakingpool_address = process.env.REACT_APP_ST_POOL_DRIFT_ETH;
    } else if (selectedNetworkId === 97 && chainId === 97) {
      claim_Inst = contractInstClaimBNB;
      claim_Address = process.env.REACT_APP_CLAIM_BNB;
    } else if (selectedNetworkId === 80001 && chainId === 80001) {
      claim_Inst = contractInstClaimPOLYGON;
      claim_Address = process.env.REACT_APP_CLAIM_POLYGON;
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
        to: stakingpool_address,
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
              contractInstICO_ETH,
              address,
              contractInstPresaleToken_ETH,
              claim_address: claim_Address,
              contractInstClaim_ETH: claim_Inst,
              contractInstStakePool_ETH: pool_inst,
              contractInstDriftStake_ETH: stake_inst,
              contractInstDrift_ETH: drift_inst,
              pool_address: stakingpool_address,
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
                ETH-DRIFT Staking Pool
              </h1>

              <p className="m-0 p-0 my-4 text-white">
                The ETH rewards pool for staking DRIFT tokens will be active for
                30 days from Launch date. Unstaking before 30 day period will
                result in a penalty charge. Once the staking pool has ended,
                users are requested to unstake their tokens and fully claim
                their rewards. Secondary staking pools will be launched after
                30-day staking pool.
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
                      {selectedNetworkId === 11155111
                        ? process.env.REACT_APP_DRIFT_ETH
                        : selectedNetworkId === 97
                        ? process.env.REACT_APP_DRIFT_BNB
                        : selectedNetworkId === 80001
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
                        selectedNetworkId === 11155111
                          ? "https://sepolia.etherscan.io"
                          : `${
                              selectedNetworkId === 97
                                ? "https://testnet.bscscan.com"
                                : ""
                            }`
                      }/tx/${txHash}`}
                    >
                      {selectedNetworkId === 11155111
                        ? "https://sepolia.etherscan.io"
                        : `${
                            selectedNetworkId === 97
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
                        selectedNetworkId === 11155111
                          ? "https://sepolia.etherscan.io"
                          : `${
                              selectedNetworkId === 97
                                ? "https://testnet.bscscan.com"
                                : ""
                            }`
                      }/tx/${txHash}`}
                    >
                      {selectedNetworkId === 11155111
                        ? "https://sepolia.etherscan.io"
                        : `${
                            selectedNetworkId === 97
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
            Stake $DRIFT, Earn $DRIFT
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
                        ETH
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
                        {ConvertNumber(data?.apy, true).toFixed(
                          ConvertNumber(data?.apy, true)
                            ?.toString()
                            ?.split(".")[0] != 0
                            ? ConvertNumber(data?.apy, true)
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
                        {ConvertNumber(data?.total_staked || 0, true)} $Drift
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
                          The ETH rewards pool for staking DRIFT tokens will be
                          active for 30 days from Launch date. Unstaking before
                          30 day period will result in a penalty charge.
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
