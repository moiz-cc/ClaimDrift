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
  const [isStake, setIsStake] = useState(true);
  const { user } = useSelector((state) => state.Blockchain);
  useEffect(() => {
    setTokens(0);
  }, [isStake]);

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
                    ) : (
                      <div className="StakeContent">
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
                              onClick={() => setTokens(user?.Staked)}
                            >
                              max
                            </button>
                          </div>
                          <button className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase">
                            Unstake
                          </button>
                        </div>
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
